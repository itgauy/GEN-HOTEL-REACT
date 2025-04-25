import { GalleryVerticalEnd } from "lucide-react"
import { RegisterForm } from "../components/register-form";
import { useEffect } from "react";

function Hotel_Registration() {
    useEffect(() => {
        // Prevent back navigation
        history.replaceState(null, "", window.location.href);
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => history.go(1);

        // Prompt confirmation before tab close / page unload
        const handleBeforeUnload = (event) => {
            const message = "Are you sure you want to leave this page? Your last registration session will be lost.";
            event.preventDefault();
            event.returnValue = message;
            return message;
        };

        // Cleanup logic on unload
        const handleUnload = () => {
            localStorage.removeItem("guest-signup-storage");
            deleteCookie("hotel-guest-registration");
            sessionStorage.removeItem("temporary_access");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("unload", handleUnload);

        return () => {
            window.onpopstate = null;
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("unload", handleUnload);
        };
    }, []);

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <a href="/homes" className="flex items-center gap-2 self-center font-medium">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Guest Registration
                </a>
                <RegisterForm />
            </div>
        </div>
    )
}

export default Hotel_Registration;