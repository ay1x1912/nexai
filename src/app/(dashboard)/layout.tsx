import React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import DashBoardSideBar from "@/module/dashboard/ui/components/dashboard-sideBar";

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <DashBoardSideBar />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}

export default Layout;
