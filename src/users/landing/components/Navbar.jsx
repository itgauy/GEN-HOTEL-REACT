import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowDownToLine } from "lucide-react"

export function Navbar_Public({ className, ...props }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur select-none">
            <div className="lg:container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center">
                    <Link to="/" className="text-xl font-bold">
                        Hotels
                    </Link>
                </div>
                <nav className="flex items-center gap-6">
                    <Link to="/homes" className="text-sm font-medium hover:underline">
                        Homes
                    </Link>
                    {/* <Link to="/blog" className="text-sm font-medium hover:underline">
                        Blog
                    </Link> */}
                    <Link to="/auth/login" className="text-sm font-medium hover:underline">
                        Login
                    </Link>
                    <a href="/EIM-HMS-3O.zip" download>
                        <Button className="rounded-md">
                            <ArrowDownToLine className="mr-2 h-4 w-4" /> Get for Desktop
                        </Button>
                    </a>
                </nav>
            </div>
        </header>
    )
}