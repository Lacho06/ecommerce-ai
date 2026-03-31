"use client";

import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Select from "@/components/form/Select";
import Switch from "@/components/form/switch/Switch";
import { BoltIcon } from "@/icons";
import { ArrowLeftIcon, Info, Banknote, ChartSpline, Sparkle, Layers, Image, Rocket } from 'lucide-react';
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { AxiosError } from "axios";


const CATEGORIES = [
  { value: "Electronics", label: "Electronics" },
  { value: "Furniture", label: "Furniture" },
  { value: "Home Decor", label: "Home Decor" },
  { value: "Clothing", label: "Clothing" },
  { value: "Sports", label: "Sports" },
];

const SUGGESTED_TAGS = ["Premium", "Wireless", "High Fidelity", "Bluetooth", "Pro"];

interface FormState {
  name: string;
  sku: string;
  brand: string;
  categoryName: string;
  basePrice: string;
  salePrice: string;
  costPerItem: string;
  stock: string;
}

export default function ProductCreatePage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    sku: "",
    brand: "",
    categoryName: "Electronics",
    basePrice: "",
    salePrice: "",
    costPerItem: "",
    stock: "",
  });
  const [description, setDescription] = useState("");
  const [dynamicPricing, setDynamicPricing] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [health] = useState(75);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/png": [], "image/jpeg": [], "video/mp4": [] },
    onDrop: (files) => console.log("Files dropped:", files),
  });

  const setField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const toggleTag = (tag: string) =>
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const handleSubmit = async () => {
    setError(null);

    if (!form.name || !form.sku || !form.brand || !form.basePrice || !form.costPerItem || !form.stock) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/products", {
        name: form.name,
        sku: form.sku,
        brand: form.brand,
        categoryName: form.categoryName || undefined,
        basePrice: parseFloat(form.basePrice),
        salePrice: form.salePrice ? parseFloat(form.salePrice) : undefined,
        costPerItem: parseFloat(form.costPerItem),
        stock: parseInt(form.stock, 10),
        dynamicPricing,
        description: description || undefined,
        tagNames: tags.length ? tags : undefined,
      });

      router.push("/products");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const msg = err.response?.data?.message;
        setError(Array.isArray(msg) ? msg[0] : (msg ?? `Error ${err.response?.status}`));
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Circle stroke for health score
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (health / 100) * circumference;

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <Link
          href="/products"
          className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white/90">Add Product</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fill in the details to create a new product listing.
          </p>
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-error-50 border border-error-200 text-error-600 text-sm dark:bg-error-500/10 dark:border-error-500/20 dark:text-error-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-12 gap-5">
        {/* ── Left column ── */}
        <div className="flex flex-col gap-5 col-span-9">

          {/* Basic Info */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                <Info className="text-brand-500 size-4" />
              </div>
              <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">Basic Info</h2>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  type="text"
                  placeholder="e.g. Premium Wireless Headphones"
                  value={form.name}
                  onChange={setField("name")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    type="text"
                    placeholder="WH-001-PRO"
                    value={form.sku}
                    onChange={setField("sku")}
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    type="text"
                    placeholder="AudioTech"
                    value={form.brand}
                    onChange={setField("brand")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  options={CATEGORIES}
                  placeholder="Select a category"
                  defaultValue={form.categoryName}
                  onChange={(val) => setForm((prev) => ({ ...prev, categoryName: val }))}
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                  <Banknote className="text-brand-500 size-4" />
                </div>
                <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                  Pricing & Stock
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <BoltIcon className="text-brand-500 size-3.5" />
                <span className="text-xs font-medium text-brand-500">
                  Dynamic Pricing Powered by AI
                </span>
                <Switch
                  label=""
                  defaultChecked={dynamicPricing}
                  onChange={setDynamicPricing}
                  color="blue"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="base-price">Base Price</Label>
                <Input
                  id="base-price"
                  type="number"
                  placeholder="0.00"
                  value={form.basePrice}
                  onChange={setField("basePrice")}
                />
              </div>
              <div>
                <Label htmlFor="sale-price">Sale Price (Optional)</Label>
                <Input
                  id="sale-price"
                  type="number"
                  placeholder="0.00"
                  value={form.salePrice}
                  onChange={setField("salePrice")}
                />
              </div>
              <div>
                <Label htmlFor="cost">Cost per item</Label>
                <Input
                  id="cost"
                  type="number"
                  placeholder="0.00"
                  value={form.costPerItem}
                  onChange={setField("costPerItem")}
                />
              </div>
              <div>
                <Label htmlFor="stock">Initial Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="100"
                  value={form.stock}
                  onChange={setField("stock")}
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                <Image className="text-brand-500 size-4" />
              </div>
              <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">Media</h2>
            </div>

            <div
              {...getRootProps()}
              className={`rounded-xl border-2 border-dashed p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors ${
                isDragActive
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-500/5"
                  : "border-gray-200 bg-gray-50 hover:border-brand-400 dark:border-gray-700 dark:bg-gray-800/50"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 14V4M11 4L7 8M11 4l4 4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isDragActive ? "Drop files here" : "Drag and drop images or videos"}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  PNG, JPG, MP4 up to 50MB
                </p>
              </div>
              <button
                type="button"
                className="px-4 py-2 text-xs font-medium text-brand-500 border border-brand-300 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-colors"
              >
                Browse Files
              </button>
            </div>
          </div>

          {/* Variations & Shipping */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                  <Layers className="text-brand-500 size-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                    Variations & Shipping
                  </h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    Configure sizes, colors, and shipping dimensions
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors">
                Add Details
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Link href="/products">
              <Button variant="outline" size="md">Cancel</Button>
            </Link>
            <Button
              variant="primary"
              size="md"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="flex flex-col gap-5 col-span-3">

          {/* Product Health Score */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 mb-4">
              <ChartSpline className="text-brand-500 size-4" />
              <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                Product Health Score
              </h2>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60" cy="60" r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-gray-100 dark:text-gray-800"
                  />
                  <circle
                    cx="60" cy="60" r={radius}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800 dark:text-white/90">
                    {health}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Your listing is{" "}
                <span className="text-success-600 font-semibold">Good</span>. Add a description
                to reach 100%.
              </p>
            </div>
          </div>

          {/* AI Assistant */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkle className="text-brand-500 size-4" />
              <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                AI Assistant
              </h2>
            </div>

            <TextArea
              placeholder="Generated description will appear here after you provide basic info..."
              rows={4}
              value={description}
              onChange={setDescription}
            />

            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button variant="primary" size="sm" startIcon={<BoltIcon className="size-3.5" />}>
                Generate
              </Button>
              <Button variant="outline" size="sm" startIcon={<Rocket className="size-3.5" />}>
                Optimize SEO
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 tracking-widest mb-2">
                SUGGESTED TAGS
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      tags.includes(tag)
                        ? "bg-brand-50 border-brand-200 text-brand-600 dark:bg-brand-500/10 dark:border-brand-500/30 dark:text-brand-400"
                        : "bg-white border-gray-200 text-gray-500 hover:border-brand-300 dark:bg-transparent dark:border-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {tag}
                    <span className="text-[11px]">{tags.includes(tag) ? "×" : "+"}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Automations */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 mb-4">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-brand-500">
                <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.93 2.93l1.41 1.41M9.66 9.66l1.41 1.41M2.93 11.07l1.41-1.41M9.66 4.34l1.41-1.41" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                Active Automations
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { name: "Shopify Sync", active: true, color: "bg-green-500" },
                { name: "WhatsApp Notify", active: false, color: "bg-gray-300 dark:bg-gray-600" },
              ].map((a) => (
                <div
                  key={a.name}
                  className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5.5" stroke="#6B7280" strokeWidth="1.3" />
                        <path d="M4.5 7l2 2 3-3" stroke="#6B7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{a.name}</span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${a.color}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
