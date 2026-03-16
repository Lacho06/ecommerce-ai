"use client";

const RECOMMENDED = [
  { name: "Auriculares ANC Pro", price: "$199.00", bg: "bg-gray-900" },
  { name: "Mouse Ergonómico S", price: "$45.00", bg: "bg-teal-800" },
  { name: "Smart HullVoice", price: "$120.00", bg: "bg-gray-100" },
];

const ORDERS = [
  {
    id: "#ORD-55421",
    date: "Realizado el 12 de Octubre, 2023",
    desc: "Teclado Mecánico RGB + Mouse Pad XL",
    status: "ENTREGADO",
    statusColor: "bg-green-100 text-green-700",
    amount: "$135.50",
    action: "Detalles",
    actionStyle: "border border-gray-200 text-gray-700 hover:bg-gray-50",
    icon: "box",
  },
  {
    id: "#ORD-55489",
    date: "Realizado el 20 de Octubre, 2023",
    desc: "Soporte Monitor Dual Articulado",
    status: "EN CAMINO",
    statusColor: "bg-blue-100 text-blue-600",
    amount: "$89.00",
    action: "Rastrear",
    actionStyle: "border border-blue-200 text-blue-600 hover:bg-blue-50",
    icon: "truck",
  },
];

const NAV_ITEMS = [
  { label: "Datos Personales", icon: "user", active: true },
  { label: "Mis Direcciones", icon: "pin" },
  { label: "Métodos de Pago", icon: "wallet" },
  { label: "Seguridad", icon: "shield" },
];

function NavIcon({ type }: { type: string }) {
  if (type === "user") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 14C2 11.24 4.69 9 8 9C11.31 9 14 11.24 14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
  if (type === "pin") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C5.52 1.5 3.5 3.52 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.52 10.48 1.5 8 1.5Z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
  if (type === "wallet") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="4" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 7H14.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11.5" cy="10" r="1.2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
  if (type === "shield") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L14 4V8C14 11.5 11.3 14.5 8 15.5C4.7 14.5 2 11.5 2 8V4L8 1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return null;
}

function OrderIcon({ type }: { type: string }) {
  if (type === "box") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 6L10 2L18 6V14L10 18L2 14V6Z" stroke="#6B7280" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M2 6L10 10M10 10L18 6M10 10V18" stroke="#6B7280" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="7" width="15" height="9" rx="2" stroke="#6B7280" strokeWidth="1.3" />
      <path d="M16 10H17.5C18.33 10 19 10.67 19 11.5V13.5C19 14.33 18.33 15 17.5 15H16" stroke="#6B7280" strokeWidth="1.3" />
      <path d="M1 11H16" stroke="#6B7280" strokeWidth="1.3" />
      <circle cx="5" cy="18" r="1.5" stroke="#6B7280" strokeWidth="1.3" />
      <circle cx="12" cy="18" r="1.5" stroke="#6B7280" strokeWidth="1.3" />
      <path d="M4 7L6 3H11L13 7" stroke="#6B7280" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
            <path d="M4 18C4 18 8 4 10 4C12 4 12 12 14 12C16 12 16 6 18 6C20 6 20 18 22 18" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 18C10 18 14 8 16 8C18 8 18 14 20 14C22 14 22 18 24 18" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-bold text-gray-900 text-base">SmartStore</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-gray-800">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button className="relative text-gray-500 hover:text-gray-800">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1C6.24 1 4 3.24 4 6V10L2 12V13H16V12L14 10V6C14 3.24 11.76 1 9 1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M7 13C7 14.1 7.9 15 9 15C10.1 15 11 14.1 11 13" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
          <div className="w-9 h-9 rounded-full bg-orange-200 overflow-hidden">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#FDBA74" />
              <circle cx="18" cy="14" r="6" fill="#FB923C" />
              <path d="M6 32C6 26.48 11.37 22 18 22C24.63 22 30 26.48 30 32" fill="#FED7AA" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex gap-6 px-8 py-8 max-w-6xl mx-auto w-full">

        {/* Left sidebar */}
        <div className="w-72 flex flex-col gap-4 shrink-0">

          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center gap-2 shadow-sm">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="23" r="10" fill="#FB923C" />
                  <rect x="16" y="36" width="28" height="16" rx="4" fill="#F97316" />
                </svg>
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <h2 className="font-bold text-gray-900 text-lg mt-1">Alex García</h2>
            <p className="text-sm text-gray-400">alex.garcia@email.com</p>
            <span className="flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mt-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5.5" stroke="#2563EB" strokeWidth="1" />
                <path d="M3.5 6L5 7.5L8.5 4" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Miembro Premium
            </span>
          </div>

          {/* Loyalty card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="font-bold text-gray-900 text-sm">Nivel de Lealtad</p>
              <span className="text-sm font-bold text-blue-600">Oro</span>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>Progreso a Diamante</span>
                <span className="font-semibold text-gray-600">1,250 / 1,500 pts</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: "83%" }} />
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Te faltan 250 puntos para desbloquear envío gratuito en todo.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[{ label: "Pedidos", value: "24", icon: "bag" }, { label: "Cupones", value: "5", icon: "ticket" }].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 flex flex-col items-center gap-1">
                  {s.icon === "bag" ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="3" y="7" width="14" height="11" rx="2" stroke="#2563EB" strokeWidth="1.3" />
                      <path d="M7 7V6C7 4.34 8.34 3 10 3C11.66 3 13 4.34 13 6V7" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="6" width="16" height="8" rx="2" stroke="#2563EB" strokeWidth="1.3" />
                      <path d="M7 6V14M13 6V14" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="2 2" />
                    </svg>
                  )}
                  <span className="font-bold text-gray-900 text-sm">{s.value}</span>
                  <span className="text-xs text-gray-400">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nav menu */}
          <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${
                  item.active ? "text-blue-600 bg-blue-50 font-semibold" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className={item.active ? "text-blue-600" : "text-gray-400"}>
                  <NavIcon type={item.icon} />
                </span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 flex flex-col gap-5 min-w-0">

          {/* Preferencias de IA */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L9.5 5.5H14.5L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L1.5 5.5H6.5L8 1Z" fill="#2563EB" />
                </svg>
                Preferencias de IA
              </h3>
              <a href="#" className="text-sm text-blue-600 font-medium hover:underline">Configurar Algoritmo</a>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm text-gray-500 mb-4">
                Basado en tus compras de{" "}
                <a href="#" className="text-blue-600 font-medium">Tecnología</a> y{" "}
                <a href="#" className="text-blue-600 font-medium">Hogar</a>, te recomendamos:
              </p>
              <div className="grid grid-cols-3 gap-3">
                {RECOMMENDED.map((p) => (
                  <div key={p.name} className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className={`${p.bg} h-32 flex items-center justify-center`}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.3">
                        <rect x="6" y="10" width="28" height="20" rx="4" stroke="white" strokeWidth="2" />
                        <circle cx="20" cy="20" r="6" stroke="white" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                      <p className="text-sm font-bold text-blue-600 mt-0.5">{p.price}</p>
                      <button className="w-full mt-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold py-1.5 rounded-lg transition-colors">
                        Ver más
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pedidos Recientes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-base">Pedidos Recientes</h3>
              <a href="#" className="text-sm text-blue-600 font-medium hover:underline">Ver Historial Completo</a>
            </div>
            <div className="flex flex-col gap-3">
              {ORDERS.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3.5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                    <OrderIcon type={order.icon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{order.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{order.desc}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${order.statusColor}`}>
                      {order.status}
                    </span>
                    <span className="font-bold text-gray-900 text-sm">{order.amount}</span>
                    <button className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${order.actionStyle}`}>
                      {order.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direcciones + Pagos */}
          <div className="grid grid-cols-2 gap-4">
            {/* Direcciones */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-base">Direcciones</h3>
                <a href="#" className="text-sm text-blue-600 font-medium hover:underline">Nueva</a>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1C5.52 1 3.5 3.02 3.5 5.5C3.5 9 8 14 8 14C8 14 12.5 9 12.5 5.5C12.5 3.02 10.48 1 8 1Z" stroke="#6B7280" strokeWidth="1.3" />
                      <circle cx="8" cy="5.5" r="1.5" stroke="#6B7280" strokeWidth="1.3" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-900">Hogar (Casa Blanca)</p>
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">PRINCIPAL</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Av. Reforma 1234, Depto 5B<br />Ciudad de México, CP 01000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagos Guardados */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-base">Pagos Guardados</h3>
                <a href="#" className="text-sm text-blue-600 font-medium hover:underline">Gestionar</a>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md shrink-0">
                    VISA
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">•••• 4242</p>
                    <p className="text-xs text-gray-400">Expira 09/25</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3L10 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
