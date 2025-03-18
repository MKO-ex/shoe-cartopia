
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, loginUser, registerUser, logoutUser } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { toast } from "@/components/ui/use-toast";

type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error: any }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error: any }>;
  logout: () => Promise<{ success: boolean; error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await loginUser(email, password);
    if (result.error) {
      toast({
        title: "Login failed",
        description: result.error.message || "Failed to login",
        variant: "destructive",
      });
      return { success: false, error: result.error };
    }
    toast({
      title: "Login successful",
      description: "Welcome back!",
    });
    return { success: true, error: null };
  };

  const register = async (email: string, password: string) => {
    const result = await registerUser(email, password);
    if (result.error) {
      toast({
        title: "Registration failed",
        description: result.error.message || "Failed to register",
        variant: "destructive",
      });
      return { success: false, error: result.error };
    }
    toast({
      title: "Registration successful",
      description: "Your account has been created",
    });
    return { success: true, error: null };
  };

  const logout = async () => {
    const result = await logoutUser();
    if (result.error) {
      toast({
        title: "Logout failed",
        description: result.error.message || "Failed to logout",
        variant: "destructive",
      });
      return { success: false, error: result.error };
    }
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    return { success: true, error: null };
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
