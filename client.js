const crypto = require('crypto');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const keyPairPath = path.join(__dirname, 'public-key.json');

const loadKeypair = () => JSON.parse(fs.readFileSync(keyPairPath, 'utf-8') || '{}');

const createKeypair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
    fs.writeFileSync(keyPairPath, JSON.stringify({
        publicKey: publicKey.export({ type: 'spki', format: 'pem' }),
        privateKey: privateKey.export({ type: 'pkcs8', format: 'pem' })
    }));
    console.log('Key-Pair Generated and Stored.');
};

const submitPublicKey = async (password, serverUrl) => {
    const { publicKey } = loadKeypair();
    await axios.post(`${serverUrl}/store-key`, { publicKey }, { auth: { username: 'client', password } });
    console.log('Public key submitted.');
};

const signatureMessage = (message) => {
    const { privateKey } = loadKeypair();
    const signature = crypto.createSign('SHA256').update(message).end().sign(privateKey, 'hex');
    console.log(`Message: ${message}\nSignature: ${signature}`);
    return { message, signature };
};

// Verify a signed message with the server
const verifyMessage = async (serverUrl, message, signature) => {
    const { data } = await axios.post(`${serverUrl}/verify`, { message, signature });
    console.log('Verification result:', data);
};

const [,, cmd, ...args] = process.argv;
(async () => {
    switch (cmd) {
        case 'create-keypair':
            createKeypair();
            break;
        case 'submit-pk':
            await submitPublicKey(args[0], args[1]);
            break;
        case 'sign-message':
            signatureMessage(args.join(' '));
            break;
        case 'verify-message':
            await verifyMessage(args[0], args[1], args[2]);
            break;
        default:
            console.log('Commands: create-keypair, submit-pk, sign-message, verify-message');
    }
})();
