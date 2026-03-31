"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { AxiosError } from "axios";

const TOKEN_KEY = "auth_token";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function persist(accessToken: string) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  document.cookie = `${TOKEN_KEY}=${accessToken}; path=/; max-age=${7 * 24 * 3600}`;
}

function clear() {
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

function extractMessage(err: unknown, fallback: string): string {
  if (err instanceof AxiosError) {
    const msg = err.response?.data?.message;
    return Array.isArray(msg) ? msg[0] : (msg ?? fallback);
  }
  return fallback;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setLoading(false);
      return;
    }
    api
      .get<AuthUser>("/auth/me")
      .then(({ data }) => {
        setToken(stored);
        setUser(data);
      })
      .catch(() => clear())
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    try {
      const { data } = await api.post<{ access_token: string }>("/auth/login", { email, password });
      persist(data.access_token);
      setToken(data.access_token);
      const { data: me } = await api.get<AuthUser>("/auth/me");
      setUser(me);
      router.push("/");
    } catch (err) {
      throw new Error(extractMessage(err, "Credenciales inválidas"));
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      const { data } = await api.post<{ access_token: string }>("/auth/register", { name, email, password });
      persist(data.access_token);
      setToken(data.access_token);
      const { data: me } = await api.get<AuthUser>("/auth/me");
      setUser(me);
      router.push("/");
    } catch (err) {
      throw new Error(extractMessage(err, "Error al crear la cuenta"));
    }
  }

  function logout() {
    clear();
    setToken(null);
    setUser(null);
    router.push("/signin");
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
