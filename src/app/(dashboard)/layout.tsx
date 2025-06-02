import React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import DashBoardSideBar from "@/module/dashboard/ui/components/dashboard-sideBar";
import DashBoardNavBar from "@/module/dashboard/ui/components/dashboard-navBar";

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <DashBoardSideBar />
      <main className="bg-muted flex h-screen w-screen flex-col border">
        <DashBoardNavBar />
        {children}
      </main>
    </SidebarProvider>
  );
}

export default Layout;
