import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyC3hab8s1DX-ofZGnWoWLTB-X8rB88JSz0",
    authDomain: "crwn-clothing-db-9fad5.firebaseapp.com",
    projectId: "crwn-clothing-db-9fad5",
    storageBucket: "crwn-clothing-db-9fad5.appspot.com",
    messagingSenderId: "63875310216",
    appId: "1:63875310216:web:f1b7d903fd1502d072f53d"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
               displayName,
               email,
               createdAt 
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};


