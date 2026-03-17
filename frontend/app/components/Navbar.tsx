"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const NAV_LINKS = [
  { label: "Shop", href: "/" },
  { label: "Deals", href: "#" },
  { label: "Trending", href: "#" },
  { label: "About", href: "#" },
];

export default function Navbar() {
  const { logout, getMe } = useAuth();
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMe().then(setUser);
  }, []);

  // Cierra el dropdown al clickear afuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L10 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H6L8 1Z" fill="white" />
          </svg>
        </div>
        <span className="font-bold text-gray-900 text-base">AI-Shop</span>
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-7">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M13.5 2.5H2.5C1.95 2.5 1.5 2.95 1.5 3.5V10.5C1.5 11.05 1.95 11.5 2.5 11.5H5L8 14.5L11 11.5H13.5C14.05 11.5 14.5 11.05 14.5 10.5V3.5C14.5 2.95 14.05 2.5 13.5 2.5Z"
              stroke="white"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
          Connect WhatsApp
        </button>

        {/* Usuario autenticado */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                {user.email[0].toUpperCase()}
              </div>
              <span className="text-sm text-gray-700 max-w-[120px] truncate hidden sm:block">
                {user.email}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-400">Conectado como</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{user.email}</p>
                  {user.role === "admin" && (
                    <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide">Admin</span>
                  )}
                </div>
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M2 12C2 9.79 4.24 8 7 8C9.76 8 12 9.79 12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  Mi perfil
                </Link>
                <button
                  onClick={() => { setDropdownOpen(false); logout(); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 12H2.5C1.95 12 1.5 11.55 1.5 11V3C1.5 2.45 1.95 2 2.5 2H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    <path d="M9.5 9.5L12.5 7L9.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.5 7H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
              <path d="M2 14C2 11.79 4.69 10 8 10C11.31 10 14 11.79 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
}
