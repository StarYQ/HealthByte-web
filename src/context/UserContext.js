'use client';

import React, { createContext, useState, useEffect } from 'react';
import supabase from '@/lib/supabase';  

export const UserContext = createContext(null);

export const UserProvider = ({ initialUser, children }) => {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    // fetch user data from server
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/getUser');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const { user } = await response.json();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    };

    // listens for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          fetchUserData();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    // fetch once if we have no user initially
    if (!user) {
      fetchUserData();
    }

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
