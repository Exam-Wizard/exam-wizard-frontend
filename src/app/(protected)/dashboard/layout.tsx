import { TLayout } from "@/types/react";
import { Dashboard } from "@/components/dashboard/layout";

const DashboardLayout: TLayout = ({ children }) => {
  return <Dashboard>{children}</Dashboard>;
};

export default DashboardLayout;
