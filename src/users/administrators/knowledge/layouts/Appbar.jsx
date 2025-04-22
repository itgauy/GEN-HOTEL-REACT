import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "../components/Sidebar";

function Knowledge_Appbar({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <div className="flex w-full items-center border-b p-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-4"
                    />
                    <h1 className="text-base font-medium">Welcome Page!</h1>
                </div>
                <Outlet />
            </main>
        </SidebarProvider>
    );
}

export default Knowledge_Appbar;