"use client";

import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#EEF2F8]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2L18 10L26 14L18 18L14 26L10 18L2 14L10 10L14 2Z"
              fill="#2563EB"
            />
          </svg>
          <span className="text-lg font-bold text-gray-900">Lumina</span>
        </div>
        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M6.5 6C6.5 5.17 7.17 4.5 8 4.5C8.83 4.5 9.5 5.17 9.5 6C9.5 6.83 8.83 7.5 8 7.5V9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="8" cy="11" r="0.75" fill="currentColor" />
          </svg>
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md px-10 py-10">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Bienvenido</h1>
          <p className="text-gray-500 text-sm mb-8">
            Inicia sesión en tu cuenta inteligente Lumina
          </p>

          {/* Form */}
          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="1.5" y="3.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M1.5 6L9 10.5L16.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="3" y="8" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6 8V5.5C6 3.84 7.34 2.5 9 2.5C10.66 2.5 12 3.84 12 5.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M1 9C1 9 4 3 9 3C14 3 17 9 17 9C17 9 14 15 9 15C4 15 1 9 1 9Z" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M1 9C1 9 4 3 9 3C14 3 17 9 17 9C17 9 14 15 9 15C4 15 1 9 1 9Z" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
            >
              Entrar
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-medium text-gray-400 tracking-widest uppercase">
              O continúa con
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="flex gap-3">
            {/* Google */}
            <button className="flex-1 flex items-center justify-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18.17 10.23c0-.66-.06-1.3-.16-1.91H10v3.62h4.59a3.92 3.92 0 01-1.7 2.57v2.13h2.75c1.61-1.48 2.53-3.66 2.53-6.41z" fill="#4285F4" />
                <path d="M10 18.5c2.3 0 4.23-.76 5.64-2.06l-2.75-2.13c-.76.51-1.73.81-2.89.81-2.22 0-4.1-1.5-4.77-3.51H2.39v2.2A8.5 8.5 0 0010 18.5z" fill="#34A853" />
                <path d="M5.23 11.61A5.1 5.1 0 014.96 10c0-.56.1-1.1.27-1.61V6.19H2.39A8.5 8.5 0 001.5 10c0 1.37.33 2.67.89 3.81l2.84-2.2z" fill="#FBBC05" />
                <path d="M10 4.88c1.25 0 2.37.43 3.25 1.27l2.44-2.44C14.22 2.34 12.3 1.5 10 1.5A8.5 8.5 0 002.39 6.19l2.84 2.2C5.9 6.38 7.78 4.88 10 4.88z" fill="#EA4335" />
              </svg>
            </button>
            {/* Apple */}
            <button className="flex-1 flex items-center justify-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.62 2c.08.56-.16 1.12-.47 1.54-.33.44-.88.78-1.42.74-.09-.54.14-1.1.45-1.5.34-.44.93-.8 1.44-.78zm1.88 3.5c-.77-.47-1.65-.67-2.49-.65-.66.02-1.28.2-1.83.47-.38.19-.7.38-1.02.38-.34 0-.68-.19-1.09-.4a4.46 4.46 0 00-1.92-.45c-1.49.03-2.91.88-3.69 2.24-.83 1.42-.89 4.1.43 6.34.5.83 1.17 1.77 2.07 1.78.77.01 1.02-.48 2.04-.49 1.01-.01 1.22.5 2 .49.9-.01 1.6-.98 2.1-1.81.44-.73.62-1.09.97-1.91-2.5-.95-2.9-4.5-.35-5.83.63-.34 1.26-.48 1.78-.16z" />
              </svg>
            </button>
            {/* Meta */}
            <button className="flex-1 flex items-center justify-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM13.5 7.5H12C11.45 7.5 11 7.95 11 8.5V9.5H13.5L13 12H11V18H8.5V12H7V9.5H8.5V8C8.5 6.62 9.62 5.5 11 5.5H13.5V7.5Z" fill="#1877F2" />
              </svg>
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            ¿No tienes una cuenta?{" "}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Crea una ahora
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-400">
        © 2026 Lumina Tech. Comercio inteligente simplificado.
      </footer>
    </div>
  );
}
