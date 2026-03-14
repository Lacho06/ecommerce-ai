"use client";

import { useState } from "react";

const CATEGORIES = ["Tecnología", "Moda", "Hogar", "Deportes", "Gaming"];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [selected, setSelected] = useState<string[]>(["Moda", "Deportes"]);
  const [password, setPassword] = useState("........");

  const toggleCategory = (cat: string) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Débil", "Media", "Fuerte"][strength];
  const strengthColor = ["", "text-red-500", "text-yellow-500", "text-green-600"][strength];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z" fill="white" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900">SmartCommerce</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">¿Ya tienes cuenta?</span>
          <a
            href="/login"
            className="text-sm font-medium text-blue-600 border border-blue-200 bg-blue-50 px-4 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Iniciar Sesión
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-5xl flex gap-10 items-center">

          {/* Left column */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Bienvenido a la<br />compra del futuro.
              </h1>
              <p className="text-gray-500 text-base leading-relaxed">
                Nuestra IA aprende de tus gustos para ofrecerte solo lo que realmente te apasiona. Crea tu perfil inteligente hoy.
              </p>
            </div>

            {/* Feature cards */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-4 border border-gray-100 rounded-xl p-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L17 5V10C17 13.87 13.87 17.5 10 18.5C6.13 17.5 3 13.87 3 10V5L10 2Z" stroke="#4F6EF7" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Seguridad Avanzada</p>
                  <p className="text-gray-500 text-sm mt-0.5">Tus datos están protegidos con cifrado de nivel bancario.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border border-gray-100 rounded-xl p-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="8" r="4" stroke="#4F6EF7" strokeWidth="1.5" />
                    <path d="M6 8C6 8 5 12 10 12C15 12 14 8 14 8" stroke="#4F6EF7" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M10 12V16" stroke="#4F6EF7" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7.5 15.5H12.5" stroke="#4F6EF7" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">IA Personalizada</p>
                  <p className="text-gray-500 text-sm mt-0.5">Sugerencias basadas en tus intereses reales.</p>
                </div>
              </div>
            </div>

            {/* App mockup */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 h-52 flex items-end justify-center px-6 pt-6">
              <div className="w-full bg-white rounded-t-xl shadow-lg p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-1">
                  <div className="h-2.5 w-24 bg-gray-200 rounded" />
                  <div className="h-5 w-12 bg-blue-500 rounded-full" />
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg shrink-0" />
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="h-2 bg-gray-200 rounded w-3/4" />
                      <div className="h-2 bg-gray-100 rounded w-1/2" />
                    </div>
                    <div className="h-2 w-8 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — form card */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Crear cuenta</h2>
            <p className="text-gray-500 text-sm mb-6">Empieza tu experiencia personalizada</p>

            <form className="flex flex-col gap-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Password + Confirm */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-3 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <path d="M1 9C1 9 4 3 9 3C14 3 17 9 17 9C17 9 14 15 9 15C4 15 1 9 1 9Z" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirmar
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Password strength */}
              {password.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Seguridad</span>
                    <span className={`text-xs font-semibold ${strengthColor}`}>{strengthLabel}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i <= strength
                            ? strength === 1 ? "bg-red-400" : strength === 2 ? "bg-yellow-400" : "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">
                    Usa al menos 8 caracteres, una mayúscula y un número.
                  </p>
                </div>
              )}

              {/* Categories */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L8.5 5H13L9.5 7.5L11 11.5L7 9L3 11.5L4.5 7.5L1 5H5.5L7 1Z" fill="#6366F1" />
                  </svg>
                  Personaliza tus recomendaciones
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                        selected.includes(cat)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-1"
              >
                Crear mi cuenta inteligente
              </button>

              {/* Legal */}
              <p className="text-center text-xs text-gray-400">
                Al registrarte, aceptas nuestros{" "}
                <a href="#" className="text-blue-600 hover:underline">Términos de Servicio</a>
                {" "}y{" "}
                <a href="#" className="text-blue-600 hover:underline">Política de Privacidad</a>.
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-400">
        © 2026 SmartCommerce AI. Todos los derechos reservados.
      </footer>
    </div>
  );
}
