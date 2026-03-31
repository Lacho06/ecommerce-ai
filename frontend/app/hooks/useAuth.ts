"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const TOKEN_KEY = "lumina_token";

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function removeCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Credenciales inválidas");
      }

      const data: AuthResponse = await res.json();
      setCookie(TOKEN_KEY, data.access_token);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  }

  async function register(email: string, password: string, name: string) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Error al crear la cuenta");
      }

      const data: AuthResponse = await res.json();
      setCookie(TOKEN_KEY, data.access_token);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  }

  async function getMe(): Promise<AuthUser | null> {
    const token = getCookie(TOKEN_KEY);
    if (!token) return null;

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  }

  function logout() {
    removeCookie(TOKEN_KEY);
    router.push("/login");
  }

  function getToken(): string | null {
    return getCookie(TOKEN_KEY);
  }

  return { login, register, logout, getMe, getToken, isLoading, error };
}
