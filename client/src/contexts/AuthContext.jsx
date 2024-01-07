import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('currentUser')) || null
    );
   

    const login = async (inputs) => {
      const response = await axios.post("http://localhost:5000/api/auth/login", inputs,{
        withCredentials:true
      });

      setCurrentUser(response.data)
    };

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login }} >
            {children}
        </AuthContext.Provider>
    )
}