// lib/UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { checkSessionFunction, loginFunction, logoutFunction } from './auth';
import Router from 'next/router';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    if(!user && !loading) {
      checkSession();
      
    }
  }, []);


  const login = async(userNameValue, passwordValue) => {
    try {
      setLoading(true);
      await loginFunction(userNameValue, passwordValue, setUser, Router);
      setLoading(false);
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
    }
  
  };



  const logout = async() => {
    try {
      setLoading(true);
      await logoutFunction(Router);
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.error('Log Out error:', error);
      setLoading(false);
    }
  };

  const checkSession = async() => {
    try {
      setLoading(true);
      await checkSessionFunction(setUser, Router);
      setLoading(false)
    } catch (error) {
      console.error('Check session error:', error);
      setLoading(false)
    }
  };

  

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);