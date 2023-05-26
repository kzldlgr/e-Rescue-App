import React, { createContext, useState } from 'react';

export const ClientContext = createContext({});

export const ClientContextProvider = ({ children }) => {

    const [panel, setPanel] = useState(false);
    const [profilePanel, setProfilePanel] = useState(false);

    return (
        <ClientContext.Provider value={{
            panel,
            setPanel,
            profilePanel,
            setProfilePanel
        }}>
            {children}
        </ClientContext.Provider>
    )
}
