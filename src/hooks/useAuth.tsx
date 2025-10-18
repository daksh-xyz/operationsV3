import { createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { removeCookie } from "../utils/cookie";
import { removeValueFromLocalStorage } from "../utils/generic";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  userData?: User | null;
}

export const AuthProvider = ({ children, userData }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>("user", userData || null);
  const navigate = useNavigate();

  const login = (userData: User) => {
    setUser(userData);
    navigate("/", { replace: true });
  };

  const logout = async () => {
    await setUser(null);
    await removeCookie("token");
    removeValueFromLocalStorage("token");
    navigate("/login", { replace: true });
  };

  const value: AuthContextType = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

