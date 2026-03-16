"use client";

import { useState, useRef, useEffect } from "react";

const ORDER_ITEMS = [
  {
    name: "SpeedMax Pro Runner",
    variant: "Size: 10, Color: Red",
    price: 129.0,
    bg: "bg-red-50",
    iconColor: "#EF4444",
  },
  {
    name: "Tempo Digital Watch",
    variant: "Edition: Sport",
    price: 85.0,
    bg: "bg-gray-800",
    iconColor: "#E5E7EB",
  },
];

const SUBTOTAL = 214.0;
const TAX = 17.12;
const TOTAL = SUBTOTAL + TAX;

type Message = { role: "assistant" | "user"; text: string };

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    text: "I'm preparing your order now. Could you please confirm your shipping address for the delivery?",
  },
  {
    role: "user",
    text: "123 Design St, Creative City, 10101",
  },
  {
    role: "assistant",
    text: "Perfect! Now, how would you like to pay? I can handle secure credit card payments or we can finish this on WhatsApp.",
  },
];

export default function CartPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [progress] = useState(65);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Procesando tu respuesta, un momento por favor...",
        },
      ]);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center px-6 py-12">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-5 items-start">

        {/* Left — Checkout AI Chat */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1.5L11 7H17L12.5 10.5L14 16L9 12.5L4 16L5.5 10.5L1 7H7L9 1.5Z" fill="white" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">Checkout AI</p>
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  AI Assistant Online
                </p>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Progress */}
          <div className="px-5 pt-4 pb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-blue-600">Preparing your order...</span>
              <span className="text-sm font-semibold text-gray-500">{progress}% Complete</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 px-5 py-4 flex flex-col gap-4 overflow-y-auto min-h-[300px] max-h-[420px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                {msg.role === "assistant" ? (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="5" r="2.5" stroke="#9CA3AF" strokeWidth="1.3" />
                      <path d="M2 12C2 9.79 4.24 8 7 8C9.76 8 12 9.79 12 12" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center shrink-0 overflow-hidden">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="8" r="4" fill="#FB923C" />
                      <path d="M3 18C3 14.69 6.13 12 10 12C13.87 12 17 14.69 17 18" fill="#FDBA74" />
                    </svg>
                  </div>
                )}

                <div className="flex flex-col gap-1 max-w-[80%]">
                  {msg.role === "assistant" && (
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest ml-0.5">
                      Assistant
                    </span>
                  )}
                  {msg.role === "user" && (
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-right mr-0.5">
                      You
                    </span>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-gray-50 text-gray-700 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 px-4 py-3 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              placeholder="Type your response here..."
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-9 h-9 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 7L1 1L4 7L1 13L13 7Z" fill="white" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right — Order Summary */}
        <div className="w-full md:w-[340px] flex flex-col gap-4">
          {/* Summary card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

            {/* Items */}
            <div className="flex flex-col gap-3">
              {ORDER_ITEMS.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <rect x="4" y="8" width="20" height="12" rx="3" stroke={item.iconColor} strokeWidth="1.5" />
                      <circle cx="14" cy="14" r="4" stroke={item.iconColor} strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.variant}</p>
                    <p className="text-sm font-bold text-blue-600 mt-0.5">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Pricing */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-800 font-medium">${SUBTOTAL.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span className="text-green-500 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Tax</span>
                <span className="text-gray-800 font-medium">${TAX.toFixed(2)}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900 text-base">Total</span>
              <span className="font-extrabold text-gray-900 text-lg">${TOTAL.toFixed(2)}</span>
            </div>
          </div>

          {/* Secure checkout */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5L15.5 4.5V9C15.5 12.5 12.7 15.7 9 16.5C5.3 15.7 2.5 12.5 2.5 9V4.5L9 1.5Z" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M6 9L8 11L12 7" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">Secure Checkout</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your payment details are encrypted and processed securely. We never store your full credit card information.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {/* Credit card */}
              <div className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M1.5 7H16.5" stroke="currentColor" strokeWidth="1.3" />
                  <rect x="3" y="10" width="4" height="1.5" rx="0.5" fill="currentColor" />
                </svg>
              </div>
              {/* Bank */}
              <div className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 7L9 2L16 7H2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M3 7V14M6 7V14M9 7V14M12 7V14M15 7V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M1.5 14H16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              {/* Wallet */}
              <div className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1.5" y="5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M1.5 8H16.5" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="13" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M5 4L9 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
