"use client";

import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  ArrowUpIcon,
  AlertIcon,
  BoltIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  HorizontaLDots,
} from "@/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CalendarCheck2, Sparkles, Banknote, Plus, Download, ChevronLeft, ChevronRight } from 'lucide-react'

const STATS = [
  {
    label: "Total Products",
    value: "1,240",
    sub: "+2.4% vs last month",
    subType: "success",
    icon: <CalendarCheck2 className="text-brand-500" />,
  },
  {
    label: "Low Stock Alerts",
    value: "12",
    sub: "Requires immediate attention",
    subType: "warning",
    icon: <AlertIcon className="text-warning-500" />,
    valueColor: "text-warning-500",
  },
  {
    label: "AI Pending",
    value: "45",
    sub: "Drafts waiting for generation",
    subType: "neutral",
    icon: <Sparkles className="text-brand-500" />,
  },
  {
    label: "Avg. Margin",
    value: "32.8%",
    sub: "+0.8% increase",
    subType: "success",
    icon: <Banknote className="text-success-500" />,
  },
];

type AIStatus = "Optimized" | "Pending Generation" | "Not Enabled";

const PRODUCTS: {
  id: number;
  name: string;
  sku: string;
  image: string;
  category: string;
  stock: number;
  lowStock: boolean;
  price: string;
  aiStatus: AIStatus;
}[] = [
  {
    id: 1,
    name: "SoundMax Wireless Pro",
    sku: "SKU: SM-PRO-2024",
    image: "/images/product/product-01.jpg",
    category: "Electronics",
    stock: 84,
    lowStock: false,
    price: "$129.99",
    aiStatus: "Optimized",
  },
  {
    id: 2,
    name: "ComfortCurve Ergonomic Chair",
    sku: "SKU: FURN-CC-X1",
    image: "/images/product/product-02.jpg",
    category: "Furniture",
    stock: 3,
    lowStock: true,
    price: "$349.00",
    aiStatus: "Pending Generation",
  },
  {
    id: 3,
    name: "Nordic Ceramic Planter Set",
    sku: "SKU: HOME-NC-03",
    image: "/images/product/product-03.jpg",
    category: "Home Decor",
    stock: 152,
    lowStock: false,
    price: "$45.00",
    aiStatus: "Optimized",
  },
  {
    id: 4,
    name: "ActiveSync Watch Series 4",
    sku: "SKU: TECH-ASW4-B",
    image: "/images/product/product-04.jpg",
    category: "Electronics",
    stock: 12,
    lowStock: false,
    price: "$199.99",
    aiStatus: "Not Enabled",
  },
];

const AI_STATUS_CONFIG: Record<
  AIStatus,
  { color: "success" | "warning" | "light"; icon: React.ReactNode; label: string }
> = {
  Optimized: {
    color: "success",
    icon: <CheckCircleIcon />,
    label: "Optimized",
  },
  "Pending Generation": {
    color: "warning",
    icon: <BoltIcon />,
    label: "Pending Generation",
  },
  "Not Enabled": {
    color: "light",
    icon: <HorizontaLDots />,
    label: "Not Enabled",
  },
};

const TOTAL = 1240;
const PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(TOTAL / PER_PAGE);

export default function ProductsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  const toggleSelect = (id: number) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleAll = () =>
    setSelected(selected.length === PRODUCTS.length ? [] : PRODUCTS.map((p) => p.id));

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            Products
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your inventory, pricing, and AI-optimized listings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" startIcon={<Download className="w-4 h-4" />}>
            Export
          </Button>
          <Button variant="primary" size="sm" startIcon={<Plus className="w-4 h-4" />} onClick={() => router.push("/products/create")}>
            Add Product
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">{s.label}</span>
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800">
                {s.icon}
              </div>
            </div>
            <p
              className={`text-3xl font-bold mb-1 ${
                s.valueColor ?? "text-gray-800 dark:text-white/90"
              }`}
            >
              {s.value}
            </p>
            <p
              className={`text-xs flex items-center gap-1 ${
                s.subType === "success"
                  ? "text-success-600 dark:text-success-500"
                  : s.subType === "warning"
                  ? "text-warning-600 dark:text-warning-500"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {s.subType === "success" && <ArrowUpIcon className="size-3" />}
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
        {/* Filters */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            {["All Categories", "Stock Status", "Price Range"].map((f) => (
              <button
                key={f}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {f}
                <ChevronDownIcon className="size-4" />
              </button>
            ))}
          </div>
          <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4h14M5 9h8M8 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-5 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selected.length === PRODUCTS.length}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 accent-brand-500"
                  />
                </th>
                {["PRODUCT", "CATEGORY", "STOCK STATUS", "PRICE", "AI DESCRIPTION", "ACTIONS"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wider"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {PRODUCTS.map((p) => {
                const ai = AI_STATUS_CONFIG[p.aiStatus];
                return (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Checkbox */}
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(p.id)}
                        onChange={() => toggleSelect(p.id)}
                        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 accent-brand-500"
                      />
                    </td>

                    {/* Product */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                          <Image
                            src={p.image}
                            alt={p.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                            {p.name}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            {p.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        {p.category}
                      </span>
                    </td>

                    {/* Stock Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`flex items-center gap-1.5 text-sm font-medium ${
                          p.lowStock
                            ? "text-error-500"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            p.lowStock ? "bg-error-500" : "bg-success-500"
                          }`}
                        />
                        {p.lowStock
                          ? `${p.stock} left (Low Stock)`
                          : `${p.stock} in stock`}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 text-sm font-semibold text-gray-800 dark:text-white/90">
                      {p.price}
                    </td>

                    {/* AI Description */}
                    <td className="px-5 py-4">
                      <Badge color={ai.color} size="sm" startIcon={ai.icon}>
                        {ai.label}
                      </Badge>
                    </td>

                    {/* Actions */}
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
            {Math.min(page * PER_PAGE, TOTAL)} of {TOTAL.toLocaleString()} results
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
