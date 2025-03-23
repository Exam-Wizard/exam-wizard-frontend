import { ExtendedFC } from "@/types/react";
import { Dashboard } from "@/components/dashboard/layout";

const DashboardLayout: ExtendedFC = ({ children }) => {
  return <Dashboard>{children}</Dashboard>;
};

export default DashboardLayout;
