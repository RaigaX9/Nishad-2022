const crypto = require('crypto');
// const axios = require('axios');
const fs = require('fs');
const path = require('path');

const keyPairPath = path.join(__dirname, 'public-key.json');

const createKeypair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
    fs.writeFileSync(keyPairPath, JSON.stringify({
        publicKey: publicKey.export({ type: 'spki', format: 'pem' }),
        privateKey: privateKey.export({ type: 'pkcs8', format: 'pem' })
    }));
    console.log('Key-Pair Generated and Stored.');
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
        default: console.log('Commands: create-keypair, submit-pk');
    }
})();
