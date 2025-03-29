import { Fragment } from "react";
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function StaySuite_LandingPage() {
    return (
        <Fragment>
            <section className="pt-28 pb-24 flex items-start flex-col mx-auto lg:container space-y-8">
                <div id="landing-banner" className="space-y-3">
                    <div id="staysuite-offers" className="space-x-2 mb-8">
                        <Badge
                            variant="outline"
                            className="rounded-full border-slate-400 p-2 font-normal text-sm">
                            Booking
                        </Badge>
                        <Badge
                            variant="outline"
                            className="rounded-full border-slate-400 p-2 font-normal text-sm">
                            Hotel Services
                        </Badge>
                        <Badge
                            variant="outline"
                            className="rounded-full border-slate-400 p-2 font-normal text-sm">
                            Check-in
                        </Badge>
                    </div>
                    <div id="landing-text">
                        <span className="block lg:text-8xl font-extrabold max-w-[840px] break-words tracking-tight leading-none">Seamless Stays, Exceptional Value: Book Yours Now</span>
                    </div>
                </div>
                <div id="two-grid-column" className="w-full grid grid-cols-2 gap-6 h-[480px]">
                    <div className="bg-gradient-to-b from-teal-400 to-white border border-slate-300 p-6 rounded-xl overflow-hidden relative h-full before:content-[''] before:absolute before:inset-0 before:bg-cover before:bg-center before:bg-[url('https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SRc9kNMsCiv4UJh150yGOZYWxesQwoIFAl8km')] before:opacity-10">
                        <div className="absolute bottom-8 left-6 space-y-4">
                            <div className="font-normal">Maximize your lifestyle</div>
                            <div className="font-bold tracking-tighter text-5xl max-w-[540px] break-words">Choose a suitable home to truly live in luxury.</div>
                            <div id="redirection">
                                <Link to="/homes" className="underline">
                                    <Button>
                                        Explore <MoveUpRight />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-b from-green-400 to-white border border-slate-300 p-6 rounded-xl overflow-hidden relative h-full before:content-[''] before:absolute before:inset-0 before:bg-cover before:bg-center before:bg-[url('https://qby900ozue.ufs.sh/f/k3CYx7aMjR9Sfse57vxE0UWKPRCnJ1H7ZBq8MNGFfriLpXwj')] before:opacity-10">
                        <div className="absolute bottom-8 left-6 space-y-4">
                            <div className="font-normal">Guest Assistance</div>
                            <div className="font-bold tracking-tighter text-5xl max-w-[540px] break-words">Your Stay, Simplified: Discover tips & experiences</div>
                            <div id="redirection">
                                <Link to="/blog" className="underline">
                                    <Button>
                                        Explore <MoveUpRight />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default StaySuite_LandingPage;