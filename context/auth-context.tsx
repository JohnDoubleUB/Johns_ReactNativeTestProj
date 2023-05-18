import React, { useState } from 'react';
import { View } from 'react-native';

export const AuthContext = React.createContext({
    isAuth: false,
    login: () => { },
    logout: () => { }
});

type Props = {
    children?: React.ReactNode;
};

function AuthContextProvider({ children }: Props): JSX.Element
{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function loginHandler() 
    {
        setIsAuthenticated(true);
    }

    function logoutHandler()
    {
        setIsAuthenticated(false);
    }



    return (
        <AuthContext.Provider value={{ login: loginHandler, logout: logoutHandler, isAuth: isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;