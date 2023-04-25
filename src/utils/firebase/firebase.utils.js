import {initializeApp } from 'firebase/app';
import 'firebase/auth';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD8o49lz944VvKrpA1QnKKDeoa9S_nmJUs",
    authDomain: "monarch-clothing-db.firebaseapp.com",
    projectId: "monarch-clothing-db",
    storageBucket: "monarch-clothing-db.appspot.com",
    messagingSenderId: "374499624231",
    appId: "1:374499624231:web:7feff1fea078b8e2869502"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider(); 

  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });

  export const auth = getAuth(firebaseApp);
  export const signInWithGooglePopup = () => 
  signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => 
  signInWithRedirect(auth, googleProvider); 

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
const collectionRef = collection(db, collectionKey);
const batch = writeBatch(db);

objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
});

await batch.commit();
console.log('done');

};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc; 
    }, {});

    return categoryMap; 
}




export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {} ) => {
    if(!userAuth) return; 

const userDocRef = doc(db, 'users',userAuth.uid );

const userSnapShot = await getDoc(userDocRef); 

if(!userSnapShot.exists()) {
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
        });
    } catch (error) {
        console.log('error creating the user', error.message);
    }
}

return userDocRef
};


export const createAuthUserWithEmailAndPassword = async(email, password) => {
if(!email || !password) return;
   return await createUserWithEmailAndPassword(auth, email, password)
}

export const signAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;
     return await signInWithEmailAndPassword(auth, email, password)
    };
    
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
onAuthStateChanged(auth, callback);  


/* 
{
    next:callback,
    error: errorcallBack,
    complete: completedCallback,
}
*/
