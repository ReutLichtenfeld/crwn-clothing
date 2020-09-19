import firebase from 'firebase/app';
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`)

        const snapShot = await userRef.get(); 

        if(!snapShot.exists){
                const { displayName, email } = userAuth;
                const createAt = new Date();

                try {
                        await userRef.set({
                                displayName,
                                email,
                                createAt,
                                ...additionalData
                        })
                } catch(error) {
                        console.log('error creating user', error.message);
                }
        }

        return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
        const collectionRef = firestore.collection(collectionKey);

        const batch = firestore.batch();
        objectsToAdd.forEach(obj => {
                const newDocRef = collectionRef.doc();
                batch.set(newDocRef, obj);
        });

        return await batch.commit()
};

export const converCollectionsSnapshotToMap = (collections) => {
        const transformedCollections = collections.docs.map(doc => {
                const { title, items } = doc.data();

                return {
                        routeName: encodeURI(title.toLowerCase()),
                        id: doc.id,
                        title,
                        items
                }
        });

        return transformedCollections.reduce((accumulator, collection) => {
                accumulator[collection.title.toLowerCase()] = collection;
                return accumulator;
        }, {});
};

export const getCurrentUser = () => {
        return new Promise((resolve, reject) => {
                const unsubscribe = auth.onAuthStateChanged(userAuth => {
                        unsubscribe();
                        resolve(userAuth);
                }, reject)
        });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;