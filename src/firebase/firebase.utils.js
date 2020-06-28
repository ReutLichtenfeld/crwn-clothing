import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyDsL-sTcmE-p2KaSNsfyEen5gBsG7CFwGQ",
        authDomain: "crwn-clothing-e43b0.firebaseapp.com",
        databaseURL: "https://crwn-clothing-e43b0.firebaseio.com",
        projectId: "crwn-clothing-e43b0",
        storageBucket: "crwn-clothing-e43b0.appspot.com",
        messagingSenderId: "1057788508859",
        appId: "1:1057788508859:web:218b1708a043a2b294079e",
        measurementId: "G-95ZY2P9L5F"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
//export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;