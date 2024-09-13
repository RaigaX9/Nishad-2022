# Nishad-2022
Client Key Test Generator

## Description
This is used for running the client all through Node.js that creates and store a public key and able to authenticate and verify it.

## Requirements
- Node.js
- npm

## How To Run
1. Clone the repository.
2. Navigate to where the repository is cloned at.
3. Run `npm install`
4. On one terminal tab, start the local server `npm server.js <password>` as `<password>` can be anything. This will run on `http://localhost:3000`
5. Open another terminal and run the command to create a key pair `node client.js create-keypair`. This will create a `public-key.json` locally.
6. Submit the public key `node client.js submit-pk <password> <localUrl>`. <localUrl> is the current local host you are running on from step 4.
7. Sign the message `node client.js sign-message <some_message>`. This will create a signature so please copy that.
8. Verify the message `node client.js verify-message <localUrl> <some_message> <signature>`. This will then verify the signature.
