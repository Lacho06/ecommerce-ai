"use client";

import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import {
  AlertIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  BoltIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ArrowRightIcon,
  DownloadIcon,
  PlusIcon,
} from "@/icons";
import Image from "next/image";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

type AIAction =
  | "optimal"
  | "restock"
  | "urgent"
  | "seasonal";

interface Product {
  id: number;
  name: string;
  subtitle: string;
  sku: string;
  image: string;
  category: string;
  location: string;
  stock: number;
  maxStock: number;
  unitCost: string;
  status: StockStatus;
  aiAction: AIAction;
  aiLabel: string;
  aiSub: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Zoom Pegasus Elite",
    subtitle: "Sportswear",
    sku: "SHO-PEG-001",
    image: "/images/product/product-01.jpg",
    category: "Apparel",
    location: "Main HQ (NY)",
    stock: 428,
    maxStock: 500,
    unitCost: "$85.00",
    status: "In Stock",
    aiAction: "optimal",
    aiLabel: "No action needed",
    aiSub: "OPTIMAL LEVEL",
  },
  {
    id: 2,
    name: "Vortex Wireless G3",
    subtitle: "Electronics",
    sku: "AUD-VX-032",
    image: "/images/product/product-02.jpg",
    category: "Electronics",
    location: "West Coast (LA)",
    stock: 42,
    maxStock: 200,
    unitCost: "$199.00",
    status: "Low Stock",
    aiAction: "restock",
    aiLabel: "Predicting out of stock in 3 days",
    aiSub: "RESTOCK NOW",
  },
  {
    id: 3,
    name: "Horizon Minimalist Watch",
    subtitle: "Accessories",
    sku: "WTC-HRZ-991",
    image: "/images/product/product-03.jpg",
    category: "Accessories",
    location: "Europe Central",
    stock: 0,
    maxStock: 150,
    unitCost: "$145.00",
    status: "Out of Stock",
    aiAction: "urgent",
    aiLabel: "Loss of $1,200/day",
    aiSub: "URGENT ORDER",
  },
  {
    id: 4,
    name: "Snap Shot Instant Cam",
    subtitle: "Photography",
    sku: "CAM-SNP-442",
    image: "/images/product/product-04.jpg",
    category: "Electronics",
    location: "West Coast (LA)",
    stock: 184,
    maxStock: 300,
    unitCost: "$99.00",
    status: "In Stock",
    aiAction: "seasonal",
    aiLabel: "Seasonal spike predicted",
    aiSub: "PRE-ORDER +50 UNITS",
  },
];

const TOTAL = 1284;
const PER_PAGE = 10;
const TOTAL_PAGES = 129;

// ── Helpers ────────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  StockStatus,
  { color: "success" | "warning" | "error"; dot: string }
> = {
  "In Stock":     { color: "success", dot: "bg-success-500" },
  "Low Stock":    { color: "warning", dot: "bg-warning-500" },
  "Out of Stock": { color: "error",   dot: "bg-error-500"   },
};

const AI_CONFIG: Record<
  AIAction,
  { bg: string; textPrimary: string; textSub: string; btnBg?: string }
> = {
  optimal: {
    bg: "bg-transparent",
    textPrimary: "text-gray-500 dark:text-gray-400",
    textSub: "text-success-600 dark:text-success-500",
  },
  restock: {
    bg: "bg-brand-500",
    textPrimary: "text-gray-500 dark:text-gray-400 text-xs",
    textSub: "text-white text-[10px] font-bold tracking-wider",
  },
  urgent: {
    bg: "bg-error-500",
    textPrimary: "text-error-500 dark:text-error-400",
    textSub: "text-white text-[10px] font-bold tracking-wider",
  },
  seasonal: {
    bg: "bg-transparent",
    textPrimary: "text-gray-500 dark:text-gray-400 text-xs",
    textSub: "text-brand-500 dark:text-brand-400 text-[10px] font-bold tracking-wider",
  },
};

function StockBar({ stock, max, status }: { stock: number; max: number; status: StockStatus }) {
  const pct = max > 0 ? Math.round((stock / max) * 100) : 0;
  const barColor =
    status === "In Stock"     ? "bg-success-500" :
    status === "Low Stock"    ? "bg-warning-500" :
    "bg-error-500";
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-gray-800 dark:text-white/90">
        {stock}
      </span>
      <div className="flex items-center gap-1.5">
        <div className="w-16 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-[10px] text-gray-400 dark:text-gray-500">{max}</span>
      </div>
    </div>
  );
}

function AIOptimizationCell({ product }: { product: Product }) {
  const cfg = AI_CONFIG[product.aiAction];
  const hasBtn = product.aiAction === "restock" || product.aiAction === "urgent";

  return (
    <div className="flex flex-col gap-1.5 items-start">
      {!hasBtn && (
        <span className={`text-xs ${cfg.textPrimary}`}>{product.aiLabel}</span>
      )}
      {hasBtn && (
        <span className={`text-xs ${cfg.textPrimary}`}>{product.aiLabel}</span>
      )}
      {hasBtn ? (
        <button
          className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider text-white ${cfg.bg} transition-opacity hover:opacity-90`}
        >
          {product.aiSub}
        </button>
      ) : (
        <span className={`text-[10px] font-bold tracking-wider ${cfg.textSub}`}>
          {product.aiSub}
        </span>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function InventoryPage() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            Inventory Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Real-time status of your global product stock and AI insights.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" startIcon={<DownloadIcon className="size-4" />}>
            Export Inventory
          </Button>
          <Button variant="primary" size="sm" startIcon={<PlusIcon className="size-4" />}>
            Update Stock
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "Total SKU Count",
            value: "1,284",
            change: "+2%",
            changeType: "positive",
            icon: <CheckCircleIcon className="size-5 text-brand-500" />,
            iconBg: "bg-blue-50 dark:bg-blue-500/10",
          },
          {
            label: "Low Stock Alerts",
            value: "12 Items",
            change: "Warning",
            changeType: "warning",
            icon: <AlertIcon className="size-5 text-warning-500" />,
            iconBg: "bg-warning-50 dark:bg-warning-500/10",
            valueColor: "text-warning-500",
          },
          {
            label: "Total Inventory Value",
            value: "$452,000",
            change: "+5.4%",
            changeType: "positive",
            icon: (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="4" width="16" height="11" rx="2" stroke="#3B82F6" strokeWidth="1.4"/>
                <path d="M1 7h16" stroke="#3B82F6" strokeWidth="1.4"/>
                <path d="M5 11h4" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            ),
            iconBg: "bg-blue-50 dark:bg-blue-500/10",
          },
          {
            label: "Out of Stock",
            value: "5 Items",
            change: "-1%",
            changeType: "negative",
            icon: (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7.5" stroke="#EF4444" strokeWidth="1.4"/>
                <path d="M9 5v5M9 13v.5" stroke="#EF4444" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            ),
            iconBg: "bg-error-50 dark:bg-error-500/10",
            valueColor: "text-error-500",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${s.iconBg}`}>
                {s.icon}
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  s.changeType === "positive" ? "text-success-600 dark:text-success-500" :
                  s.changeType === "negative" ? "text-error-500" :
                  "text-warning-600 dark:text-warning-500"
                }`}
              >
                {s.changeType === "positive" && <ArrowUpIcon className="size-3" />}
                {s.changeType === "negative" && <ArrowDownIcon className="size-3" />}
                {s.change}
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.valueColor ?? "text-gray-800 dark:text-white/90"}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">

        {/* Filters bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            {["Category: All", "Status: All", "Warehouse: All"].map((f) => (
              <button
                key={f}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {f}
                <ChevronDownIcon className="size-4" />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
            <BoltIcon className="size-3.5 text-brand-400" />
            AI Insights updated 4 minutes ago
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["PRODUCT", "SKU", "CATEGORY", "LOCATION", "STOCK LEVEL", "UNIT COST", "STATUS", "AI OPTIMIZATION"].map(
                  (h) => (
                    <th
                      key={h}
                      className={`px-5 py-3 text-left text-[10px] font-semibold tracking-wider ${
                        h === "AI OPTIMIZATION"
                          ? "text-brand-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {h === "AI OPTIMIZATION" ? (
                        <span className="flex items-center gap-1">
                          <BoltIcon className="size-3" />
                          {h}
                        </span>
                      ) : (
                        h
                      )}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {PRODUCTS.map((p) => {
                const sc = STATUS_CONFIG[p.status];
                return (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Product */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                          <Image
                            src={p.image}
                            alt={p.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 dark:text-white/90 leading-tight">
                            {p.name}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            {p.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="px-5 py-4">
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                        {p.sku.split("-").join("-\n")}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {p.category}
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {p.location}
                    </td>

                    {/* Stock level */}
                    <td className="px-5 py-4">
                      <StockBar stock={p.stock} max={p.maxStock} status={p.status} />
                    </td>

                    {/* Unit cost */}
                    <td className="px-5 py-4 text-sm font-semibold text-gray-800 dark:text-white/90">
                      {p.unitCost}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <Badge color={sc.color} size="sm">
                        <span className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {p.status}
                        </span>
                      </Badge>
                    </td>

                    {/* AI Optimization */}
                    <td className="px-5 py-4">
                      <AIOptimizationCell product={p} />
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
            Showing 1-{PER_PAGE} of {TOTAL.toLocaleString()} items
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeftIcon className="size-4" />
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
            <span className="flex items-center justify-center w-8 h-8 text-sm text-gray-400">
              ...
            </span>
            <button
              onClick={() => setPage(TOTAL_PAGES)}
              className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                page === TOTAL_PAGES
                  ? "bg-brand-500 text-white"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {TOTAL_PAGES}
            </button>
            <button
              onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={page === TOTAL_PAGES}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowRightIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
