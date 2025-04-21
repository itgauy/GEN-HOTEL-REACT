import { GalleryVerticalEnd } from "lucide-react"
import { RegisterForm } from "../components/register-form";
import { useEffect } from "react";

function Hotel_Registration() {
    useEffect(() => {
        console.log("you are now here....")
        history.replaceState(null, "", window.location.href);

        // Optional: You can also block forward navigation
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => {
            history.go(1); // Pushes user forward if they try to go back
        };

        return () => {
            window.onpopstate = null;
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