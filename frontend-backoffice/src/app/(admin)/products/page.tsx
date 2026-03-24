import ProductsPage from "@/components/products/ProductsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Backoffice",
  description: "Manage your inventory, pricing, and AI-optimized listings.",
};

export default function Page() {
  return <ProductsPage />;
}
