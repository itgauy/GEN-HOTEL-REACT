import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Diff, Puzzle, Smile, CircleMinus, CirclePlus, BoxIcon,
ChartLine, HouseIcon, PanelsTopLeftIcon, SettingsIcon, UsersRoundIcon, } from "lucide-react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  startOfDay,
  isBefore,
  format,
  startOfMonth,
  endOfMonth,
  addDays,
} from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

function StaySuite_User_Booking_Queues() {
  // State for the main calendar
  const today = startOfDay(new Date());
  const [checkInMain, setCheckInMain] = useState({
    from: today,
    to: addDays(today),
  });

  // State for the modal/dialog calendar
  const [checkInModal, setCheckInModal] = useState(null);
  const [checkOutModal, setCheckOutModal] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  // State for handling timeSlots together.
  const [timeCheckIn, setTimeCheckIn] = useState(null);
  const [timeCheckOut, setTimeCheckOut] = useState(null);

  // Mock time slots data
  const timeSlots = [
    // 12:00 AM - 6:00 AM
    { time: "2025-03-24T00:00:00Z", available: false },
    { time: "2025-03-24T00:30:00Z", available: false },
    { time: "2025-03-24T01:00:00Z", available: true },
    { time: "2025-03-24T01:30:00Z", available: true },
    { time: "2025-03-24T02:00:00Z", available: true },
    { time: "2025-03-24T02:30:00Z", available: true },
    { time: "2025-03-24T03:00:00Z", available: false },
    { time: "2025-03-24T03:30:00Z", available: true },
    { time: "2025-03-24T04:00:00Z", available: true },
    { time: "2025-03-24T04:30:00Z", available: true },
    { time: "2025-03-24T05:00:00Z", available: true },
    { time: "2025-03-24T05:30:00Z", available: false },

    // 6:00 AM - 12:00 PM
    { time: "2025-03-24T06:00:00Z", available: true },
    { time: "2025-03-24T06:30:00Z", available: true },
    { time: "2025-03-24T07:00:00Z", available: true },
    { time: "2025-03-24T07:30:00Z", available: true },
    { time: "2025-03-24T08:00:00Z", available: false },
    { time: "2025-03-24T08:30:00Z", available: true },
    { time: "2025-03-24T09:00:00Z", available: true },
    { time: "2025-03-24T09:30:00Z", available: true },
    { time: "2025-03-24T10:00:00Z", available: true },
    { time: "2025-03-24T10:30:00Z", available: false },
    { time: "2025-03-24T11:00:00Z", available: true },
    { time: "2025-03-24T11:30:00Z", available: true },

    // 12:00 PM - 11:30 PM
    { time: "2025-03-24T12:00:00Z", available: false },
    { time: "2025-03-24T12:30:00Z", available: true },
    { time: "2025-03-24T13:00:00Z", available: true },
    { time: "2025-03-24T13:30:00Z", available: true },
    { time: "2025-03-24T14:00:00Z", available: true },
    { time: "2025-03-24T14:30:00Z", available: false },
    { time: "2025-03-24T15:00:00Z", available: true },
    { time: "2025-03-24T15:30:00Z", available: true },
    { time: "2025-03-24T16:00:00Z", available: true },
    { time: "2025-03-24T16:30:00Z", available: true },
    { time: "2025-03-24T17:00:00Z", available: true },
    { time: "2025-03-24T17:30:00Z", available: true },
    { time: "2025-03-24T18:00:00Z", available: true },
    { time: "2025-03-24T18:30:00Z", available: true },
    { time: "2025-03-24T19:00:00Z", available: true },
    { time: "2025-03-24T19:30:00Z", available: false },
    { time: "2025-03-24T20:00:00Z", available: true },
    { time: "2025-03-24T20:30:00Z", available: true },
    { time: "2025-03-24T21:00:00Z", available: true },
    { time: "2025-03-24T21:30:00Z", available: true },
    { time: "2025-03-24T22:00:00Z", available: true },
    { time: "2025-03-24T22:30:00Z", available: false },
    { time: "2025-03-24T23:00:00Z", available: true },
    { time: "2025-03-24T23:30:00Z", available: true },
  ];

  return (
    <section className="pb-24 grid xs:grid-cols-1 lg:grid-cols-12 mx-auto lg:container gap-6">
      <section className="lg:col-span-7 flex flex-col items-start space-y-4">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-2xl">Queueing</span>
          <Badge className="rounded-full">1 Items</Badge>
        </div>
        <div className="flex flex-col w-full">
          <ScrollArea className="h-[400px] border border-slate-200 rounded-xl p-2">
            <div className="grid grid-cols-1 gap-4">
              <div className="border border-slate-300 p-3 rounded-xl flex flex-row items-start w-full">
                <div className="rounded-xl overflow-hidden select-none">
                  <Link to="">
                    <img
                      src="https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SRc9kNMsCiv4UJh150yGOZYWxesQwoIFAl8km"
                      className="aspect-video object-cover w-[9.575rem] h-[9.575rem]"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="w-full px-4 flex flex-col space-y-2 relative">
                  <div className="space-y-2">
                    <div className="max-w-[450px] break-words">
                      <Link to="">
                        <span className="font-bold underline text-lg select-none line-clamp-1">
                          Hotel Room
                        </span>
                      </Link>
                      <p className="text-gray-500 text-sm">
                        Location: Quezon City, NCR
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 select-none">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button size="sm" variant="outline">
                            <CalendarIcon />
                            Check In: March 24 (6:00 AM) to March 25 (8:00 PM)
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Update Data (Check In)
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogDescription className="space-y-4">
                            <div className="flex flex-col items-start mb-4">
                              {/* Check In Calendar */}
                              <div className="rounded-md border">
                                <div className="flex max-sm:flex-col">
                                  {/* Calendar Selection - Check In */}
                                  <CalendarUI
                                    mode="range"
                                    selected={checkInModal}
                                    onSelect={(date) => {
                                      if (date) {
                                        setCheckInModal(date);
                                        setCheckOutModal(null); // Reset check-out to force user to reselect
                                      }
                                    }}
                                    className="lg:w-[250px]"
                                    disabled={(date) => isBefore(date, today)}
                                    classNames={{
                                      day_disabled:
                                        "text-muted-foreground opacity-50 line-through",
                                    }}
                                  />

                                  {/* Time Slots Selection for Check In */}
                                  <div className="relative w-full max-sm:h-48 sm:w-40">
                                    <div className="absolute inset-0 py-4 max-sm:border-t">
                                      <ScrollArea className="h-full sm:border-s">
                                        <div className="space-y-3">
                                          <div className="flex h-5 shrink-0 items-center px-5">
                                            <p className="text-sm font-medium">
                                              {format(date, "EEEE, d")}
                                            </p>
                                          </div>
                                          <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                                            {timeSlots.map(
                                              ({
                                                time: timeSlot,
                                                available,
                                              }) => {
                                                const dateObj = new Date(
                                                  timeSlot
                                                );
                                                const formattedTime =
                                                  dateObj.toLocaleTimeString(
                                                    "en-PH",
                                                    {
                                                      hour: "numeric",
                                                      minute: "2-digit",
                                                      hour12: true,
                                                    }
                                                  );

                                                return (
                                                  <Button
                                                    key={timeSlot}
                                                    variant={
                                                      timeCheckIn === timeSlot
                                                        ? "default"
                                                        : "outline"
                                                    }
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={() =>
                                                      setTimeCheckIn(timeSlot)
                                                    }
                                                    disabled={!available}
                                                  >
                                                    {formattedTime}
                                                  </Button>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      </ScrollArea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-md mt-4 text-black">
                                Specified Date: From March 24 to March 31 around 10:30 AM
                              </div>
                            </div>
                          </AlertDialogDescription>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="py-1 border-slate-300 border-b w-full" />
                  <div className="flex flex-row justify-between items-center select-none">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button size="sm" variant="outline">
                          <Diff />
                          Guests: 10 (total)
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Update Data (Guests)
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <div className="grid grid-cols-1 gap-4 text-black">
                              <div className="flex flex-row items-center justify-between border rounded-lg border-slate-400 p-4">
                                <div className="">
                                  <span className="block font-semibold text-lg">
                                    Adults
                                  </span>
                                  <p>Age 13+</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Button variant="outline" size="icon" id="subtract">
                                        <CircleMinus />
                                    </Button>
                                    <div id="count" className="text-lg">
                                        1
                                    </div>
                                    <Button variant="outline" size="icon" id="add">
                                        <CirclePlus />
                                    </Button>
                                </div>
                              </div>
                              <div className="flex flex-row items-center justify-between border rounded-lg border-slate-400 p-4">
                                <div className="">
                                  <span className="block font-semibold text-lg">
                                    Children
                                  </span>
                                  <p>Age 2-12</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Button variant="outline" size="icon" id="subtract">
                                        <CircleMinus />
                                    </Button>
                                    <div id="count" className="text-lg">
                                        1
                                    </div>
                                    <Button variant="outline" size="icon" id="add">
                                        <CirclePlus />
                                    </Button>
                                </div>
                              </div>
                              <div className="flex flex-row items-center justify-between border rounded-lg border-slate-400 p-4">
                                <div className="">
                                  <span className="block font-semibold text-lg">
                                    Infants
                                  </span>
                                  <p>Under 2</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Button variant="outline" size="icon" id="subtract">
                                        <CircleMinus />
                                    </Button>
                                    <div id="count" className="text-lg">
                                        1
                                    </div>
                                    <Button variant="outline" size="icon" id="add">
                                        <CirclePlus />
                                    </Button>
                                </div>
                              </div>
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <p className="font-bold text-lg">₱2000</p>
                  </div>
                  <AlertDialog>
                        <AlertDialogTrigger>
                            <Button className="absolute top-0 right-0 z-10 select-none">
                                Cancel
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogTitle>
                                Confirm Action
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone.
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </ScrollArea>
          <ScrollArea className="mt-4 h-[300px]">
            <div className="border border-blue-400 bg-b p-4 rounded-xl w-full">
              <div className="flex items-center flex-row w-full justify-between">
                <div className="flex flex-row items-start space-x-2">
                  <div className="rounded-full bg-blue-200 p-2">
                    <Puzzle size={20} className="text-blue-600" />
                  </div>
                  <div className="inline-flex flex-col">
                    <span className="font-bold">Discount code</span>
                    <p className="text-sm">Save 20% with discount code.</p>
                  </div>
                </div>
                <Button disabled>
                  <Smile />
                  Discount Code
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </section>

      {/* Right Side Grid */}

      <section className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start shadow-lg bg-white border rounded-xl p-6">
        <div className="w-full space-y-4">
          <Tabs defaultValue="cash">
            <TabsList className="grid w-full grid-cols-2">x
              <TabsTrigger value="cash">Pay thru Cash</TabsTrigger>
              <TabsTrigger value="paypal" disabled>
                Pay thru PayPal
              </TabsTrigger>
            </TabsList>
            <TabsContent value="cash" className="space-y-6 pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Contact Information</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="mike@example.com"
                      value="test me"
                      disabled
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="1234 5678 1234"
                      value="test me"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">Personal Information</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input id="middleName" placeholder="David" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Smith" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="suffix">Suffix (optional)</Label>
                    <Select>
                      <SelectTrigger id="suffix">
                        <SelectValue placeholder="Select suffix" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jr">Jr.</SelectItem>
                        <SelectItem value="sr">Sr.</SelectItem>
                        <SelectItem value="ii">II</SelectItem>
                        <SelectItem value="iii">III</SelectItem>
                        <SelectItem value="iv">IV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal (Service fee)</span>
                    <span>₱0.00</span>
                  </div>
                  <div className="flex justify-between font-medium mt-4 pt-4 border-t">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg">₱0.00</span>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full">Pay ₱0.00</Button>
            </TabsContent>
            <TabsContent value="paypal">
              Do not make some changes here yet.
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </section>
  );
}

export default StaySuite_User_Booking_Queues;
