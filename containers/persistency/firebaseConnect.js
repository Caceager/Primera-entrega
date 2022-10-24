/*
  UNUSED;
*/
const admin = require("firebase-admin");
const serviceAccount = require("../../clave.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://firestormdb-7202f.firebaseio.com/',
});

const db = admin.firestore();
module.exports = {fbase: db} ;
