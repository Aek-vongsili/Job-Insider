var firebaseAdmin = require("firebase-admin");
const serviceAccount = require("./secretConfig.json");

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
    });
}


export default firebaseAdmin;
