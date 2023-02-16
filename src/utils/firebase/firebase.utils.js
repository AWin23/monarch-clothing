import { async } from '@firebase/util';
import {initializeApp } from 'firebase/app';
import 'firebase/auth';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc,} from 'firebase/firestore';


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

  export const auth = getAuth();
  export const signInWithGooglePopup = () => 
  signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => 
  signInWithRedirect(auth, googleProvider); 

export const db = getFirestore();

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
