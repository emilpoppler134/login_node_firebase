import firebase from '../lib/firebase.js';

async function login({ username, passwordHash }) {
	const snapshot = await firebase.collection('users').where('username', '==', username).where("password", "==", passwordHash).get();
	
	if (snapshot.empty) {
		return { status: "ERROR" };
	}

	const users = snapshot.docs.map(doc => doc.id);

	return {status: "OK", data: users[0]};
}

async function signup({ name, username, passwordHash }) {
	const res = await firebase.collection('users').add({
		name, 
		username, 
		password: passwordHash
	});

	const snapshot = await firebase.collection("users").doc(res.id).get();
	const doc = snapshot.data();
	doc.id = res.id;

	return {status: "OK", data: doc};
}

async function get({ token }) {
	const snapshot = await firebase.collection("users").where("token", "==", token).get();

	if (snapshot.empty) {
		return { status: "ERROR", data: null };
	}

	const users = snapshot.docs.map(doc => {
		const res = doc.data();
		res.id = doc.id
		return res;
	});

	return {status: "OK", data: users[0]};
}

async function updateToken({ userId, token }) {
	const ref = firebase.collection('users').doc(userId);

	await ref.set({
		token: token
	}, { merge: true });
}

export default { login, signup, get, updateToken }