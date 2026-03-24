import OrdersPage from "@/components/orders/OrdersPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | Backoffice",
  description: "Manage and track customer orders.",
};

export default function Page() {
  return <OrdersPage />;
}
