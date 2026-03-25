import InventoryPage from "@/components/inventory/InventoryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory | Backoffice",
  description: "Real-time status of your global product stock and AI insights.",
};

export default function Page() {
  return <InventoryPage />;
}
