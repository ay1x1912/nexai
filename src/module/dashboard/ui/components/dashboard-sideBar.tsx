"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import DashBoardUserButton from "../../dashboard-user-button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const firstSection = [
  {
    label: "Mettings",
    href: "/mettings",
    icon: VideoIcon,
  },
  {
    label: "Agents",
    href: "/agents",
    icon: BotIcon,
  },
];
const secondSection = [
  {
    label: "Upgrade",
    href: "/upgrade",
    icon: StarIcon,
  },
];
function DashBoardSideBar() {
  const pathName = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex gap-4 p-2">
          <Image src={"/logo.svg"} alt="logo" width={32} height={32} />
          <Link className="text-2xl font-medium" href={"/"}>
            Nex AI
          </Link>
        </div>
      </SidebarHeader>
      <Separator className="bg-muted-foreground my-4" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "from-sidebar-accent via-sidebar/50 to-sidebar/50 h-10 border border-transparent from-5% via-30% hover:border-[#5D6B68] hover:bg-linear-to-r/oklch",
                      pathName === item.href &&
                        "border-[#5D6B68]/10 bg-linear-to-r/oklch",
                    )}
                    isActive={pathName == item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator className="bg-muted-foreground my-4" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "from-sidebar-accent via-sidebar/50 to-sidebar/50 h-10 border border-transparent from-5% via-30% hover:border-[#5D6B68] hover:bg-linear-to-r/oklch",
                      pathName === item.href &&
                        "border-[#5D6B68]/10 bg-linear-to-r/oklch",
                    )}
                    isActive={pathName == item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DashBoardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashBoardSideBar;
