"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { Session } from "@/types";
import { mockApi } from "@/mock-api/api";
import { SESSION_STORAGE_KEY, SESSION_EXPIRY_BUFFER } from "@/lib/constants";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSessionExpiry = useCallback((session: Session | null): boolean => {
    if (!session?.expiresAt) return false;
    const expiryTime = new Date(session.expiresAt).getTime();
    const now = Date.now();
    return now < expiryTime - SESSION_EXPIRY_BUFFER;
  }, []);

  const loadSession = useCallback(async () => {
    try {
      const currentSession = await mockApi.getSession();
      if (currentSession && checkSessionExpiry(currentSession)) {
        setSession(currentSession);
      } else {
        // Session expired
        if (typeof window !== "undefined") {
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
        setSession(null);
      }
    } catch (error) {
      console.error("Failed to load session:", error);
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, [checkSessionExpiry]);

  useEffect(() => {
    loadSession();

    // Set up session expiry check interval
    const interval = setInterval(() => {
      if (session && !checkSessionExpiry(session)) {
        setSession(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [loadSession, session, checkSessionExpiry]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const newSession = await mockApi.login(email, password);
      setSession(newSession);
      // Cookie is already set by mockApi.login, but ensure it's there
      // Wait a tick to ensure cookie is set
      await new Promise((resolve) => setTimeout(resolve, 50));
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await mockApi.logout();
      setSession(null);
    } catch (error) {
      console.error("Failed to logout:", error);
      // Clear session even if API call fails
      setSession(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        // Clear cookie
        document.cookie = "session=; path=/; max-age=0; SameSite=Lax";
      }
    }
  }, []);

  const refreshSession = useCallback(async () => {
    await loadSession();
  }, [loadSession]);

  const isAuthenticated = useMemo(() => {
    return !!session && checkSessionExpiry(session);
  }, [session, checkSessionExpiry]);

  const value = useMemo(
    () => ({
      session,
      loading,
      login,
      logout,
      refreshSession,
      isAuthenticated,
    }),
    [session, loading, login, logout, refreshSession, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
