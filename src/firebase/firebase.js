import firebase from "firebase"



class Firebase {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB76C4NUpUXcRqF_Jj7HAmGi0WyKmvI23g',
      authDomain: 'prodigy-b614e.firebaseapp.com',
      projectId: 'prodigy-b614e',
    });

    // initialize Firestore through Firebase
    

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

  setMessagesListener(listener) {
    _db.collection('messages').orderBy('createdAt', 'desc').limit(10).onSnapshot(listener);
  }

  async setToken(token) {
    await firebase.auth().signInWithCustomToken(token);
  }
}

export const firebaseClient = new Firebase();
export const db = firebase.firestore()
