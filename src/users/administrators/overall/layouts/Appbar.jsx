import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/Sidebar";
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/toaster";

function Room_Management_Appbar({ children }) {
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
                    <h1 className="text-base font-medium">Hotel Rooms and Condominiums Data Management</h1>
                </div>
                <Toaster />
                <Outlet />
            </main>
        </SidebarProvider>
    );
}

export default Room_Management_Appbar;