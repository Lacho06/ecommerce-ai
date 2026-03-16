"use client";

import { useState } from "react";
import AIChatModal from "./components/AIChatModal";

const PRODUCTS = [
  {
    badge: { label: "AI PICK", color: "bg-green-500" },
    name: "AI Pick: Pro Watch Gen 5",
    desc: "Optimized for your running routine",
    price: "$299.00",
    bg: "bg-gray-900",
  },
  {
    badge: { label: "98% MATCH", color: "bg-blue-500" },
    name: "Noise Cancel Buds Elite",
    desc: "Top rated for focus sessions",
    price: "$189.00",
    bg: "bg-orange-100",
  },
  {
    badge: null,
    name: "Eco Grip Pro Yoga Mat",
    desc: "Sustainable fitness choice",
    price: "$75.00",
    bg: "bg-amber-100",
  },
  {
    badge: { label: "NEW ARRIVAL", color: "bg-gray-800" },
    name: "Speed Run Shoes V3",
    desc: "Perfect for trail running",
    price: "$145.00",
    bg: "bg-gray-800",
  },
];

const TRENDING = [
  {
    label: "PRODUCTIVITY",
    labelColor: "text-blue-500",
    name: "The Ultimate Deep Work Kit",
    desc: "3,400 people are viewing this right now",
    bg: "bg-gray-700",
  },
  {
    label: "FITNESS",
    labelColor: "text-green-500",
    name: "Smart Home Gym Essentials",
    desc: "Top gift choice for 2024",
    bg: "bg-gray-600",
  },
  {
    label: "TECH",
    labelColor: "text-cyan-400",
    name: "AI-Powered Wearables",
    desc: "Recently featured in TechDaily",
    bg: "bg-gray-900",
  },
];

const SUGGESTIONS = [
  "Mechanical keyboard for coding",
  "Minimalist desk setup",
  "Best noise-cancelling buds",
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L10 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H6L8 1Z" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-base">AI-Shop</span>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {["Shop", "Deals", "Trending", "About"].map((item) => (
            <a key={item} href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 2.5H2.5C1.95 2.5 1.5 2.95 1.5 3.5V10.5C1.5 11.05 1.95 11.5 2.5 11.5H5L8 14.5L11 11.5H13.5C14.05 11.5 14.5 11.05 14.5 10.5V3.5C14.5 2.95 14.05 2.5 13.5 2.5Z" stroke="white" strokeWidth="1.2" fill="none" />
            </svg>
            Connect WhatsApp
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
              <path d="M2 14C2 11.79 4.69 10 8 10C11.31 10 14 11.79 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-linear-to-br from-[#1a1f4e] via-[#2d3480] to-[#3b4cb8] overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-blue-400/20 rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-col items-center text-center px-6 pt-16 pb-20 gap-6">
          {/* Badge */}
          <span className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            NEXT-GEN SHOPPING
          </span>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight max-w-2xl">
            Shop Smarter with{" "}
            <span className="bg-linear-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Conversational AI
            </span>
          </h1>

          <p className="text-white/70 text-base max-w-xl">
            Skip the filters. Just tell us what you need and let our AI curate the perfect products for you.
          </p>

          {/* Search */}
          <div className="w-full max-w-xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex items-center gap-2 shadow-xl">
            <span className="text-white/50 pl-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L10.5 6.5H15.5L11.5 9.5L13 14L9 11L5 14L6.5 9.5L2.5 6.5H7.5L9 2Z" fill="currentColor" opacity="0.6" />
              </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for today? (e.g., I need a gift for a fitness enthusiast)"
              className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none"
            />
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.5" />
                <path d="M9.5 9.5L13 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Search
            </button>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 justify-center">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="text-xs text-white/70 border border-white/20 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors"
              >
                "{s}"
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Recommendations */}
      <section className="px-8 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase flex items-center gap-1.5 mb-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L7.2 4.5H11L8 6.8L9.2 10.5L6 8.2L2.8 10.5L4 6.8L1 4.5H4.8L6 1Z" fill="#2563EB" />
              </svg>
              Personalized for you
            </p>
            <h2 className="text-2xl font-bold text-gray-900">Smart Recommendations</h2>
          </div>
          <a href="#" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
            View All
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <div className={`relative h-44 ${p.bg} flex items-center justify-center`}>
                {p.badge && (
                  <span className={`absolute top-3 left-3 ${p.badge.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                    {p.badge.label}
                  </span>
                )}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.2">
                  <rect x="8" y="12" width="32" height="24" rx="4" stroke="white" strokeWidth="2" />
                  <circle cx="24" cy="24" r="7" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-900 text-sm leading-tight">{p.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{p.desc}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-blue-600 font-bold text-sm">{p.price}</span>
                  <button className="w-7 h-7 bg-gray-100 hover:bg-blue-50 rounded-lg flex items-center justify-center transition-colors">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1H2.5L3.5 8H10.5L11.5 4H4" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="5" cy="11" r="1" fill="#374151" />
                      <circle cx="9.5" cy="11" r="1" fill="#374151" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TRENDING.map((t) => (
            <div key={t.name} className={`relative rounded-2xl overflow-hidden h-56 ${t.bg} cursor-pointer group`}>
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${t.labelColor}`}>{t.label}</p>
                <p className="text-white font-bold text-base leading-tight">{t.name}</p>
                <p className="text-white/60 text-xs mt-1">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L10 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H6L8 1Z" fill="white" />
                </svg>
              </div>
              <span className="font-bold text-gray-900">AI-Shop</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Redefining the online shopping experience through artificial intelligence and personalized curation.
            </p>
            <div className="flex gap-2">
              {[
                <path key="share" d="M10 3.5C10 4.88 8.88 6 7.5 6C6.12 6 5 4.88 5 3.5C5 2.12 6.12 1 7.5 1C8.88 1 10 2.12 10 3.5ZM10 12.5C10 13.88 8.88 15 7.5 15C6.12 15 5 13.88 5 12.5C5 11.12 6.12 10 7.5 10C8.88 10 10 11.12 10 12.5ZM15 8C15 9.38 13.88 10.5 12.5 10.5C11.12 10.5 10 9.38 10 8C10 6.62 11.12 5.5 12.5 5.5C13.88 5.5 15 6.62 15 8Z" />,
                <path key="globe" d="M8 1C4.13 1 1 4.13 1 8C1 11.87 4.13 15 8 15C11.87 15 15 11.87 15 8C15 4.13 11.87 1 8 1ZM8 13.5C5 13.5 2.5 11 2.5 8C2.5 5 5 2.5 8 2.5C11 2.5 13.5 5 13.5 8C13.5 11 11 13.5 8 13.5Z" />,
                <path key="chat" d="M13.5 2.5H2.5C1.95 2.5 1.5 2.95 1.5 3.5V10.5C1.5 11.05 1.95 11.5 2.5 11.5H5L8 14.5L11 11.5H13.5C14.05 11.5 14.5 11.05 14.5 10.5V3.5C14.5 2.95 14.05 2.5 13.5 2.5Z" />,
              ].map((pathEl, i) => (
                <button key={i} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                    {pathEl}
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-4">Shop</p>
            <ul className="flex flex-col gap-2.5">
              {["Featured", "Best Sellers", "New Arrivals", "Deals"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-4">Support</p>
            <ul className="flex flex-col gap-2.5">
              {["Help Center", "Track Order", "Shipping Info", "Returns"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-4">Company</p>
            <ul className="flex flex-col gap-2.5">
              {["About Us", "Careers", "Contact", "Partners"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">© 2026 AI-Shop Inc. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookies Settings"].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* AI Chat Modal */}
      <AIChatModal open={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Floating chat button */}
      <button
        onClick={() => setChatOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-colors z-50"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M17 3H3C2.45 3 2 3.45 2 4V13C2 13.55 2.45 14 3 14H6.5L10 18L13.5 14H17C17.55 14 18 13.55 18 13V4C18 3.45 17.55 3 17 3Z" fill="white" />
        </svg>
      </button>
    </div>
  );
}
