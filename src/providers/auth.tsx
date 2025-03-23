"use client";

import { createContext, useContext } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { ExtendedFC } from "@/types/react";
import { User } from "@/validators/auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: ExtendedFC = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  const isProtected = !pathname.startsWith("/auth");
  if (!isAuthenticated && isProtected) {
    if (typeof window === undefined) redirect("/auth/login");
    else router.push("/auth/login");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
