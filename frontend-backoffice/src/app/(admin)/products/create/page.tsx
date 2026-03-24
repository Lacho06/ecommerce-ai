import ProductCreatePage from "@/components/products/ProductCreatePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product | Backoffice",
  description: "Create a new product listing.",
};

export default function Page() {
  return <ProductCreatePage />;
}
