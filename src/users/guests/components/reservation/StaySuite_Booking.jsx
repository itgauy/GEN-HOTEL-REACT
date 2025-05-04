import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X,
  Diff,
  Puzzle,
  Smile,
  CircleMinus,
  CirclePlus,
  BoxIcon,
  ChartLine,
  HouseIcon,
  PanelsTopLeftIcon,
  SettingsIcon,
  UsersRoundIcon,
} from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import useGuestBookStore from "../../stores/guest-book.store";

function StaySuite_User_Booking() {
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

  const items = [
    // {
    //   id: "1",
    //   date: "March 25, 2025 (09:34 AM, GMT +8)",
    //   location: "San Francisco, US",
    //   balance: "₱1,250.00",
    // },
    // {
    //   id: "2",
    //   date: "March 24, 2025 (12:38 PM, GMT +8)",
    //   location: "San Francisco, US",
    //   balance: "₱1,250.00",
    // },
  ];

  return (
    <section className="pb-24">
      <Tabs defaultValue="pendings">
        <TabsList>
          <TabsTrigger value="pendings">Pendings</TabsTrigger>
          <TabsTrigger value="check-ins">Check-Ins</TabsTrigger>
        </TabsList>
        <TabsContent value="pendings">
          <section className="pt-4 grid xs:grid-cols-1 lg:grid-cols-12 mx-auto lg:container gap-6">
            <section className="lg:col-span-7 flex flex-col items-start space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-bold text-2xl">Bookings</span>
                <Badge className="rounded-full">1 Pending</Badge>
              </div>
              <div className="flex flex-col w-full">
                <ScrollArea className="h-[400px] border border-slate-200 bg-gray-100 rounded-xl p-2">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="border bg-white border-slate-300 p-3 rounded-xl flex flex-row items-start w-full">
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
                          <div className="max-w-[300px] break-words">
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
                                  <Diff />
                                  Guests: 10 (total)
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Guests</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    <div className="grid grid-cols-1 gap-4 text-black">
                                      <div className="flex flex-row items-center justify-between border rounded-lg border-slate-400 p-4">
                                        <div className="">
                                          <span className="block font-semibold text-lg">
                                            Adults
                                          </span>
                                          <p>Age 20+</p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                      
                                          <div id="count" className="text-lg px-2.5">
                                            1
                                          </div>
                                         
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
                                      
                                          <div id="count" className="text-lg px-2.5">
                                            1
                                          </div>
                                          
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
                                      
                                          <div id="count" className="text-lg px-2.5">
                                            1
                                          </div>
                                          
                                        </div>
                                      </div>
                                    </div>
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <Button
                              size="sm"
                              variant="outline"
                              className="cursor-not-allowed"
                            >
                              <CalendarIcon />
                              Check In: March 24 (6:00 AM) to March 25 (8:00 PM)
                            </Button>
                          </div>
                        </div>
                        <div className="py-1 border-slate-300 border-b w-full" />
                        <div className="flex flex-row justify-between items-center select-none">
                          <p>Payment Status: PAID thru CASH</p>
                          <p className="font-bold text-lg">₱2000</p>
                        </div>
                        <Link to="">
                          <div className="absolute top-0 right-0 z-10 select-none flex flex-row space-x-2">
                            <Button variant="outline" className="">
                              View Receipt
                            </Button>
                            <Button variant="outline" className="">
                              View Details
                            </Button>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </section>

            {/* Right Side Grid */}

            <section className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start shadow-lg bg-white border rounded-xl p-6">
              <div className="w-full space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Transactions History</h3>
                  <div className="[&>div]:max-h-96">
                    <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
                      <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
                        <TableRow className="hover:bg-transparent">
                          <TableHead>Date</TableHead>
                          <TableHead className="">Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item) => (
                          <TableRow key={item.id} className="border-none">
                            <TableCell className="py-2.5">
                              {item.date}
                            </TableCell>
                            <TableCell className="py-2.5">
                              {item.balance}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </TabsContent>
        <TabsContent value="check-ins">
        <section className="pt-4 grid xs:grid-cols-1 lg:grid-cols-12 mx-auto lg:container gap-6">
            <section className="lg:col-span-7 flex flex-col items-start space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-bold text-2xl">Check-Ins</span>
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
                          <div className="max-w-[300px] break-words">
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
                                  <Diff />
                                  Guests: 10 (total)
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Guests</AlertDialogTitle>
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
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            id="subtract"
                                            disabled
                                          >
                                            <CircleMinus />
                                          </Button>
                                          <div id="count" className="text-lg">
                                            1
                                          </div>
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            id="add"
                                            disabled
                                          >
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
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            id="subtract"
                                            disabled
                                          >
                                            <CircleMinus />
                                          </Button>
                                          <div id="count" className="text-lg">
                                            1
                                          </div>
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            id="add"
                                            disabled
                                          >
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
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            id="subtract"
                                            disabled
                                          >
                                            <CircleMinus />
                                          </Button>
                                          <div id="count" className="text-lg">
                                            1
                                          </div>
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            id="add"
                                            disabled
                                          >
                                            <CirclePlus />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <Button
                              size="sm"
                              variant="outline"
                              className="cursor-not-allowed"
                            >
                              <CalendarIcon />
                              Check In: March 24 (6:00 AM) to March 25 (8:00 PM)
                            </Button>
                          </div>
                        </div>
                        <div className="py-1 border-slate-300 border-b w-full" />
                        <div className="flex flex-row justify-between items-center select-none">
                          <p>Payment Status: PAID thru CASH</p>
                          <p className="font-bold text-lg">₱2000</p>
                        </div>
                        <Link to="">
                          <div className="absolute top-0 right-0 z-10 select-none flex flex-row space-x-2">
                            <Button variant="outline" className="">
                              View Receipt
                            </Button>
                            <Button variant="outline" className="">
                              View Details
                            </Button>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </section>

            {/* Right Side Grid */}

            <section className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start shadow-lg bg-white border rounded-xl p-6">
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">Tell us your experience.</h3>
                  <div className="space-y-2">
                    <Label htmlFor="">Do you think that our hotel services provide maximum quality assurance?</Label>
                    <Textarea id="" placeholder="Leave a comment" className="h-[200px]" />
                  </div>
                  <div className="flex w-full justify-end space-x-2">
                    <Button>Submit</Button>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default StaySuite_User_Booking;