import firebase from '../lib/firebase.js';

async function login({ username, password }) {
    const snapshot = await collection('users').where('username', '==', username).where("password", "==", password).get();

    if (snapshot.empty) {
        return { status: "ERROR" };
    }

    return {status: "OK" };
}

async function get({ token }) {
    const snapshot = await collection('users').where("token", "==", ).get();

    if (snapshot.empty) {
        return { status: "ERROR" };
    }

    return {status: "OK" };
}

export default { login, get }