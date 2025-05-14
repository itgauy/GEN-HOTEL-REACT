import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X,
  Diff,
  Puzzle,
  Smile,
  CircleMinus,
  CirclePlus,
  Trash,
  UsersRoundIcon,
  InfoIcon,
  AlertCircle,
  CheckIcon,
  LoaderCircle
} from "lucide-react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { useState, useEffect } from "react";
import useGuestReserveStore from "../../stores/guest-reserve.store";
import useGuestBookStore from "../../stores/guest-book.store";
import Cookies from "js-cookie"; // Import js-cookie

function StaySuite_User_Booking_Queues() {
  const { reservations, loading, error, fetchReservationsId, updateReservation, deleteReservation, createReservation, revalidateReservations } = useGuestReserveStore();
  const { createGuestBook, guestBook, fetchGuestBook } = useGuestBookStore();
  const navigate = useNavigate();
  const today = startOfDay(new Date());
  const [checkInMain, setCheckInMain] = useState({
    from: today,
    to: addDays(today, 1),
  });
  const [checkInModal, setCheckInModal] = useState(null);
  const [checkOutModal, setCheckOutModal] = useState(null);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [editingReservationId, setEditingReservationId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestCounts, setGuestCounts] = useState({
    adult: 0,
    children: 0,
    infants: 0,
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [showImportantFacts, setShowImportantFacts] = useState(!Cookies.get("hideBookingQueueImportantFacts")); // Check cookie on load

  // Retrieve user data from localStorage
  const authStorage = localStorage.getItem('auth-storage');
  const user = authStorage ? JSON.parse(authStorage).state?.user : {};
  const emailAddress = user?.email_address || "";
  const userId = user?._id || "";

  // Calculate total price from reservations
  const orderReservationTotal = reservations.reduce(
    (sum, reservation) => sum + (reservation.initial_price_total || 0),
    0
  );

  // Helper to check if a time slot is in the selected range
  const isInRange = (timeSlot) => {
    if (!startTime || !endTime) return false;
    const slotTime = new Date(timeSlot).getTime();
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const minTime = Math.min(start, end);
    const maxTime = Math.max(start, end);
    return slotTime > minTime && slotTime < maxTime;
  };

  // Handle closing the Important Facts message and setting the cookie
  const handleCloseImportantFacts = () => {
    setShowImportantFacts(false);
    Cookies.set("hideBookingQueueImportantFacts", "true", { expires: 7 }); // Set cookie to expire in 7 days
  };

  // Fetch and revalidate reservations on component mount
  useEffect(() => {
    if (userId) {
      fetchReservationsId(userId).then(() => {
        revalidateReservations();
      });
    }
  }, [fetchReservationsId, revalidateReservations, userId]);

  // Handle form submission for updating reservation dates
  const handleUpdateReservation = async (reservationId) => {
    if (!checkInModal?.from || !checkInModal?.to || !startTime || !endTime) {
      alert("Please select check-in date, check-out date, start time, and end time.");
      return;
    }

    const checkInDate = new Date(checkInModal.from);
    const checkOutDate = new Date(checkInModal.to);
    const startTimeParts = new Date(startTime).toISOString().split('T')[1];
    const endTimeParts = new Date(endTime).toISOString().split('T')[1];

    const updatedReservation = {
      check_in: new Date(`${format(checkInDate, "yyyy-MM-dd")}T${startTimeParts}`),
      check_out: new Date(`${format(checkOutDate, "yyyy-MM-dd")}T${endTimeParts}`),
    };

    try {
      await updateReservation(reservationId, updatedReservation);
      alert("Reservation updated successfully!");
      localStorage.removeItem("guest-reserve-storage");
      setStartTime(null);
      setEndTime(null);
      setCheckInModal(null);
      window.location.reload();
    } catch (err) {
      alert("Failed to update reservation.");
    }
  };

  // Handle form submission for updating guest counts
  const handleUpdateGuests = async (reservationId) => {
    if (guestCounts.adult < 1) {
      alert("At least one adult is required.");
      return;
    }

    const updatedReservation = {
      reservation_slot: {
        adult: guestCounts.adult,
        children: guestCounts.children,
        infants: guestCounts.infants,
      },
    };

    try {
      await updateReservation(reservationId, updatedReservation);
      alert("Guest counts updated successfully!");
      setEditingReservationId(null);
      setGuestCounts({ adult: 0, children: 0, infants: 0 });
      window.location.reload();
    } catch (err) {
      alert("Failed to update guest counts.");
    }
  };

  const handleCreateReservation = async () => {
    setIsSubmitting(true);

    try {
      if (!firstName || !lastName) {
        alert("Please provide first name and last name.");
        return;
      }

      if (reservations.length === 0) {
        alert("No reservations to submit.");
        return;
      }

      const reservationRoomIds = reservations
        .map((reservation) => reservation.room_reservation?._id)
        .filter((id) => id);

      if (reservationRoomIds.length === 0) {
        alert("No valid room reservations found.");
        return;
      }

      const newGuestBook = {
        reservation_room: reservationRoomIds,
        booking_issued_by: userId,
        contact_information: {
          email_address: emailAddress,
          contact_first_name: firstName,
          contact_last_name: lastName,
          ...(suffix && { contact_suffix: suffix }),
        },
        mode_of_payment: "Pay thru Counter",
        receipt_record: {
          order_reservation_total: orderReservationTotal,
        },
      };

      console.log("Form Submission Payload:", JSON.stringify(newGuestBook, null, 2));

      await createGuestBook(newGuestBook);

      alert("Guest book entry created successfully!");
      setFirstName("");
      setLastName("");
      setSuffix("");
      console.log("Guest book entry created successfully with payload:", newGuestBook);

      window.location.href = "/user/onboard/bookings/result";
    } catch (err) {
      console.error("Error during guest book creation:", err);
      alert("Failed to create guest book entry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle deletion of reservation
  const handleDeleteReservation = async (reservationId) => {
    try {
      await deleteReservation(reservationId);
      alert("Reservation deleted successfully!");
      window.location.reload();
    } catch (err) {
      alert("Failed to delete reservation.");
    }
  };

  const timeSlots = [
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

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full py-8">
        <LoaderCircle className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <section className="pb-24 grid xs:grid-cols-1 lg:grid-cols-12 mx-auto lg:container gap-6">
      <section className="lg:col-span-7 flex flex-col items-start space-y-4">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-2xl">Queueing</span>
          <Badge className="rounded-full">{reservations.length} Items</Badge>
        </div>
        <div className="flex flex-col w-full gap-4">
          {showImportantFacts && (
            <div className="border border-orange-400 bg-orange-50 p-4 rounded-xl w-full">
              <div className="flex items-center flex-row w-full justify-between relative">
                <div className="flex flex-row items-start space-x-2">
                  <div className="rounded-full bg-orange-200 p-2">
                    <AlertCircle size={20} className="text-orange-600" />
                  </div>
                  <div className="inline-flex flex-col w-full">
                    <span className="font-bold text-orange-700">Important Facts</span>
                    <p className="text-sm">Please review these key details before confirming your reservation:</p>
                    <div className="mt-4 pt-3 border-t border-orange-300">
                      <span className="font-bold text-orange-700">Terms & Conditions</span>
                      <ul className="mt-2 text-sm list-disc pl-5 text-orange-700">
                        <li><strong>Payment Policy:</strong> All payments must be made at the counter. Guests must present invoice receipt upon payment.</li>
                        <li><strong>Check-in Process:</strong> Valid ID required for all guests. Credit card or cash deposit required for incidentals.</li>
                        <li><strong>Check-out Process:</strong> Room inspection required before final checkout. All room keys must be returned to the front desk.</li>
                        <li><strong>Early Check-in/Late Check-out:</strong> Subject to availability and may incur additional charges.</li>
                        <li><strong>Damage Policy:</strong> Guests will be held responsible for any damage to hotel property.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleCloseImportantFacts}
                  className="absolute top-0 right-0"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          <ScrollArea className="h-[400px] border border-slate-200 bg-gray-100 rounded-xl p-2">
            <div className="grid grid-cols-1 gap-4">
              {reservations.map((reservation) => (
                <div key={reservation._id} className="border border-slate-300 bg-white p-3 rounded-xl flex flex-row items-start w-full">
                  {reservation.room_reservation?.room_details?.map((room, index) => (
                    <div key={index} className="rounded-xl overflow-hidden select-none">
                      {room.room_images?.length > 0 && room.room_images[0]?.media_files?.length > 0 && (
                        <Link to={`/user/onboard/room/${reservation.room_reservation._id}`}>
                          <img
                            src={room.room_images[0].media_files[0].file_url}
                            className="aspect-video object-cover w-[9.575rem] h-[9.575rem]"
                            alt={room.room_title || "Room Image"}
                          />
                        </Link>
                      )}
                    </div>
                  ))}
                  <div className="w-full px-4 flex flex-col space-y-2 relative">
                    <div className="space-y-2">
                      {reservation.room_reservation?.room_details?.map((room, index) => (
                        <div key={index} className="max-w-[450px] break-words">
                          <Link to={`/user/onboard/room/${reservation.room_reservation._id}`}>
                            <span className="font-bold underline text-lg select-none line-clamp-1">
                              {room.room_title || "Unknown Room"}
                            </span>
                          </Link>
                          <p className="text-gray-500 text-sm">
                            Location: {"Brgy. " + (reservation.room_reservation.location?.brgy || "Unknown") + ", " + (reservation.room_reservation.location?.city || "Unknown") + ", " + (reservation.room_reservation.location?.province || "Unknown")}
                          </p>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2 select-none">
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button size="sm" variant="outline">
                              <CalendarIcon />
                              Check In: {format(new Date(reservation.check_in), "MMM d, yyyy (h:mm a)")} to {format(new Date(reservation.check_out), "MMM d, yyyy (h:mm a)")}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Update Data (Check In / Check Out)
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription className="space-y-4">
                              <div className="flex flex-col items-start mb-4">
                                <div className="rounded-md border">
                                  <div className="flex max-sm:flex-col">
                                    <CalendarUI
                                      mode="range"
                                      selected={checkInModal}
                                      onSelect={(date) => {
                                        if (date) {
                                          setCheckInModal(date);
                                          setCheckOutModal(null);
                                        }
                                      }}
                                      className="lg:w-[250px]"
                                      disabled={(date) => isBefore(date, today)}
                                      classNames={{
                                        day_disabled:
                                          "text-muted-foreground opacity-50 line-through",
                                      }}
                                    />
                                    <div className="relative w-full max-sm:h-48 sm:w-40">
                                      <div className="absolute inset-0 py-4 max-sm:border-t">
                                        <ScrollArea className="h-full sm:border-s">
                                          <div className="space-y-3">
                                            <div className="flex h-5 shrink-0 items-center px-5">
                                              <p className="text-sm font-medium">
                                                {date ? format(date, "EEEE, d") : "Select a date"}
                                              </p>
                                            </div>
                                            <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                                              {timeSlots.map(({ time: timeSlot, available }) => {
                                                const dateObj = new Date(timeSlot);
                                                const formattedTime = dateObj.toLocaleTimeString("en-US", {
                                                  hour: "numeric",
                                                  minute: "2-digit",
                                                  hour12: true,
                                                });
                                                return (
                                                  <Button
                                                    key={timeSlot}
                                                    variant={
                                                      timeSlot === startTime || timeSlot === endTime
                                                        ? "default"
                                                        : isInRange(timeSlot)
                                                          ? "range"
                                                          : "outline"
                                                    }
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={() => {
                                                      if (!startTime) {
                                                        setStartTime(timeSlot);
                                                      } else if (!endTime) {
                                                        setEndTime(timeSlot);
                                                      } else {
                                                        setStartTime(timeSlot);
                                                        setEndTime(null);
                                                      }
                                                    }}
                                                    disabled={!available}
                                                  >
                                                    {formattedTime}
                                                  </Button>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        </ScrollArea>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-md mt-4 text-black">
                                  Specified Date: {checkInModal?.from ? format(new Date(checkInModal.from), "MMM d, yyyy") : "Select check-in"} to {checkInModal?.to ? format(new Date(checkInModal.to), "MMM d, yyyy") : "Select check-out"}
                                  <br />
                                  Check-In Time: {startTime ? format(new Date(startTime), "h:mm a") : "Select start time"}
                                  <br />
                                  Check-Out Time: {endTime ? format(new Date(endTime), "h:mm a") : "Select end time"}
                                </div>
                              </div>
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleUpdateReservation(reservation._id)}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <div className="py-1 border-slate-300 border-b w-full" />
                    <div className="flex flex-row justify-between items-center select-none">
                      <AlertDialog>
                        <AlertDialogTrigger
                          onClick={() => {
                            setEditingReservationId(reservation._id);
                            setGuestCounts({
                              adult: reservation.reservation_slot?.adult || 0,
                              children: reservation.reservation_slot?.children || 0,
                              infants: reservation.reservation_slot?.infants || 0,
                            });
                          }}
                        >
                          <Button size="sm" variant="outline">
                            <Diff />
                            Guests: {(reservation.reservation_slot?.adult || 0) + (reservation.reservation_slot?.children || 0) + (reservation.reservation_slot?.infants || 0)} (total)
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Update Data (Guests)
                            </AlertDialogTitle>
                          </AlertDialogHeader>
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
                                    id="subtract-adult"
                                    onClick={() => setGuestCounts(prev => ({
                                      ...prev,
                                      adult: Math.max(1, prev.adult - 1),
                                    }))}
                                  >
                                    <CircleMinus />
                                  </Button>
                                  <div id="count-adult" className="text-lg">
                                    {guestCounts.adult}
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    id="add-adult"
                                    onClick={() => setGuestCounts(prev => ({
                                      ...prev,
                                      adult: prev.adult + 1,
                                    }))}
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
                                    id="subtract-children"
                                    onClick={() => setGuestCounts(prev => ({
                                      ...prev,
                                      children: Math.max(0, prev.children - 1),
                                    }))}
                                  >
                                    <CircleMinus />
                                  </Button>
                                  <div id="count-children" className="text-lg">
                                    {guestCounts.children}
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    id="add-children"
                                    onClick={() => setGuestCounts(prev => ({
                                      ...prev,
                                      children: prev.children + 1,
                                    }))}
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
                                    id="subtract-infants"
                                    onClick={() => setGuestCounts(prev => ({
                                      ...prev,
                                      infants: Math.max(0, prev.infants - 1),
                                    }))}
                                  >
                                    <CircleMinus />
                                  </Button>
                                  <div id="count-infants" className="text-lg">
                                    {guestCounts.infants}
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    id="add-infants"
                                    onClick={() => setGuestCounts(prev => ({
                                      ...prev,
                                      infants: prev.infants + 1,
                                    }))}
                                  >
                                    <CirclePlus />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </AlertDialogDescription>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setEditingReservationId(null)}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleUpdateGuests(reservation._id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <p className="font-bold text-lg">₱{reservation.initial_price_total || 0}</p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          size="icon"
                          className="absolute top-0 right-0 z-10 select-none"
                        >
                          <Trash />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="gap-2">
                        <AlertDialogTitle className="text-xl">
                          Confirm
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-md">
                          This action cannot be undone.
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteReservation(reservation._id)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>

      <section className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start shadow-lg bg-white border rounded-xl p-6">
        <div className="w-full space-y-4">
          <Tabs defaultValue="cash">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cash">Pay thru Cash</TabsTrigger>
              <TabsTrigger
                className="cursor-not-allowed"
                value="paypal"
                disabled
              >
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
                      value={emailAddress}
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
                    <Input
                      id="firstName"
                      placeholder="Provide here.."
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Provide here.."
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="suffix">Suffix (optional)</Label>
                    <Select value={suffix} onValueChange={setSuffix}>
                      <SelectTrigger id="suffix">
                        <SelectValue placeholder="Suffix" />
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
                    <span>₱20.00</span>
                  </div>
                  <div className="flex justify-between font-medium mt-4 pt-4 border-t">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg">₱{orderReservationTotal.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <AlertDialog>
                <AlertDialogTrigger className="w-full">
                  <Button className="w-full">Proceed</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl">Confirm Action</AlertDialogTitle>
                    <AlertDialogDescription className="text-base">
                      This action cannot be undone. This will proceed to initially mark as booking reservation.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    {isSubmitting ? (
                      <div className="w-full flex justify-center py-2">
                        <LoaderCircle className="h-5 w-5 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      <>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCreateReservation}>Continue</AlertDialogAction>
                      </>
                    )}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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