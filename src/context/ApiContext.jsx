import React, { createContext, useEffect, useState } from 'react';

export const ApiContext = createContext({});

export const ApiContextProvider = ({ children }) => {

    const [user, setUser] = useState(sessionStorage.getItem("user") === null ? [] : JSON.parse(sessionStorage.getItem("user")));
    const [auth, setAuth] = useState(JSON.parse(sessionStorage.getItem("auth")));
    const [onlineUsers, setOnlineUsers] = useState([]);
    const updateUser = (updatedUser) => {
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
    }
    return (
        <ApiContext.Provider value={{
            user,
            setUser,
            auth,
            setAuth,
            updateUser,
            onlineUsers,
            setOnlineUsers
        }}>
            {children}
        </ApiContext.Provider>
    )
}
