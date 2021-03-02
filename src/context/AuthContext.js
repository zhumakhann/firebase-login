import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}
export default function AuthProvider({ children }) {
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => setCurrentUser(user));
        setLoading(false)
        return unsubscribe
    }, [])
    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(true)
    const value = {
        currentUser,
        signUp,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
    function signUp(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }
    function updateEmail(email){
       return currentUser.updateEmail(email)
    }
    function updatePassword(password){
        return currentUser.updatePassword(password)
    }
    function logout(){
        return auth.signOut()
    }
    

    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}
