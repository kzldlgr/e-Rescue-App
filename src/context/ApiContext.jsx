import React, { createContext, useEffect, useState } from 'react';

export const ApiContext = createContext({});

export const ApiContextProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user"))
    );
    const [auth, setAuth] = useState(JSON.parse(sessionStorage.getItem("Auth")))

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem("user")));
        setAuth(JSON.parse(sessionStorage.getItem("Auth")))
    }, []);

    return (
        <ApiContext.Provider value={{ user, setUser, auth, setAuth }}>
            {children}
        </ApiContext.Provider>
    )
}
