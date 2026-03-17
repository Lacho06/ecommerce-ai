"use client";

import Badge from "@/components/ui/badge/Badge";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoltIcon,
  ChatIcon,
  CheckCircleIcon,
  HorizontaLDots,
  PaperPlaneIcon,
  TimeIcon,
} from "@/icons";

const STATS = [
  {
    label: "AI Accuracy Rate",
    value: "94.2%",
    change: "+2.4%",
    changeType: "success" as const,
    icon: <CheckCircleIcon className="size-5 text-brand-500" />,
  },
  {
    label: "Active n8n Workflows",
    value: "12 / 12",
    change: "Stable",
    changeType: "light" as const,
    icon: <BoltIcon className="size-5 text-brand-500" />,
  },
  {
    label: "WhatsApp Msg Volume",
    value: "1,284",
    change: "+15%",
    changeType: "success" as const,
    icon: <ChatIcon className="size-5 text-brand-500" />,
  },
  {
    label: "AI Response Time",
    value: "0.8s",
    change: "-1.2m",
    changeType: "error" as const,
    icon: <TimeIcon className="size-5 text-brand-500" />,
  },
];

const ORDERS = [
  {
    id: "#ORD-4921",
    customer: "John Doe",
    initials: "J",
    color: "bg-emerald-500",
    amount: "$124.50",
    status: "Confirmed",
    statusColor: "success" as const,
  },
  {
    id: "#ORD-4922",
    customer: "Sarah Chen",
    initials: "S",
    color: "bg-green-600",
    amount: "$89.00",
    status: "Shipped Msg Sent",
    statusColor: "info" as const,
  },
  {
    id: "#ORD-4923",
    customer: "Michael Ross",
    initials: "M",
    color: "bg-yellow-600",
    amount: "$240.00",
    status: "Pending Response",
    statusColor: "warning" as const,
  },
  {
    id: "#ORD-4924",
    customer: "Emma Wilson",
    initials: "E",
    color: "bg-red-400",
    amount: "$45.20",
    status: "Confirmed",
    statusColor: "success" as const,
  },
];

const AUTOMATIONS = [
  {
    label: "INVENTORY SYNC",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 6L9 3L15 6V12L9 15L3 12V6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M3 6L9 9M9 9L15 6M9 9V15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "ORDER ALERTS",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 8.5L9 12L16 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M6 5V4C6 2.9 6.9 2 8 2H10C11.1 2 12 2.9 12 4V5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "AI PROCESSING",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="5" y="3" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 7H5M3 11H5M13 7H15M13 11H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 6H10M8 9H10M8 12H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function AIDashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">

      {/* ── Left column ── */}
      <div className="col-span-12 xl:col-span-8 flex flex-col gap-4 md:gap-6">

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-brand-50 rounded-xl dark:bg-brand-500/10">
                  {s.icon}
                </div>
                <Badge color={s.changeType} size="sm">
                  {s.changeType === "success" && <ArrowUpIcon />}
                  {s.changeType === "error" && <ArrowDownIcon />}
                  {s.change}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">
                {s.value}
              </h4>
            </div>
          ))}
        </div>

        {/* Order Management */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-800 dark:text-white/90">
              Order Management
            </h3>
            <a
              href="#"
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              View All Orders
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  {["ORDER ID", "CUSTOMER", "AMOUNT", "WHATSAPP STATUS", "ACTIONS"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {ORDERS.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {o.id}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${o.color}`}
                        >
                          {o.initials}
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {o.customer}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {o.amount}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge color={o.statusColor} size="sm">
                        {o.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                        <HorizontaLDots className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* n8n Automations */}
        <div>
          <h3 className="mb-3 font-semibold text-gray-800 dark:text-white/90">
            n8n Automations
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {AUTOMATIONS.map((a) => (
              <div
                key={a.label}
                className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] flex items-center gap-3"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-brand-50 rounded-xl dark:bg-brand-500/10 text-brand-500 shrink-0">
                  {a.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest">
                    {a.label}
                  </p>
                  <p className="flex items-center gap-1.5 mt-0.5 text-sm font-semibold text-success-600 dark:text-success-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
                    Healthy
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right column: Live Support Feed ── */}
      <div className="col-span-12 xl:col-span-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-gray-800 dark:text-white/90 text-sm">
            Live Support Feed
          </h3>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L9 5H13L10 7.5L11 11.5L8 9L5 11.5L6 7.5L3 5H7L8 1Z" fill="#22C55E" />
          </svg>
        </div>

        {/* WhatsApp session */}
        <div className="flex items-center gap-2.5 px-5 py-3 bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-center w-9 h-9 bg-success-500 rounded-xl shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="M8 1C4.13 1 1 4.13 1 8c0 1.3.35 2.5.96 3.54L1 15l3.55-.94A7 7 0 1 0 8 1Zm3.5 9.27c-.15.41-.86.78-1.21.82-.35.04-.67.18-2.26-.48C6.12 9.82 4.92 7.87 4.82 7.73 4.72 7.6 4 6.58 4 5.53c0-1.05.55-1.57.76-1.79.21-.22.45-.27.6-.27h.43c.13 0 .31-.05.48.35.17.4.57 1.45.62 1.55.05.1.08.22 0 .35-.08.13-.12.21-.23.35-.1.13-.22.29-.32.39-.11.11-.22.23-.1.44.12.21.59.97 1.29 1.6.9.81 1.65 1.06 1.88 1.17.23.1.37.08.5-.07.14-.14.58-.66.73-.89.15-.23.3-.19.51-.11.21.08 1.25.6 1.48.71.23.11.38.17.43.26.06.1.06.5-.09.91Z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800 dark:text-white/90">
              WhatsApp Business
            </p>
            <p className="text-xs font-bold text-success-500 tracking-widest">
              4 LIVE SESSIONS
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 flex flex-col gap-3 px-5 py-4 overflow-y-auto min-h-0">
          {/* Customer message */}
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1.5">
              Customer: Sarah Chen
              <span className="float-right">10:42 AM</span>
            </p>
            <div className="rounded-2xl rounded-tl-sm bg-gray-100 dark:bg-white/[0.06] px-3.5 py-2.5 text-sm text-gray-700 dark:text-gray-300">
              Hi! I haven't received my tracking link for #ORD-4922 yet.
            </div>
          </div>

          {/* AI message */}
          <div>
            <p className="text-xs font-semibold text-brand-500 dark:text-brand-400 text-right mb-1.5">
              AI Assistant{" "}
              <span className="font-normal text-gray-400 dark:text-gray-500">
                10:43 AM
              </span>
            </p>
            <div className="rounded-2xl rounded-tr-sm bg-brand-500 px-3.5 py-2.5 text-sm text-white">
              Hello Sarah! I've checked your order #ORD-4922. It was just picked up by the courier. Here is your tracking link: bit.ly/track-4922
            </div>
            <div className="flex items-center justify-end gap-1 mt-1 text-xs text-gray-400 dark:text-gray-500">
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M1 4L3.5 6.5L7 2M7 4L9.5 6.5L13 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Delivered
            </div>
          </div>

          {/* Customer message 2 */}
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1.5">
              Customer: Michael Ross
              <span className="float-right">10:55 AM</span>
            </p>
            <div className="rounded-2xl rounded-tl-sm bg-gray-100 dark:bg-white/[0.06] px-3.5 py-2.5 text-sm text-gray-700 dark:text-gray-300">
              Can I change my delivery address to 5th Ave?
            </div>
          </div>

          {/* AI handover alert */}
          <div className="flex items-start gap-2 rounded-xl border border-warning-200 bg-warning-50 dark:border-warning-500/20 dark:bg-warning-500/10 px-3.5 py-2.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
              <circle cx="7" cy="7" r="6" stroke="#F59E0B" strokeWidth="1.2" />
              <path d="M7 4V7.5M7 9.5V10" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <p className="text-xs text-warning-600 dark:text-orange-400 font-medium leading-relaxed">
              AI Handover requested: Address change requires human approval.
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-800 shrink-0">
          <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 shrink-0 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.3" />
              <path d="M7 10H13M10 7V13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 bg-transparent outline-none"
          />
          <button className="flex items-center justify-center w-8 h-8 bg-brand-500 hover:bg-brand-600 rounded-lg transition-colors shrink-0">
            <PaperPlaneIcon className="size-4 text-white" />
          </button>
        </div>
      </div>

    </div>
  );
}
