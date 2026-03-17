import AIDashboard from "@/components/dashboard/AIDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Backoffice",
  description: "AI & Automation Dashboard",
};

export default function DashboardPage() {
  return <AIDashboard />;
}
