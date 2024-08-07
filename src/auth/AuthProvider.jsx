import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { app } from "./firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  //firebase auth
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // firebase functions
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth,email,password)
  }



  //sign-out

  const signOut = () => {
    console.log('signOut');
    auth.signOut()
      .then(() => {
        console.log("Sign-out successful.");
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('uID')
        localStorage.clear()
        window.location.reload();
      })
      .catch((error) => {
        console.error("An error happened during sign-out:", error);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, phoneNumber, photoURL } = user;
        
        const userData = {
          name: displayName,
          email,
          city: null,
          state: null,
          country: null,
          occupation: null,
          phoneNumber: phoneNumber || null,
          transactions: [],
          role: "user",
          photoURL
        };

        setUser(userData);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    setIsLoading(false);
  }, []);

  //set users

  const handleSetUser = (user) => {
    if (user) {
      setUser(user)
      if (user._id) {
        localStorage.setItem('uID' , user._id)
      }
    }
  }

  const setToken = (token) => {
    if (token) {
      localStorage.setItem('token', token)
    }
  }

  const authInfo = {
    signInWithGoogle,
    createUser,
    user,
    signOut,
    handleSetUser,
    setToken,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
