"use client";

import { useState } from "react";

const SPECS = [
  { icon: "cpu", label: "PROCESSOR", value: "128 TFLOPS AI" },
  { icon: "battery", label: "ENDURANCE", value: "48 Hrs Active" },
  { icon: "zap", label: "LATENCY", value: "1.2ms Sync" },
  { icon: "shield", label: "SECURITY", value: "Euantum-Safe" },
];

const CAPABILITIES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C14 4 6 8 6 14V20L14 23L22 20V14C22 8 14 4 14 4Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="2.5" stroke="#3B82F6" strokeWidth="1.5" />
      </svg>
    ),
    title: "Nano-Scale Interface",
    desc: "Engineered with graphene circuitry for extreme durability and thermal management at atomic scales.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14C4 14 8 10 14 10C20 10 24 14 24 14C24 14 20 18 14 18C8 18 4 14 4 14Z" stroke="#3B82F6" strokeWidth="1.5" />
        <path d="M10 14C10 14 12 11 16 11" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 14C18 14 16 17 12 17" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Infinite Scalability",
    desc: "Daisy-chain up to 128 units for massive parallel processing tasks without signal degradation.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="8" y="4" width="12" height="20" rx="2" stroke="#3B82F6" strokeWidth="1.5" />
        <path d="M11 8H17M11 12H17M11 16H14" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Air-Gapped OS",
    desc: "Our proprietary OS ensures your data never leaves the device unless physically authorized.",
  },
];

const AI_MESSAGES = [
  {
    role: "ai" as const,
    text: "I've analyzed your interest in precision engineering. The Quantum-X Pro isn't just a tool; it's a force multiplier. If you value 99.999% uptime and zero-latency feedback loops, this is the only logical choice in its class.",
  },
  {
    role: "user" as const,
    text: "How does it compare to the c1.0?",
  },
  {
    role: "ai" as const,
    text: "Version 2.0 introduces the Neon-G core which handles 40% more concurrent neural threads while consuming 15% less battery. It's essentially the jump from flight to warp speed.",
  },
];

export default function ProductPage() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [aiInput, setAiInput] = useState("");
  const [messages, setMessages] = useState(AI_MESSAGES);

  const sendMessage = () => {
    const text = aiInput.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setAiInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Analizando tu pregunta sobre el producto..." },
      ]);
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L10 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H6L8 1Z" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-sm">Euantum-M<span className="text-blue-600">Pro</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {["Products", "Enterprise", "Support"].map((item) => (
            <a key={item} href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{item}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-gray-800">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button className="relative text-gray-500 hover:text-gray-800">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1H3L4.5 10H13.5L15 5H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="6" cy="13.5" r="1.2" fill="currentColor" />
              <circle cx="12" cy="13.5" r="1.2" fill="currentColor" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
          </button>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">JD</div>
        </div>
      </header>

      {/* Product Section */}
      <section className="px-8 py-10 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-10">

          {/* Gallery */}
          <div className="flex flex-col gap-3 w-full md:w-[45%]">
            <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center border border-gray-100">
              {/* Main image placeholder */}
              <div className="w-40 h-40 bg-gray-200 rounded-2xl flex items-center justify-center">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <rect x="8" y="16" width="40" height="24" rx="4" stroke="#9CA3AF" strokeWidth="2" />
                  <circle cx="28" cy="28" r="7" stroke="#9CA3AF" strokeWidth="2" />
                  <circle cx="28" cy="28" r="3" fill="#D1D5DB" />
                </svg>
              </div>
              {/* Badges */}
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="text-[10px] font-bold bg-green-500 text-white px-2 py-0.5 rounded-full">NEW RELEASE</span>
                <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full">AI INTEGRATED</span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`w-16 h-16 rounded-xl border-2 bg-gray-100 flex items-center justify-center transition-colors ${activeThumb === i ? "border-blue-500" : "border-gray-200"}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="#9CA3AF" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="3" stroke="#9CA3AF" strokeWidth="1.5" />
                  </svg>
                </button>
              ))}
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 ml-auto">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col gap-4">
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase">Quantum Series</p>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">Quantum-X Pro v2.0</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 16 16" fill={s <= 4 ? "#F59E0B" : "none"}>
                    <path d="M8 1L10 6H15L11 9L12.5 14L8 11L3.5 14L5 9L1 6H6L8 1Z" stroke="#F59E0B" strokeWidth="1" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">4.8</span>
              <span className="text-sm text-gray-400">(2.4k Reviews)</span>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              Experience the pinnacle of precision engineering. The Quantum-X Pro leverages real-time neural processing to redefine how you interface with complex data environments. Sleek, powerful, and undeniably ahead of its time.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-gray-900">$2,499.00</span>
              <span className="text-base text-gray-400 line-through">$2,899.00</span>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3">
              {SPECS.map((spec) => (
                <div key={spec.label} className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5">
                  <div className="text-blue-500">
                    {spec.icon === "cpu" && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="3" y="3" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                        <rect x="5.5" y="5.5" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M6 1V3M10 1V3M6 13V15M10 13V15M1 6H3M1 10H3M13 6H15M13 10H15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    )}
                    {spec.icon === "battery" && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="1" y="5" width="12" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M13 7V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                        <rect x="2.5" y="6.5" width="7" height="3" rx="0.5" fill="currentColor" />
                      </svg>
                    )}
                    {spec.icon === "zap" && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M9 1L4 9H8L7 15L13 7H9L9 1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                      </svg>
                    )}
                    {spec.icon === "shield" && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1L14 4V8C14 11.5 11.5 14.5 8 15.5C4.5 14.5 2 11.5 2 8V4L8 1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                        <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{spec.label}</p>
                    <p className="text-xs font-semibold text-gray-800">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mt-1">
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 1H2.5L4 9.5H11.5L13 5H5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="5.5" cy="12" r="1.2" fill="white" />
                  <circle cx="10.5" cy="12" r="1.2" fill="white" />
                </svg>
                Add to Cart
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L9.5 5.5H14.5L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L1.5 5.5H6.5L8 1Z" fill="white" />
                </svg>
                Convince Me
              </button>
            </div>

            {/* WhatsApp inquiry */}
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M12 2H2C1.45 2 1 2.45 1 3V9C1 9.55 1.45 10 2 10H4.5L7 13L9.5 10H12C12.55 10 13 9.55 13 9V3C13 2.45 12.55 2 12 2Z" fill="white" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-800">Direct Inquiries</p>
                  <p className="text-xs text-green-600">Chat with a product specialist now</p>
                </div>
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Expert Advisor */}
      <section className="bg-linear-to-br from-[#1a1f5e] via-[#2a3080] to-[#1e3a8a] px-8 py-14">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-start">

          {/* Left */}
          <div className="flex-1 flex flex-col gap-5">
            <span className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 text-green-400 text-xs font-bold px-3 py-1 rounded-full w-fit">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <path d="M5 0L6.5 3.5H10L7.5 5.5L8.5 9L5 7L1.5 9L2.5 5.5L0 3.5H3.5L5 0Z" />
              </svg>
              AI EXPERT ADVISOR
            </span>

            <h2 className="text-3xl font-extrabold text-white leading-snug">
              Why is the Euantum-X Pro right for{" "}
              <span className="text-white underline decoration-green-400 decoration-2">you</span>?
            </h2>

            <p className="text-white/60 text-sm leading-relaxed">
              Based on current industry benchmarks and your pursuit of excellence, here's how this device transforms your workflow:
            </p>

            <div className="flex flex-col gap-4 mt-2">
              {[
                {
                  title: "Automated Precision",
                  desc: "Reduces manual calibration time by 74% compared to standard models.",
                },
                {
                  title: "Future-Proof Architecture",
                  desc: "Supports OTA updates for the next 8 years of neuro-interfacing standards.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-white/50 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — AI Chat */}
          <div className="w-full md:w-[420px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
            {/* Chat header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="5" r="2.5" stroke="white" strokeWidth="1.3" />
                  <path d="M2 12C2 9.79 4.24 8 7 8C9.76 8 12 9.79 12 12" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">AI Assistant "Aria"</p>
                <p className="flex items-center gap-1 text-[11px] text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                  Active & Analyzing Context...
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="px-4 py-4 flex flex-col gap-3 max-h-64 overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white rounded-br-sm"
                        : "bg-white/15 text-white/90 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-white/10 px-3 py-3 flex items-center gap-2">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                placeholder="Ask Aria anything about the product..."
                className="flex-1 bg-transparent text-white/80 placeholder-white/30 text-xs outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!aiInput.trim()}
                className="w-8 h-8 bg-green-500 hover:bg-green-600 disabled:opacity-40 rounded-full flex items-center justify-center transition-colors shrink-0"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M11 6L1 1L3.5 6L1 11L11 6Z" fill="white" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Unmatched Capabilities */}
      <section className="px-8 py-16 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">Unmatched Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap) => (
            <div key={cap.title} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col gap-3">
              <div>{cap.icon}</div>
              <p className="font-bold text-gray-900 text-base">{cap.title}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 0.5L7.5 4.5H11.5L8.5 7L9.5 11L6 8.5L2.5 11L3.5 7L0.5 4.5H4.5L6 0.5Z" fill="white" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-800">Euantum-X Pro</span>
          </div>

          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Warranty"].map((item) => (
              <a key={item} href="#" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">{item}</a>
            ))}
          </div>

          <button className="text-gray-400 hover:text-gray-700 transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="13" cy="4" r="2" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="13" cy="14" r="2" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="5" cy="9" r="2" stroke="currentColor" strokeWidth="1.3" />
              <path d="M7 8L11 5.5M7 10L11 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="border-t border-gray-100 py-3 text-center">
          <p className="text-xs text-gray-400">© 2024 Quantum Technologies International. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
