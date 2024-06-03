import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "./../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic()
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
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

  // Google Login

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Github Login

  const githubLogin = () => {
    return signInWithPopup(auth, githubProvider);
  };

  // User Logout
  const userLogout = () => {
      setLoading(true);
      return signOut(auth);
    };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser.email };
        axiosPublic.post('/jwt', userInfo)
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('access-token', res.data.token);
                    setLoading(false);
                }
            })
    }
    else {
        localStorage.removeItem('access-token');
        setLoading(false);
    }
    
});
    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    userSignIn,
    updateUserProfile,
    userLogout,
    googleLogin,
    githubLogin
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
