import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_CREDENTIALS
});

const db = admin.firestore();

export default db;