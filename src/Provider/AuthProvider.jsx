import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "./../firebase/firebase.config";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   Create User Email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Login email and password

  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Update User Profile

  const updateUserProfile = (userName, photourl) => {
    return updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photourl,
    });
  };

  // User Logout
  const userLogout = () => {
      setLoading(true);
      return signOut(auth);
    };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    userSignIn,
    updateUserProfile,
    userLogout
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
