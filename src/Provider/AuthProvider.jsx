import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, signInWithPopup } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';

const provider = new GoogleAuthProvider();

export const authContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    //create user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //login user
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //googleLogin
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    //update user Profile
    const updateUserProfile = (name, url) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: url
        })
    }

    //logOut user
    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if(currentUser){
                axios.post('http://localhost:3000/jwt',{email:currentUser.email})
                .then(data=>{
                    localStorage.setItem('access-token', data.data.token)
                })
            }
            else{
                localStorage.removeItem('access-token')
            }

            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [])

    const userInfo = {
        user,
        createUser,
        loginUser,
        googleLogin,
        logOut,
        updateUserProfile,
        loading,
    }

    return (
        <authContext.Provider value={userInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;