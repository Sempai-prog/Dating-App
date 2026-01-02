import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import { UserProfile } from '../types';
import { authService } from '../lib/auth-service';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    const initSession = async () => {
      try {
        const sessionUser = await authService.getSession();
        setUser(sessionUser);
      } catch (error) {
        console.error('Failed to restore session', error);
      } finally {
        setIsLoading(false);
      }
    };
    initSession();
  }, []);

  const signIn = async (email: string) => {
    // Password ignored in mock
    const loggedInUser = await authService.signIn(email);
    setUser(loggedInUser);
  };

  const signUp = async (email: string, name: string) => {
    // Password ignored in mock
    const newUser = await authService.signUp(email, name);
    setUser(newUser);
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};