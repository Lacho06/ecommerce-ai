"use client";

import { useState } from "react";

const STEPS = [
  { label: "Order Placed", icon: "check", done: true },
  { label: "Shipped", icon: "check", done: true },
  { label: "Out for Delivery", icon: "truck", done: false, active: true },
  { label: "Delivered", icon: "home", done: false },
];

const NAV_ITEMS = [
  { label: "Dashboard", icon: "home" },
  { label: "Orders", icon: "truck", active: true },
  { label: "Profile", icon: "user" },
  { label: "Settings", icon: "settings" },
];

function SideIcon({ type }: { type: string }) {
  if (type === "home") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 6L8 1L14 6V14H10V10H6V14H2V6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
  if (type === "truck") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="5" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M11 7.5L13.5 7.5L15 10V12H11V7.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="4" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
  if (type === "user") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 14C2 11.24 4.69 9 8 9C11.31 9 14 11.24 14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 1V3M8 13V15M1 8H3M13 8H15M2.93 2.93L4.34 4.34M11.66 11.66L13.07 13.07M2.93 13.07L4.34 11.66M11.66 4.34L13.07 2.93" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export default function ShipmentPage() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0 z-10 bg-white">
        <div className="flex items-center gap-3">
          <a href="/order/ORD-55489" className="text-gray-400 hover:text-gray-700 transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M12 4L7 9L12 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <div>
            <p className="font-bold text-gray-900 text-base leading-tight">Order Tracking</p>
            <p className="text-xs text-gray-400">ID: #ORD-55489</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">John Doe</p>
            <a href="/profile" className="text-xs text-blue-600 font-medium hover:underline">Premium Member</a>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#D1D5DB" />
              <circle cx="18" cy="14" r="6" fill="#9CA3AF" />
              <path d="M6 32C6 26.48 11.37 22 18 22C24.63 22 30 26.48 30 32" fill="#E5E7EB" />
            </svg>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 border-r border-gray-100 flex flex-col py-4 shrink-0 bg-white">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 mx-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                item.active
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className={item.active ? "text-white" : "text-gray-400"}>
                <SideIcon type={item.icon} />
              </span>
              {item.label}
            </button>
          ))}
        </aside>

        {/* Map + overlay */}
        <div className="flex-1 relative overflow-hidden">
          {/* Map (OpenStreetMap embed) */}
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-74.08%2C40.62%2C-73.85%2C40.82&layer=mapnik&marker=40.7282%2C-74.0776"
            className="absolute inset-0 w-full h-full border-none"
            title="Order tracking map"
          />

          {/* Route + truck overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 900 700" preserveAspectRatio="xMidYMid meet">
              {/* Route line */}
              <line x1="150" y1="370" x2="680" y2="370" stroke="#2563EB" strokeWidth="3" strokeDasharray="10 4" opacity="0.9" />
              {/* Truck icon */}
              <circle cx="680" cy="370" r="20" fill="#2563EB" />
              <rect x="666" y="362" width="14" height="10" rx="2" fill="white" />
              <path d="M680 362L686 362L689 368V372H680V362Z" fill="white" />
              <circle cx="670" cy="373" r="2" fill="#2563EB" />
              <circle cx="684" cy="373" r="2" fill="#2563EB" />
              {/* Home pin */}
              <circle cx="820" cy="340" r="14" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
              <path d="M814 341L820 336L826 341V347H823V344H817V347H814V341Z" fill="#6B7280" />
              <text x="830" y="336" fill="#374151" fontSize="11" fontWeight="600" fontFamily="sans-serif">Home</text>
            </svg>
          </div>

          {/* Bottom overlay panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-6 py-5">
            <div className="flex flex-col md:flex-row gap-5 max-w-5xl">

              {/* Left — Status + ETA */}
              <div className="flex-1 flex flex-col gap-3">
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold text-blue-600 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                    IN TRANSIT / EN CAMINO
                  </p>
                  <p className="text-2xl font-extrabold text-gray-900 leading-tight">Estimated Delivery</p>
                  <p className="text-base text-gray-500 mt-0.5">Today, 4:00 PM</p>
                </div>

                {/* Smart Notifications */}
                <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-gray-900">Smart Notifications</p>
                      <span className="flex items-center gap-1 bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                          <path d="M4 0L5 3H8L5.5 4.5L6.5 7.5L4 6L1.5 7.5L2.5 4.5L0 3H3L4 0Z" />
                        </svg>
                        AI POWERED
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">Get real-time intelligent updates on your delivery</p>
                  </div>
                  {/* Toggle */}
                  <button
                    onClick={() => setNotifications((p) => !p)}
                    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ml-4 ${notifications ? "bg-blue-600" : "bg-gray-300"}`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${notifications ? "left-5" : "left-0.5"}`}
                    />
                  </button>
                </div>
              </div>

              {/* Right — Steps + Parcel */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Progress steps */}
                <div className="flex items-center gap-0">
                  {STEPS.map((step, i) => (
                    <div key={step.label} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center ${
                            step.done
                              ? "bg-blue-600"
                              : step.active
                              ? "bg-blue-600"
                              : "bg-gray-100"
                          }`}
                        >
                          {step.done && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {step.active && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <rect x="1" y="5" width="9" height="6" rx="1.2" stroke="white" strokeWidth="1.3" />
                              <path d="M10 7L12 7L13 9.5V11H10V7Z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
                              <circle cx="3.5" cy="12" r="1.2" stroke="white" strokeWidth="1" />
                              <circle cx="10.5" cy="12" r="1.2" stroke="white" strokeWidth="1" />
                            </svg>
                          )}
                          {!step.done && !step.active && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2 5L7 1L12 5V12H9V9H5V12H2V5Z" stroke="#D1D5DB" strokeWidth="1.3" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-[10px] font-semibold text-center whitespace-nowrap ${
                            step.active ? "text-blue-600" : step.done ? "text-gray-600" : "text-gray-300"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={`h-0.5 flex-1 mx-1 mb-4 ${step.done ? "bg-blue-600" : "bg-gray-200"}`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Parcel summary */}
                <button className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors text-left w-full">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 5L8 1.5L14 5V11L8 14.5L2 11V5Z" stroke="#2563EB" strokeWidth="1.3" strokeLinejoin="round" />
                      <path d="M2 5L8 8.5M8 8.5L14 5M8 8.5V14.5" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Parcel Summary</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">2y Mechanical Keyboard (V3)</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-400 shrink-0">
                    <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
