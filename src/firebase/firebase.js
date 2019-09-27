import firebase from "firebase"

class Firebase {
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyB76C4NUpUXcRqF_Jj7HAmGi0WyKmvI23g",
            authDomain: "prodigy-b614e.firebaseapp.com",
            databaseURL: "https://prodigy-b614e.firebaseio.com",
            projectId: "prodigy-b614e",
            storageBucket: "prodigy-b614e.appspot.com",
            messagingSenderId: "861764312569",
            appId: "1:861764312569:web:b650d086353f6b07"
        });
    }

    getCurrentUser() {
        return firebase.auth().currentUser;
    }

    async updateProfile(profile) {
        if (!firebase.auth().currentUser) return;
        await firebase.auth().currentUser.updateProfile({
            displayName: profile.name,
            photoURL: profile.picture,
        });
    }

    async firebaseSignOut() {
        await firebase.auth().signOut();
    }

    setAuthStateListener(listener) {
        firebase.auth().onAuthStateChanged(listener);
    }

    async setToken(token) {
        await firebase.auth().signInWithCustomToken(token);
    }
}

export const firebaseClient = new Firebase();
export const db = firebase.firestore()