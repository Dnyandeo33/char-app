/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const baseUrl = 'http://localhost:3000/';

    const [user, setUser] = useState(null);
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    // register user
    const registerUser = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true);

                const response = await axios.post(
                    `${baseUrl}register`,
                    registerInfo
                );

                setIsLoading(false);
                setUser(response);
                setRegisterInfo({
                    name: '',
                    email: '',
                    password: ''
                });
            } catch (error) {
                setError(error);
            }
        },
        [registerInfo]
    );

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    // get user from localStorage
    useEffect(() => {
        const user = localStorage.getItem('User');
        setUser(JSON.parse(user));
    }, []);

    // login user
    const loginUser = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true);
                const response = await axios.post(`${baseUrl}login`, loginInfo);
                const user = await response.data;
                setIsLoading(false);
                <Navigate to="/" />;
                // store user in local storage
                localStorage.setItem('User', JSON.stringify(user));
                setUser(response);
            } catch (error) {
                setError(error.response.data);
            }
        },
        [loginInfo]
    );

    // logout
    const logout = useCallback(() => {
        localStorage.removeItem('User');
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                error,
                isLoading,
                loginInfo,
                updateLoginInfo,
                loginUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
