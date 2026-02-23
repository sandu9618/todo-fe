import axios from "axios";
import { createContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
}

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
  role: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    console.log("useEffect authcontext");
    let token = localStorage.getItem('token');
    if (token) {
      let payload = JSON.parse(atob(token.split(".")[1]));
      setUser({id: payload.id, email: payload.email});
      setRole(payload.role);
      console.log(payload.role);
    }
  },[])

  const signup = async (name: string, email: string, password: string) => {
    try {
      let body = {name, email, password};
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
      await axios.post(`${apiUrl}/auth/signup`, body);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
      const response = await axios.post(`${apiUrl}/auth/login`, {email, password});
      localStorage.setItem('token', response.data.access_token);
      setToken(response.data.access_token);
      setUser({id: response.data.user.id, email: response.data.user.email});
      setRole(response.data.user.role);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
    value={{
      user,
      isAuthenticated: !!user,
      signup, login, logout, token, role
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}