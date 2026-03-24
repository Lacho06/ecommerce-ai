"use client";

import Badge from "@/components/ui/badge/Badge";
import { HorizontaLDots } from "@/icons";
import { useState } from "react";
import {
  ShoppingBasket,
  ClipboardList,
  Brain,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Download,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const STATS = [
  {
    label: "Total Orders Today",
    value: "1,284",
    change: "+12.5%",
    positive: true,
    icon: <ShoppingBasket className="size-5 text-brand-500" />,
    iconBg: "bg-brand-50 dark:bg-brand-500/10",
  },
  {
    label: "Pending Returns",
    value: "42",
    change: "-2.4%",
    positive: false,
    icon: <ClipboardList className="size-5 text-warning-500" />,
    iconBg: "bg-warning-50 dark:bg-warning-500/10",
  },
  {
    label: "AI Insight Flagged",
    value: "15",
    change: "+5%",
    positive: true,
    icon: <Brain className="size-5 text-purple-500" />,
    iconBg: "bg-purple-50 dark:bg-purple-500/10",
  },
];

type OrderStatus = "Processing" | "Shipped" | "Delivered";
type AIInsight = "Likely to return" | "High priority" | "VIP customer" | null;

const ORDERS: {
  id: string;
  customer: string;
  email: string;
  avatarColor: string;
  date: string;
  status: OrderStatus;
  total: string;
  aiInsight: AIInsight;
}[] = [
  {
    id: "#ORD-8921",
    customer: "Sarah Wilson",
    email: "sarah@gmail.com",
    avatarColor: "bg-orange-200",
    date: "Oct 12, 2023",
    status: "Processing",
    total: "$124.50",
    aiInsight: "Likely to return",
  },
  {
    id: "#ORD-8922",
    customer: "Marcus Thorne",
    email: "m.thorne@outlook.com",
    avatarColor: "bg-pink-200",
    date: "Oct 12, 2023",
    status: "Shipped",
    total: "$452.12",
    aiInsight: "High priority",
  },
  {
    id: "#ORD-8918",
    customer: "Elena Rossi",
    email: "elena.r@cloud.it",
    avatarColor: "bg-orange-300",
    date: "Oct 11, 2023",
    status: "Delivered",
    total: "$89.99",
    aiInsight: null,
  },
  {
    id: "#ORD-8915",
    customer: "Thomas Shelly",
    email: "orders@peaky.biz",
    avatarColor: "bg-gray-500",
    date: "Oct 11, 2023",
    status: "Delivered",
    total: "$1,120.00",
    aiInsight: "VIP customer",
  },
];

const STATUS_CONFIG: Record<
  OrderStatus,
  { color: "warning" | "info" | "success" }
> = {
  Processing: { color: "warning" },
  Shipped: { color: "info" },
  Delivered: { color: "success" },
};

const AI_INSIGHT_CONFIG: Record<
  Exclude<AIInsight, null>,
  { bg: string; text: string }
> = {
  "Likely to return": {
    bg: "bg-red-50 dark:bg-red-500/10",
    text: "text-red-500",
  },
  "High priority": {
    bg: "bg-purple-50 dark:bg-purple-500/10",
    text: "text-purple-500",
  },
  "VIP customer": {
    bg: "bg-green-50 dark:bg-green-500/10",
    text: "text-green-500",
  },
};

const TABS = ["All Orders", "Processing", "Shipped", "Delivered"] as const;
type Tab = (typeof TABS)[number];

const TOTAL = 1284;
const PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(TOTAL / PER_PAGE);

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All Orders");
  const [page, setPage] = useState(1);

  const filtered =
    activeTab === "All Orders"
      ? ORDERS
      : ORDERS.filter((o) => o.status === activeTab);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            Orders
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track, manage and analyze customer orders in real time.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-xl ${s.iconBg}`}
              >
                {s.icon}
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  s.positive ? "text-success-600" : "text-error-500"
                }`}
              >
                {s.positive ? (
                  <TrendingUp className="size-3.5" />
                ) : (
                  <TrendingDown className="size-3.5" />
                )}
                {s.change}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {s.label}
            </p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white/90">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          {/* Tabs */}
          <div className="flex items-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setPage(1);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab
                    ? "bg-brand-500 text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <SlidersHorizontal className="size-4" />
              More Filters
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Download className="size-4" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {[
                  "ORDER ID",
                  "CUSTOMER",
                  "DATE",
                  "STATUS",
                  "TOTAL",
                  "AI INSIGHT",
                  "ACTION",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-left text-xs font-semibold tracking-wider ${
                      h === "AI INSIGHT"
                        ? "text-brand-500"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {h === "AI INSIGHT" ? (
                      <span className="flex items-center gap-1">
                        {h}
                        <Sparkles className="size-3.5 text-brand-400" />
                      </span>
                    ) : (
                      h
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((o) => {
                const statusCfg = STATUS_CONFIG[o.status];
                const aiCfg = o.aiInsight
                  ? AI_INSIGHT_CONFIG[o.aiInsight]
                  : null;

                return (
                  <tr
                    key={o.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Order ID */}
                    <td className="px-5 py-4 text-sm font-bold text-gray-800 dark:text-white/90">
                      {o.id}
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-9 h-9 rounded-full ${o.avatarColor} shrink-0`}
                        >
                          <span className="text-xs font-semibold text-white">
                            {o.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                            {o.customer}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {o.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {o.date}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <Badge color={statusCfg.color} size="sm">
                        {o.status}
                      </Badge>
                    </td>

                    {/* Total */}
                    <td className="px-5 py-4 text-sm font-bold text-gray-800 dark:text-white/90">
                      {o.total}
                    </td>

                    {/* AI Insight */}
                    <td className="px-5 py-4">
                      {aiCfg ? (
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${aiCfg.bg} ${aiCfg.text}`}
                        >
                          {o.aiInsight}
                        </span>
                      ) : (
                        <span className="text-gray-300 dark:text-gray-600">
                          —
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4">
                      <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                        <HorizontaLDots className="size-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {(page - 1) * PER_PAGE + 1} to{" "}
            {Math.min(page * PER_PAGE, TOTAL)} of {TOTAL.toLocaleString()} orders
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="size-4" />
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  page === n
                    ? "bg-brand-500 text-white"
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={page === TOTAL_PAGES}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
