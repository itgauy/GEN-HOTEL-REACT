import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Diff,
  CircleMinus,
  CirclePlus,
  Download,
  Calendar as CalendarIcon,
  LoaderCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  startOfDay,
  format,
  addDays,
  isValid,
} from "date-fns";
import {
  AlertDialog,
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import useGuestBookStore from "../../stores/guest-book.store";

function StaySuite_User_Booking() {
  const { guestBook, loading, error, fetchGuestBookUser } = useGuestBookStore();
  const [userId, setUserId] = useState(null);

  // State for the main calendar
  const today = startOfDay(new Date());
  const [checkInMain, setCheckInMain] = useState({
    from: today,
    to: addDays(today, 1),
  });

  // State for the modal/dialog calendar
  const [checkInModal, setCheckInModal] = useState(null);
  const [checkOutModal, setCheckOutModal] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  // State for handling timeSlots together
  const [timeCheckIn, setTimeCheckIn] = useState(null);
  const [timeCheckOut, setTimeCheckOut] = useState(null);

  // Fetch user ID from localStorage and trigger fetchGuestBookUser
  useEffect(() => {
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const parsedData = JSON.parse(authStorage);
        const id = parsedData.state.user._id;
        if (id) {
          setUserId(id);
          fetchGuestBookUser(id); // Fetch bookings for this user
        }
      }
    } catch (error) {
      console.error("Error parsing auth-storage:", error);
    }
  }, [fetchGuestBookUser]);

  // Helper function to format date safely
  const formatDate = (dateString) => {
    if (!dateString) {
      console.warn("Date string is null or undefined:", dateString);
      return "Invalid Date";
    }
    const date = new Date(dateString);
    if (!isValid(date)) {
      console.warn("Invalid date detected:", dateString);
      return "Invalid Date";
    }
    return format(date, "MMMM d (h:mm a)");
  };

  // Helper function to format location
  const formatLocation = (location) => {
    if (!location) return "Quezon City, NCR";
    const { street, subdivision_village, brgy, city, province, postalcode } = location;
    return `${brgy}, ${city}, ${province}, ${postalcode}`;
  };

  // Filter bookings for pendings (check-in and check-out dates are on or after today)
  const pendings = guestBook?.filter((booking) => {
    const checkInDate = new Date(booking.booking_date_added);
    const checkOutDate = new Date(booking.receipt_record?.receipt_expiration);
    return (
      isValid(checkInDate) &&
      isValid(checkOutDate) &&
      checkInDate >= today &&
      checkOutDate >= today
    );
  }) || [];

  // Filter bookings for check-ins (check-out date is before today)
  const checkIns = guestBook?.filter((booking) => {
    const checkOutDate = new Date(booking.receipt_record?.receipt_expiration);
    return isValid(checkOutDate) && checkOutDate < today;
  }) || [];

  // Sample transaction items (unchanged)
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

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full py-8">
        <LoaderCircle className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <section className="pb-24">
      <Tabs defaultValue="pendings">
        {/* <TabsList>
          <TabsTrigger value="check-ins">Check-Ins</TabsTrigger>
        </TabsList> */}
        <TabsContent value="pendings">
          <section className="pt-4 grid xs:grid-cols-1 lg:grid-cols-12 mx-auto lg:container gap-6">
            <section className="lg:col-span-7 flex flex-col items-start space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-bold text-2xl">Bookings</span>
                <Badge className="rounded-full">
                  {pendings.length} Pending
                </Badge>
              </div>
              <div className="flex flex-col w-full">
                <ScrollArea className="h-[400px] border border-slate-200 bg-gray-100 rounded-xl p-2">
                  {loading && <p>Loading bookings...</p>}
                  {error && <p className="text-red-500">{error}</p>}
                  {!loading && !error && pendings.length === 0 && (
                    <p>No pending bookings found.</p>
                  )}
                  {!loading && !error && pendings.length > 0 && (
                    <div className="grid grid-cols-1 gap-4">
                      {pendings.map((booking) => {
                        const room = booking.reservation_room[0];
                        const roomDetails = room?.room_details[0];
                        const availability = roomDetails?.room_availability;
                        const totalGuests =
                          (availability?.adults || 0) +
                          (availability?.children || 0) +
                          (availability?.infants || 0);

                        return (
                          <div
                            key={booking._id}
                            className="border bg-white border-slate-300 p-3 rounded-xl flex flex-row items-start w-full"
                          >
                            <div className="rounded-xl overflow-hidden select-none">
                              <Link to={`/user/onboard/room/${booking._id}`}>
                                <img
                                  src={
                                    roomDetails?.room_images?.[0]?.media_files?.[0]?.file_url
                                  }
                                  className="aspect-video object-cover w-[9.575rem] h-[9.575rem]"
                                  alt={roomDetails?.room_title}
                                />
                              </Link>
                            </div>
                            <div className="w-full px-4 flex flex-col space-y-2 relative">
                              <div className="space-y-2">
                                <div className="max-w-[300px] break-words">
                                  <Link to={`/user/onboard/room/${booking._id}`}>
                                    <span className="font-bold underline text-lg select-none line-clamp-1">
                                      {roomDetails?.room_title || "Hotel Room"}
                                    </span>
                                  </Link>
                                  <p className="text-gray-500 text-sm">
                                    {formatLocation(room?.location)}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2 select-none">
                                  <AlertDialog>
                                    <AlertDialogTrigger>
                                      <Button size="sm" variant="outline">
                                        <Diff />
                                        Guests: {totalGuests || 10} (total)
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
                                                  {availability?.adults || 1}
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
                                                  {availability?.children || 1}
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
                                                  {availability?.infants || 1}
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
                                    Check In: {formatDate(booking.booking_date_added)} to{" "}
                                    {formatDate(booking.receipt_record?.receipt_expiration)}
                                  </Button>
                                </div>
                              </div>
                              <div className="py-1 border-slate-300 border-b w-full" />
                              <div className="flex flex-row justify-between items-center select-none">
                                <p>Payment Status: {booking.mode_of_payment || "PAID thru CASH"}</p>
                                <p className="font-bold text-lg">₱{booking.receipt_record?.order_reservation_total || 2000}</p>
                              </div>
                              {/* <Link to={`/booking/${booking._id}`}>
                                <div className="absolute top-0 right-0 z-10 select-none flex flex-row space-x-2">
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </div>
                              </Link> */}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </section>

            {/* Right Side Grid */}
            <section className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start shadow-lg bg-white border rounded-xl p-6">
              <div className="w-full space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Transactions History</h3>
                  <div className="[&>div]:max-h-96">
                    {items.length === 0 ? (
                      <div className="flex items-center justify-center h-[200px] text-gray-500">
                        No data available
                      </div>
                    ) : (
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
                              <TableCell className="py-2.5">{item.date}</TableCell>
                              <TableCell className="py-2.5">{item.balance}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </div>
              </div>
            </section>
            {/* Right Side Grid */}
          </section>
        </TabsContent>
        <TabsContent value="check-ins">
          <section className="pt-4 grid xs:grid-cols-1 lg:grid-cols-12 mx-auto lg:container gap-6">
            <section className="lg:col-span-7 flex flex-col items-start space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-bold text-2xl">Check-Ins</span>
                <Badge className="rounded-full">
                  {checkIns.length} Completed
                </Badge>
              </div>
              <div className="flex flex-col w-full">
                <ScrollArea className="h-[400px] border border-slate-200 bg-gray-100 rounded-xl p-2">
                  {loading && <p>Loading check-ins...</p>}
                  {error && <p className="text-red-500">{error}</p>}
                  {!loading && !error && checkIns.length === 0 && (
                    <p>No completed check-ins found.</p>
                  )}
                  {!loading && !error && checkIns.length > 0 && (
                    <div className="grid grid-cols-1 gap-4">
                      {checkIns.map((booking) => {
                        const room = booking.reservation_room[0];
                        const roomDetails = room?.room_details[0];
                        const availability = roomDetails?.room_availability;
                        const totalGuests =
                          (availability?.adults || 0) +
                          (availability?.children || 0) +
                          (availability?.infants || 0);

                        return (
                          <div
                            key={booking._id}
                            className="border bg-white border-slate-300 p-3 rounded-xl flex flex-row items-start w-full"
                          >
                            <div className="rounded-xl overflow-hidden select-none">
                              <Link to={`/user/onboard/room/${booking._id}`}>
                                <img
                                  src={
                                    roomDetails?.room_images?.[0]?.media_files?.[0]?.file_url ||
                                    "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SRc9kNMsCiv4UJh150yGOZYWxesQwoIFAl8km"
                                  }
                                  className="aspect-video object-cover w-[9.575rem] h-[9.575rem]"
                                  alt={roomDetails?.room_title || "Hotel Room"}
                                />
                              </Link>
                            </div>
                            <div className="w-full px-4 flex flex-col space-y-2 relative">
                              <div className="space-y-2">
                                <div className="max-w-[400px] break-words">
                                  <Link to={`/user/onboard/room/${booking._id}`}>
                                    <span className="font-bold underline text-lg select-none line-clamp-1">
                                      {roomDetails?.room_title || "Hotel Room"}
                                    </span>
                                  </Link>
                                  <p className="text-gray-500 text-sm">
                                    {formatLocation(room?.location)}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2 select-none">
                                  <AlertDialog>
                                    <AlertDialogTrigger>
                                      <Button size="sm" variant="outline">
                                        <Diff />
                                        Guests: {totalGuests || 10} (total)
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
                                                  {availability?.adults || 1}
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
                                                  {availability?.children || 1}
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
                                                  {availability?.infants || 1}
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
                                    Check In: {formatDate(booking.booking_date_added)} to{" "}
                                    {formatDate(booking.receipt_record?.receipt_expiration)}
                                  </Button>
                                </div>
                              </div>
                              <div className="py-1 border-slate-300 border-b w-full" />
                              <div className="flex flex-row justify-between items-center select-none">
                                <p>Payment Status: {booking.mode_of_payment || "PAID thru CASH"}</p>
                                <p className="font-bold text-lg">₱{booking.receipt_record?.order_reservation_total || 2000}</p>
                              </div>
                              <div className="absolute top-0 right-0 z-10 select-none flex flex-row space-x-2">
                                <Link to={``}>
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </section>

            {/* Right Side Grid */}
            <section className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start shadow-lg bg-white border rounded-xl p-6">
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">
                    Tell us your experience.
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="">
                      Do you think that our hotel services provide maximum quality
                      assurance?
                    </Label>
                    <Textarea
                      id=""
                      placeholder="Leave a comment"
                      className="h-[200px]"
                      disabled
                    />
                  </div>
                  <div className="pt-2 flex w-full justify-end space-x-2 cursor-not-allowed">
                    <Button className="w-full" disabled>Submit</Button>
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