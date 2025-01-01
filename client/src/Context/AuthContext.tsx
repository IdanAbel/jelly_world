import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticatedWithGoogle: boolean;
  setAuthenticatedWithGoogle: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticatedWithGoogle, setAuthenticatedWithGoogle] =
    useState<boolean>(() => {
      return localStorage.getItem("isAuthenticatedWithGoogle") === "true";
    });

  useEffect(() => {
    localStorage.setItem(
      "isAuthenticatedWithGoogle",
      JSON.stringify(isAuthenticatedWithGoogle)
    );
  }, [isAuthenticatedWithGoogle]);

  const value: AuthContextType = {
    isAuthenticatedWithGoogle,
    setAuthenticatedWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
