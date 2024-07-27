import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyAERslhN_FxZRM_FSokMK7xYbiHNgOqy34",
  authDomain: "netflix-clone-5c93b.firebaseapp.com",
  projectId: "netflix-clone-5c93b",
  storageBucket: "netflix-clone-5c93b.appspot.com",
  messagingSenderId: "179995543328",
  appId: "1:179995543328:web:1649a38e8f73964baff945"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid:user.uid,
            name,
            authProvider: "local",
            email
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const login = async (email,password)=> {
    try {
      await  signInWithEmailAndPassword(auth,email,password);
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));


        
    }
}

const logout = ()=> {
    signOut(auth);
}

export {auth, db, login, signup, logout}