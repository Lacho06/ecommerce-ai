"use client";

const ORDER_ITEMS = [
  {
    name: "Teclado Mecánico RGB",
    variant: "Switch Brown • Spanish Layout",
    price: "$89.99",
    qty: 1,
    bg: "bg-gray-900",
    iconColor: "#6366F1",
  },
  {
    name: "Mouse Pad XL",
    variant: "900x400mm • Water Resistant",
    price: "$24.50",
    qty: 1,
    bg: "bg-gray-800",
    iconColor: "#9CA3AF",
  },
];

const RECOMMENDATIONS = [
  {
    name: "Wireless Ergo Mouse",
    desc: "Pairs with your XL pad",
    price: "$45.00",
    bg: "bg-gray-100",
  },
  {
    name: "Keyboard Cleaning Kit",
    desc: "Maintain your RGB keys",
    price: "$12.99",
    bg: "bg-teal-800",
  },
];

export default function OrderDetailPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="border-b border-gray-100 px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="5" width="10" height="9" rx="1.5" stroke="white" strokeWidth="1.3" />
              <path d="M5.5 5V4C5.5 2.9 6.4 2 7.5 2H8.5C9.6 2 10.5 2.9 10.5 4V5" stroke="white" strokeWidth="1.3" />
              <path d="M6 9L7.5 10.5L10 7.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-base">AI Shop</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-gray-700 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 1.5C7.24 1.5 5 3.74 5 6.5V11L3 13V14H17V13L15 11V6.5C15 3.74 12.76 1.5 10 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M8 14C8 15.1 8.9 16 10 16C11.1 16 12 15.1 12 14" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="7" r="3.5" stroke="white" strokeWidth="1.4" />
              <path d="M2 17C2 13.69 5.13 11 9 11C12.87 11 16 13.69 16 17" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-8 py-8 max-w-5xl mx-auto w-full">
        {/* Back + Title */}
        <div className="mb-6">
          <a href="/profile" className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 mb-3 w-fit transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            My Orders
          </a>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Order #ORD-55421</h1>
              <p className="text-sm text-gray-400 mt-1">
                Placed on Oct 24, 2023 &bull; Delivered on Oct 27, 2023
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1V9M7 9L4 6M7 9L10 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 10V12C1 12.55 1.45 13 2 13H12C12.55 13 13 12.55 13 12V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Download Invoice
              </button>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H9M9 7L6 4M9 7L6 10" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11 2H12C12.55 2 13 2.45 13 3V11C13 11.55 12.55 12 12 12H11" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Reorder
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 items-start">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {/* Status */}
            <div className="border border-green-200 bg-green-50 rounded-2xl px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="8" stroke="#16A34A" strokeWidth="1.4" />
                  <path d="M5.5 9L7.5 11L12.5 6.5" stroke="#16A34A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Delivered / Entregado
              </div>
              <span className="text-xs font-bold text-green-600 tracking-widest uppercase">Status</span>
            </div>

            {/* Items */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="font-bold text-gray-900">Items Purchased</p>
              </div>
              <div className="divide-y divide-gray-50">
                {ORDER_ITEMS.map((item) => (
                  <div key={item.name} className="flex items-center gap-4 px-5 py-4">
                    <div className={`w-16 h-16 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" opacity="0.5">
                        <rect x="4" y="8" width="20" height="12" rx="3" stroke={item.iconColor} strokeWidth="1.5" />
                        <circle cx="14" cy="14" r="4" stroke={item.iconColor} strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.variant}</p>
                      <p className="text-sm font-bold text-blue-600 mt-1">{item.price}</p>
                    </div>
                    <span className="text-sm text-gray-400 shrink-0">Qty: {item.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="border border-blue-100 bg-blue-50/40 rounded-2xl p-5">
              <p className="font-bold text-blue-600 flex items-center gap-1.5 mb-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L9.5 5.5H14.5L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L1.5 5.5H6.5L8 1Z" fill="#2563EB" />
                </svg>
                AI Recommendations
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Based on your tech setup purchases, our AI suggests these perfect additions:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {RECOMMENDATIONS.map((r) => (
                  <div key={r.name} className="bg-white border border-gray-100 rounded-xl flex items-center gap-3 p-3 hover:shadow-sm transition-shadow cursor-pointer">
                    <div className={`w-12 h-12 ${r.bg} rounded-lg flex items-center justify-center shrink-0`}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" opacity="0.4">
                        <rect x="3" y="6" width="16" height="10" rx="2.5" stroke="white" strokeWidth="1.5" />
                        <circle cx="11" cy="11" r="3" stroke="white" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{r.name}</p>
                      <p className="text-xs text-gray-400 truncate">{r.desc}</p>
                      <p className="text-sm font-bold text-blue-600 mt-0.5">{r.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="w-full md:w-[300px] flex flex-col gap-4 shrink-0">
            {/* Payment Summary */}
            <div className="border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col gap-3">
              <p className="font-bold text-gray-900">Payment Summary</p>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-gray-800 font-medium">$114.49</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-500 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax (IVA 16%)</span>
                  <span className="text-gray-800 font-medium">$18.31</span>
                </div>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-extrabold text-blue-600 text-lg">$132.80</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="#9CA3AF" strokeWidth="1.2" />
                  <path d="M1 6H13" stroke="#9CA3AF" strokeWidth="1.2" />
                </svg>
                <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                  Paid with Mastercard •••• 4242
                </span>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
              <p className="font-bold text-gray-900">Delivery Details</p>
              <div>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Shipping Address</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Juan Pérez<br />
                  Av. de la Reforma 222, Torre A, Piso 10<br />
                  Juárez, Cuauhtémoc<br />
                  06600 Ciudad de México, CDMX
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Location Map</p>
                <div className="w-full h-28 bg-amber-50 rounded-xl overflow-hidden relative">
                  {/* Map placeholder */}
                  <svg width="100%" height="100%" viewBox="0 0 260 112" fill="none" preserveAspectRatio="xMidYMid slice">
                    <rect width="260" height="112" fill="#FEF3C7" />
                    {/* Streets */}
                    {[0,20,40,60,80,100].map((y) => (
                      <line key={`h${y}`} x1="0" y1={y} x2="260" y2={y} stroke="#FDE68A" strokeWidth="8" />
                    ))}
                    {[0,30,60,90,120,150,180,210,240].map((x) => (
                      <line key={`v${x}`} x1={x} y1="0" x2={x} y2="112" stroke="#FDE68A" strokeWidth="8" />
                    ))}
                    {/* River */}
                    <path d="M0 70 Q65 55 130 70 Q195 85 260 70" stroke="#93C5FD" strokeWidth="12" fill="none" opacity="0.6" />
                    {/* Pin */}
                    <circle cx="130" cy="56" r="8" fill="#2563EB" />
                    <circle cx="130" cy="56" r="3.5" fill="white" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Need help */}
            <div className="bg-gray-900 rounded-2xl p-5 flex flex-col gap-3">
              <p className="font-bold text-white text-base">Need help?</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Our AI agent is available 24/7 to help you with this order.
              </p>
              <button className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold text-sm py-2.5 rounded-xl transition-colors">
                Chat with Assistant
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="4" width="10" height="8" rx="1.5" stroke="white" strokeWidth="1.2" />
              <path d="M4.5 4V3C4.5 1.9 5.4 1 6.5 1H7.5C8.6 1 9.5 1.9 9.5 3V4" stroke="white" strokeWidth="1.2" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-800">AI Shop</span>
        </div>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Help Center"].map((item) => (
            <a key={item} href="#" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">{item}</a>
          ))}
        </div>
        <p className="text-xs text-gray-400">© 2023 AI-Powered E-commerce. All rights reserved.</p>
      </footer>
    </div>
  );
}
