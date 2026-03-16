"use client";

import { useState, useRef, useEffect } from "react";

interface Product {
  name: string;
  desc: string;
  price: string;
  aiMatch?: boolean;
}

interface Message {
  role: "user" | "ai";
  text?: string;
  products?: Product[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "user",
    text: "Help me find a gift for a fitness enthusiast! Budget is around $300.",
  },
  {
    role: "ai",
    text: "I've found two perfect matches based on your preferences! Both are highly rated for fitness and fall within your budget.",
    products: [
      {
        name: "AI Pick: Pro Watch Gen 5",
        desc: "Premium tracking for athletes",
        price: "$299.00",
        aiMatch: true,
      },
      {
        name: "Eco Grip Pro Yoga Mat",
        desc: "Sustainability meets performance",
        price: "$75.00",
      },
    ],
  },
];

interface AIChatModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AIChatModal({ open, onClose }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
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
          role: "ai",
          text: "Déjame buscar más opciones para ti basadas en eso...",
        },
      ]);
    }, 800);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-22 right-6 z-50 w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="5" width="10" height="8" rx="2" stroke="white" strokeWidth="1.3" />
              <path d="M5 5V4C5 2.9 5.9 2 7 2H9C10.1 2 11 2.9 11 4V5" stroke="white" strokeWidth="1.3" />
              <circle cx="6" cy="9" r="1" fill="white" />
              <circle cx="10" cy="9" r="1" fill="white" />
              <path d="M6 11.5H10" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">AI Shopping Assistant</p>
            <p className="flex items-center gap-1 text-[11px] text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              ACTIVE NOW
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 max-h-[400px]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
            {msg.text && (
              <div
                className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            )}

            {/* Product cards inside chat */}
            {msg.products && (
              <div className="w-full flex flex-col gap-2 mt-1">
                {msg.products.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 hover:border-blue-300 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <rect x="3" y="5" width="16" height="12" rx="2" stroke="#9CA3AF" strokeWidth="1.3" />
                        <circle cx="11" cy="11" r="3" stroke="#9CA3AF" strokeWidth="1.3" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">{p.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{p.desc}</p>
                      <p className="text-sm font-bold text-blue-600 mt-0.5">{p.price}</p>
                    </div>
                    {p.aiMatch && (
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full shrink-0">
                        AI Match
                      </span>
                    )}
                  </div>
                ))}

                {/* Quick actions */}
                <div className="flex gap-2 mt-1">
                  <button className="text-xs text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors">
                    Show details
                  </button>
                  <button className="text-xs text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors">
                    More like these
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 px-3 py-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type your reply..."
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="w-8 h-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 7L1 1L4 7L1 13L13 7Z" fill="white" />
          </svg>
        </button>
      </div>
    </div>
  );
}
