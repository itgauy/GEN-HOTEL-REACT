import React from "react";
import { GalleryVerticalEnd, Home, FileText, Activity, LayoutDashboard } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { NavUser } from "./Sidebar_UserDialog";

// This is sample data.
const data = {
  user: {
    name: "Kenneth O.",
    email: "k80308392@gmail.com",
    avatar: "https://github.com/golash0000.png",
  },
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: Home,
    },
    {
      title: "Information Management",
      url: "#",
      icon: FileText,
    },
    {
      title: "Articles Management",
      url: "#",
      icon: Activity,
    },
    {
      title: "FAQs Management",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Contact Lists",
      url: "#",
      icon: LayoutDashboard,
    },
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Knowledge Management</span>
                  <span className="text-xs">Manage information data.</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administrator</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="mr-1" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
