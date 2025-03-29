import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function StaySuite_Public_Blogs() {
    return (
        <section className="pt-28 pb-24 flex items-start flex-col mx-auto lg:container space-y-8">
            <div id="landing-banner" className="space-y-3">
                <div id="staysuite-offers" className="space-x-2 mb-8">
                    <Badge
                        variant="outline"
                        className="rounded-full border-slate-400 p-2 font-normal text-sm">
                        Guest Assistance Hub
                    </Badge>
                    <Badge
                        variant="outline"
                        className="rounded-full border-slate-400 p-2 font-normal text-sm">
                        Article Blogs
                    </Badge>
                </div>
                <div id="landing-text">
                    <span className="block lg:text-8xl font-extrabold max-w-[840px] break-words tracking-tight leading-none">Dive Into Our Insider Useful Tips.</span>
                </div>
            </div>

            {/* Dynamic Data */}

            <div className="pt-20 w-full grid grid-cols-2 gap-6 mb-12">
                <div className="border border-slate-500 hover:bg-gray-100 rounded-xl p-5">
                    <a href="/story">
                        <div className="leading-8 space-y-4">
                            <div id="article-hero">
                                <img src="https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SRc9kNMsCiv4UJh150yGOZYWxesQwoIFAl8km" className="aspect-video w-full h-[240px] rounded-xl object-cover" alt="" />
                            </div>
                            <div id="article-topic" className="space-y-2">
                                <Badge
                                    variant="outline"
                                    className="rounded-full border-slate-400 p-2 font-medium text-xs">
                                    Article Blogs
                                </Badge>
                                <span className="text-xl font-bold line-clamp-3">
                                    For when it feels like you can't change anything.
                                </span>
                                <p className="text-gray-500">Published Date: DD/MM/YYYY</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="border border-slate-500 hover:bg-gray-100 rounded-xl p-5">
                    <a href="/story">
                        <div className="leading-8 space-y-4">
                            <div id="article-hero">
                                <img src="https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SRc9kNMsCiv4UJh150yGOZYWxesQwoIFAl8km" className="aspect-video w-full h-[240px] rounded-xl object-cover" alt="" />
                            </div>
                            <div id="article-topic" className="space-y-2">
                                <Badge
                                    variant="outline"
                                    className="rounded-full border-slate-400 p-2 font-medium text-xs">
                                    Article Blogs
                                </Badge>
                                <span className="text-xl font-bold line-clamp-3">
                                    For when it feels like you can't change anything.
                                </span>
                                <p className="text-gray-500">Published Date: DD/MM/YYYY</p>
                            </div>
                        </div>
                    </a>
                </div>
                
                
            </div>
        </section>

    )
}

export default StaySuite_Public_Blogs;