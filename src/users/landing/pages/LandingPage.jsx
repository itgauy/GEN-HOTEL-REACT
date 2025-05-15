import { Fragment, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MoveUpRight, LoaderCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import usePublicStore from "../stores/public.stores";

function StaySuite_LandingPage() {
  const { landingData, fetchLandingData, isLoading } = usePublicStore();

  // Fetch landing data on component mount
  useEffect(() => {
    fetchLandingData();
  }, [fetchLandingData]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <LoaderCircle className="animate-spin text-black" size={32} />
        </div>
    );
}

  return (
    <Fragment>
      <section className="pt-28 pb-24 flex items-start flex-col mx-auto lg:container space-y-8">
        <div id="landing-banner" className="space-y-3">
          <div id="staysuite-offers" className="space-x-2 mb-8">
            <Badge
              variant="outline"
              className="rounded-full border-slate-400 p-2 font-normal text-sm"
            >
              Booking
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full border-slate-400 p-2 font-normal text-sm"
            >
              Hotel Services
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full border-slate-400 p-2 font-normal text-sm"
            >
              Check-in
            </Badge>
          </div>
          <div id="landing-text">
            <span className="block lg:text-8xl font-extrabold max-w-[840px] break-words tracking-tight leading-none">
              {landingData?.heroSection?.title || "Welcome to Your Stay"}
            </span>
          </div>
        </div>
        <div
          id="two-grid-column"
          className="w-full grid grid-cols-2 gap-6 h-[480px]"
        >
          <div className="bg-gradient-to-b from-teal-400 to-white border border-slate-300 p-6 rounded-xl overflow-hidden relative h-full before:content-[''] before:absolute before:inset-0 before:bg-cover before:bg-center before:bg-[url('https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SRc9kNMsCiv4UJh150yGOZYWxesQwoIFAl8km')] before:opacity-10">
            <div className="absolute bottom-8 left-6 space-y-4">
              <div className="font-normal">Maximize your lifestyle</div>
              <div className="font-bold tracking-tighter text-5xl max-w-[540px] break-words">
                Choose a suitable home to truly live in luxury.
              </div>
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
              <div className="font-bold tracking-tighter text-5xl max-w-[540px] break-words">
                Your Stay, Simplified: Discover tips & experiences
              </div>
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
        <div id="section" className="w-full">
          <div className="text-center py-8">
            <h2 className="text-4xl font-bold tracking-tight">Our Missions / Goals</h2>
            <p className="text-lg text-slate-600 mt-2 max-w-[600px] mx-auto">
              We strive to deliver unparalleled hospitality, ensuring every guest enjoys comfort, convenience, and unforgettable experiences.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-[lg:container]">
              <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
                <Masonry gutter="16px">
                  {landingData?.features?.map((feature) => (
                    <Card
                      key={feature._id}
                      className="m-2 border-slate-200 shadow-sm w-full break-words p-6 space-y-2"
                      style={{ height: "auto" }}
                    >
                      <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                        <CardDescription className="text-lg text-slate-400">
                          {feature.subtitle}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 space-y-3">
                        <p className="text-base text-slate-700">{feature.content}</p>
                        {feature.callToAction && (
                          <div>
                            <Link to={feature.callToAction.link}>
                              <Button>{feature.callToAction.label}</Button>
                            </Link>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div id="about-us-section" className="w-full mt-16">
          <div className="text-center py-8">
            <h2 className="text-4xl font-bold tracking-tight">About Us</h2>
            <p className="text-lg text-slate-600 mt-2 max-w-[600px] mx-auto">
              Our journey to success!
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mt-0 space-y-6">
            <p className="text-slate-700 text-left">
              Founded in 2018, StaySuite began with a simple vision: to transform the way hotels operate and guests experience hospitality. What started as a small team of hospitality experts and software engineers in a modest office has grown into an industry-leading hotel management system trusted by properties worldwide.
            </p>
            
            <p className="text-slate-700 text-left">
              Our founders, having spent decades in the hospitality industry, recognized the challenges that both hotel staff and guests faced with outdated management systems. They envisioned a comprehensive solution that would streamline operations while enhancing the guest experience from booking to checkout.
            </p>
            
            <p className="text-slate-700 text-left">
              StaySuite was built on three core principles: simplicity, efficiency, and exceptional service. We believe that technology should make life easier, not more complicated. Our intuitive platform allows hotel staff to manage everything from reservations and room assignments to guest services and billing with just a few clicks.
            </p>
            
            <p className="text-slate-700 text-left">
              Today, StaySuite serves over 500 properties across 35 countries, from boutique hotels to luxury resorts. Our team has expanded to include hospitality consultants, customer success specialists, and developers dedicated to continuous innovation. Despite our growth, we remain committed to our original mission: creating seamless experiences for hoteliers and their guests.
            </p>
            
            <div className="text-center mt-10">
              <Link to="/about">
                <Button variant="outline" className="px-6">
                  Learn More About Our Story <MoveUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div id="faq-section" className="w-full mt-16">
          <div className="text-center py-8">
            <h2 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600 mt-2 max-w-[600px] mx-auto">
              Find answers to common questions about our accommodations, services, and policies.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mt-8">
            <Accordion type="single" collapsible className="w-full">
              {landingData?.faqSection?.map((item) => (
                <AccordionItem key={item._id} value={`item-${item._id}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-8 text-center">
              <p className="text-slate-600 mb-4">Still have questions? We're here to help.</p>
              <Link to="/contact">
                <Button className="px-6">
                  Contact Support <MoveUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default StaySuite_LandingPage;