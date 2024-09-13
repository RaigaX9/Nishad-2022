const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

let storedPK = null;

const app = express();
app.use(bodyParser.json());

// Creates hash password
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

app.post('/store-key', (req, res) => {
    const { publicKey } = req.body;
    const auth = req.headers.authorization || '';
    const password = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':')[1];

    if (hashPassword(password) !== storedPassword) {
        return res.status(403).send('Invalid Password.');
    }

    storedPK = publicKey;
    return res.send('Public Key Stored Successfully!');
});

const serverPass = process.argv[2];
if (!serverPass) {
    console.error('Server Password Required.');
    process.exit(1);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
