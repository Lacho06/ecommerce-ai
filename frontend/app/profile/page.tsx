"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import NavIcon from "../icons/NavIcon";
import OrderIcon from "../icons/OrderIcon";

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
  { id: 1, label: "Datos Personales", icon: "user" },
  { id: 2, label: "Mis Direcciones", icon: "pin" },
  { id: 3, label: "Métodos de Pago", icon: "wallet" },
  { id: 4, label: "Seguridad", icon: "shield" },
];

const ADDRESSES = [
  {
    id: 1,
    name: "Hogar (Casa Blanca)",
    principal: true,
    icon: "home",
    lines: ["Av. Reforma 1234, Depto 5B", "Colonia Juárez, Cuauhtémoc", "Ciudad de México, CP 06600"],
  },
  {
    id: 2,
    name: "Oficina Tech Hub",
    principal: false,
    icon: "building",
    lines: ["Paseo de la Castellana 89, Piso 12", "Business District North", "Madrid, CP 28046"],
  },
  {
    id: 3,
    name: "Casa de Verano",
    principal: false,
    icon: "pin",
    lines: ["Calle del Mar 45, Interior 2", "Fraccionamiento Las Brisas", "Acapulco, Guerrero, CP 39867"],
  },
];


export default function ProfilePage() {
  const router = useRouter();
  const { getMe } = useAuth();
  const [user, setUser] = useState<{ id: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  useEffect(() => {
    getMe().then((u) => {
      if (!u) { router.push("/login"); return; }
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

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
            <h2 className="font-bold text-gray-900 text-lg mt-1">{user?.name}</h2>
            <p className="text-sm text-gray-400">{user?.email}</p>
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
                key={item.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${
                  activeTab === item.id ? "text-blue-600 bg-blue-50 font-semibold" : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => handleTabClick(item.id)}
              >
                <span className={activeTab === item.id ? "text-blue-600" : "text-gray-400"}>
                  <NavIcon type={item.icon} />
                </span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right content */}

        {
          activeTab === 1 && (
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
          )
        }

        {activeTab === 2 && (
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-xl">Mis Direcciones</h3>
                <p className="text-sm text-gray-400 mt-0.5">Gestiona tus lugares de entrega guardados</p>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Agregar Nueva Dirección
              </button>
            </div>

            {/* Address cards */}
            <div className="flex flex-col gap-3">
              {ADDRESSES.map((addr) => (
                <div
                  key={addr.id}
                  className={`bg-white rounded-2xl shadow-sm p-5 flex gap-4 border ${addr.principal ? "border-blue-200" : "border-gray-100"}`}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    {addr.icon === "home" && (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M2 8L9 2L16 8V16H11V11H7V16H2V8Z" stroke="#2563EB" strokeWidth="1.4" strokeLinejoin="round" />
                      </svg>
                    )}
                    {addr.icon === "building" && (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="14" height="14" rx="2" stroke="#2563EB" strokeWidth="1.4" />
                        <path d="M6 6H8M10 6H12M6 9H8M10 9H12M6 12H8M10 12H12" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    )}
                    {addr.icon === "pin" && (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 1.5C6.52 1.5 4.5 3.52 4.5 6C4.5 9.5 9 16.5 9 16.5C9 16.5 13.5 9.5 13.5 6C13.5 3.52 11.48 1.5 9 1.5Z" stroke="#2563EB" strokeWidth="1.4" />
                        <circle cx="9" cy="6" r="1.5" stroke="#2563EB" strokeWidth="1.4" />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="text-sm font-semibold text-gray-900">{addr.name}</p>
                      {addr.principal && (
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full tracking-wide">
                          PRINCIPAL
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 leading-relaxed flex flex-col gap-0.5">
                      {addr.lines.map((line, i) => <span key={i}>{line}</span>)}
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors font-medium">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M9 1.5L11.5 4L4.5 11H2V8.5L9 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                        </svg>
                        Editar
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors font-medium">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 3.5H11M4.5 3.5V2H8.5V3.5M5.5 6V10M7.5 6V10M3 3.5L3.5 11H9.5L10 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Eliminar
                      </button>
                      {!addr.principal && (
                        <button className="ml-auto text-xs text-blue-600 hover:underline font-medium">
                          Marcar como principal
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="flex-1 flex flex-col gap-6 min-w-0">

            {/* Asistente de Pagos Inteligente */}
            <div>
              <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1L10.5 6.5H16L11.5 9.5L13 15L9 12L5 15L6.5 9.5L2 6.5H7.5L9 1Z" fill="#2563EB" />
                </svg>
                Asistente de Pagos Inteligente
              </h3>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Insight de Recompensas</p>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
                    Para tu próxima compra de{" "}
                    <a href="#" className="text-blue-600 font-medium">Electrónica</a>
                    , te recomendamos usar tu tarjeta{" "}
                    <span className="font-medium text-gray-700">Visa ••••4242</span>.
                    Actualmente ofrece{" "}
                    <span className="text-green-600 font-semibold">3% de cashback</span>
                    {" "}en esta categoría.
                  </p>
                </div>
                <button className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                  Optimizar Pagos
                </button>
              </div>
            </div>

            {/* Mis Métodos de Pago */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-base">Mis Métodos de Pago</h3>
                <button className="flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:underline">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="#2563EB" strokeWidth="1.3" />
                    <path d="M8 5V11M5 8H11" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  Nuevo Método
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* Visa */}
                <div className="bg-white border border-blue-200 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-md tracking-wider">VISA</div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Visa Signature</p>
                        <p className="text-xs text-gray-400 tracking-widest">•••• •••• •••• 4242</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">PRINCIPAL</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Expira</p>
                      <p className="text-sm font-semibold text-gray-700">09/25</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M9 1.5L11.5 4L4.5 11H2V8.5L9 1.5Z" stroke="#6B7280" strokeWidth="1.3" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button className="w-8 h-8 bg-gray-50 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors group">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 3.5H11M4.5 3.5V2H8.5V3.5M5.5 6V10M7.5 6V10M3 3.5L3.5 11H9.5L10 3.5" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-red-500" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mastercard */}
                <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex shrink-0">
                      <div className="w-6 h-6 rounded-full bg-red-500 opacity-90" />
                      <div className="w-6 h-6 rounded-full bg-orange-400 opacity-90 -ml-3" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Mastercard Gold</p>
                      <p className="text-xs text-gray-400 tracking-widest">•••• •••• •••• 8812</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Expira</p>
                      <p className="text-sm font-semibold text-gray-700">12/26</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M9 1.5L11.5 4L4.5 11H2V8.5L9 1.5Z" stroke="#6B7280" strokeWidth="1.3" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button className="w-8 h-8 bg-gray-50 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors group">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 3.5H11M4.5 3.5V2H8.5V3.5M5.5 6V10M7.5 6V10M3 3.5L3.5 11H9.5L10 3.5" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-red-500" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Billeteras Digitales */}
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-3">Billeteras Digitales</h3>
              <div className="flex flex-col gap-2">
                {/* Apple Pay */}
                <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shrink-0">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="white">
                      <path d="M14.98 11.44c-.02-2.17 1.78-3.22 1.86-3.27-1.01-1.49-2.59-1.69-3.15-1.71-1.34-.14-2.62.79-3.3.79-.68 0-1.72-.77-2.84-.75-1.46.02-2.81.85-3.56 2.15-1.52 2.64-.39 6.54 1.09 8.68.73 1.04 1.59 2.21 2.72 2.17 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.69.71 2.84.69 1.18-.02 1.92-1.06 2.64-2.11.84-1.21 1.18-2.39 1.2-2.45-.03-.01-2.32-.89-2.34-3.48zM12.82 4.52c.61-.74 1.02-1.76.91-2.78-.88.04-1.96.59-2.59 1.32-.56.65-1.06 1.69-.93 2.69.98.07 1.99-.49 2.61-1.23z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Apple Pay</p>
                    <p className="text-xs text-gray-400">Conectado</p>
                  </div>
                  <button className="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors">
                    Desvincular
                  </button>
                </div>

                {/* Google Pay */}
                <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                      <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Google Pay</p>
                    <p className="text-xs text-gray-400">No configurado</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline font-medium transition-colors">
                    Configurar
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 4 && (
          <div className="flex-1 flex flex-col gap-5 min-w-0">

            {/* Header */}
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Seguridad de la Cuenta</h2>
              <p className="text-sm text-gray-400 mt-1">Gestiona la protección de tu cuenta y controla el acceso a tus datos personales.</p>
            </div>

            {/* IA Recomendación */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl overflow-hidden flex">
              <div className="w-36 bg-blue-100/60 flex items-center justify-center shrink-0 py-6">
                <div className="relative">
                  <svg width="56" height="64" viewBox="0 0 56 64" fill="none">
                    <path d="M28 2L52 14V34C52 48 41.6 60.4 28 63C14.4 60.4 4 48 4 34V14L28 2Z" fill="#2563EB" />
                    <path d="M18 32L24 38L38 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-1">Recomendación de IA</p>
                <p className="text-lg font-bold text-gray-900 mb-2">Salud de Seguridad: Excelente</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Analizado por IA: Tu cuenta cumple con los estándares más altos de protección. Se recomienda activar la autenticación biométrica en dispositivos compatibles.
                </p>
              </div>
            </div>

            {/* Contraseña + 2FA */}
            <div className="grid grid-cols-2 gap-4">
              {/* Contraseña */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <circle cx="3" cy="7" r="2" fill="#6B7280" />
                      <circle cx="9" cy="7" r="2" fill="#6B7280" />
                      <circle cx="15" cy="7" r="2" fill="#6B7280" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Contraseña</p>
                    <p className="text-xs text-gray-400">Último cambio: Hace 3 meses</p>
                  </div>
                </div>
                <button className="w-full border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  Cambiar Contraseña
                </button>
              </div>

              {/* 2FA */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle cx="5" cy="9" r="3" stroke="#6B7280" strokeWidth="1.4" />
                        <path d="M5 6V3M5 12V15M8 9H15" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round" />
                        <circle cx="15" cy="9" r="1.5" fill="#6B7280" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">Autenticación (2FA)</p>
                        <span className="text-[10px] font-bold bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded-full">RECOMENDADO</span>
                      </div>
                      <p className="text-xs text-gray-400">Doble capa de seguridad activa</p>
                    </div>
                  </div>
                  {/* Toggle on */}
                  <div className="w-11 h-6 bg-blue-600 rounded-full flex items-center px-1 cursor-pointer shrink-0">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto shadow" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Tu cuenta está protegida mediante SMS y Autenticador de Google.
                </p>
              </div>
            </div>

            {/* Sesiones Activas */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-base">Sesiones Activas</h3>
                <button className="text-sm text-blue-600 font-medium hover:underline">Cerrar todas las sesiones</button>
              </div>
              <div className="flex flex-col divide-y divide-gray-50">
                {[
                  { device: "MacBook Pro 16\"", icon: "laptop", location: "Madrid, España", time: "En línea ahora" },
                  { device: "iPhone 15 Pro",    icon: "phone",  location: "Barcelona, España", time: "Hace 2 horas" },
                ].map((s) => (
                  <div key={s.device} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                      {s.icon === "laptop" ? (
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                          <rect x="2" y="1" width="16" height="10" rx="2" stroke="#6B7280" strokeWidth="1.4" />
                          <path d="M1 13H19" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round" />
                          <path d="M7 13L6 15H14L13 13" stroke="#6B7280" strokeWidth="1.4" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                          <rect x="1" y="1" width="12" height="18" rx="3" stroke="#6B7280" strokeWidth="1.4" />
                          <circle cx="7" cy="16" r="1" fill="#6B7280" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{s.device}</p>
                      <p className="text-xs text-gray-400">{s.location} · {s.time}</p>
                    </div>
                    <button className="text-xs font-semibold text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
                      Cerrar sesión
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacidad y Datos */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-5">
              <h3 className="font-bold text-gray-900 text-base">Privacidad y Datos</h3>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Compartir datos de uso", desc: "Ayúdanos a mejorar los servicios compartiendo analíticas anónimas.", on: true },
                  { label: "Personalización de anuncios", desc: "Recibe anuncios basados en tus intereses y actividad.", on: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <div className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer shrink-0 transition-colors ${item.on ? "bg-blue-600" : "bg-gray-200"}`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow transition-all ${item.on ? "ml-auto" : "ml-0"}`} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Descargar tu información</p>
                  <p className="text-xs text-gray-400 mt-0.5">Obtén una copia de todos tus datos personales guardados.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1V9M7 9L4 6M7 9L10 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 11H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Exportar mis datos
                </button>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 py-2">
              ¿Necesitas ayuda con la seguridad?{" "}
              <a href="#" className="text-blue-600 font-medium hover:underline">Contactar con soporte</a>
            </p>

          </div>
        )}
      </div>
    </div>
  );
}
