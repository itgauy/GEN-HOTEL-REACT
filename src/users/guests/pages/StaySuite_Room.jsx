import { Link, useParams } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";
import { Heart } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  startOfDay,
  isBefore,
  format,
  startOfMonth,
  endOfMonth,
  addDays,
} from "date-fns";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CircleMinus, CirclePlus } from "lucide-react";
import useRoomStore from "../stores/rooms.stores";
import { LoaderCircle } from "lucide-react";
import useGuestReserveStore from "../stores/guest-reserve.store";

function StaySuite_User_Room() {
  const { id } = useParams();
  const { selectedRoom, fetchRoomById, loading, error } = useRoomStore();
  const { createReservation } = useGuestReserveStore();

  useEffect(() => {
    fetchRoomById(id);
  }, [id, fetchRoomById]);

// Check slot_availability after selectedRoom updates
  useEffect(() => {
    if (selectedRoom) {
      const isUnavailable = selectedRoom.slot_availability === 0;
      setIsUnavailableDialogOpen(isUnavailable);
      console.log('slot_availability:', selectedRoom.slot_availability, 'isUnavailableDialogOpen:', isUnavailable);
    }
  }, [selectedRoom]);

  const today = startOfDay(new Date());
  const [checkInMain, setCheckInMain] = useState(null);
  const [date] = useState(today);
  const [timeCheckIn, setTimeCheckIn] = useState(null);
  const [checkOutMain, setCheckOutMain] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [reservationStatus, setReservationStatus] = useState(null);
  const [isUnavailableDialogOpen, setIsUnavailableDialogOpen] = useState(false);
  const firstDay = format(startOfMonth(today), "MMMM d");
  const lastDay = format(endOfMonth(today), "MMMM d");

  // Handle guest count changes
  const updateGuests = (type, increment) => {
    setGuests((prev) => {
      const newCount = prev[type] + (increment ? 1 : -1);
      const max = 8;
      return {
        ...prev,
        [type]: Math.max(0, Math.min(newCount, max)),
      };
    });
  };

  // Handle reservation creation
  const handleCreateReservation = async () => {
    try {
      // Get guest ID from localStorage
      const authStorage = JSON.parse(localStorage.getItem('auth-storage'));
      const guestId = authStorage?.state?.user?._id;

      if (!guestId || !checkInMain || !checkOutMain || !selectedRoom) {
        setReservationStatus('Missing required information');
        console.log('Missing required information:', {
          guestId,
          checkInMain,
          checkOutMain,
          selectedRoom
        });
        return;
      }

      const nights = calculateNights();
      const initialPricePerNight = selectedRoom.room_details[0]?.initial_price_per_night || 0;
      const serviceFee = 20;
      const initial_price_total = (initialPricePerNight * nights) + serviceFee;

      const reservationData = {
        room_reservation: id,
        guest_issued_by: guestId,
        reservation_slot: {
          adult: guests.adults,
          children: guests.children,
          infants: guests.infants,
        },
        check_in: new Date(checkInMain).toISOString(),
        check_out: new Date(checkOutMain).toISOString(),
        initial_price_total: Number(initial_price_total)
      };

      console.log('Reservation Data to be sent:', reservationData);

      await createReservation(reservationData);
      setReservationStatus('Reservation created successfully');
      console.log('Reservation created successfully');
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === "You have already reserved this room.") {
        setReservationStatus('You have already reserved this room.');
      } else {
        setReservationStatus('Failed to create reservation');
      }
      console.log('Reservation creation failed:', error);
    }
  };

  const calculateNights = () => {
    if (checkInMain && checkOutMain) {
      const diffTime = checkOutMain.getTime() - checkInMain.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-black" size={32} />
      </div>
    );
  }

  if (error || !selectedRoom) {
    return <p>Error loading room: {error || "Room not found"}</p>;
  }

  // Mock time slots data
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

  return (
    <>
      <AlertDialog open={isUnavailableDialogOpen} onOpenChange={setIsUnavailableDialogOpen}>
        <AlertDialogContent className="border border-slate-200 rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Room Unavailable</AlertDialogTitle>
            <AlertDialogDescription>
              This room is currently fully booked and not available for reservation. Please select another room or try different dates.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <section className="pt-28 pb-24 grid xs:grid-cols-1 lg:grid-cols-12 mx-auto lg:container gap-8">
        <section className="lg:col-span-8 flex flex-col items-start">
          <div className="w-full mb-4">
            <Carousel>
              <CarouselContent className="mb-4 cursor-pointer">
                <PhotoProvider>
                  {selectedRoom.room_details[0]?.room_images.map((image) => (
                    <CarouselItem key={image._id} className="select-none">
                      <PhotoView src={image.media_files[0]?.file_url}>
                        <img
                          src={image.media_files[0]?.file_url}
                          className="aspect-video h-[400px] w-full object-cover rounded-xl"
                          alt={selectedRoom.room_details[0]?.room_title}
                        />
                      </PhotoView>
                    </CarouselItem>
                  ))}
                </PhotoProvider>
              </CarouselContent>
              <CarouselDots className="" />
            </Carousel>
          </div>
          <div className="w-full space-y-2">
            <div id="first-titles" className="mb-8 space-y-2">
              <div
                id="room_title"
                className="leading-snug lg:leading-normal font-bold text-2xl"
              >
                {selectedRoom.room_details[0]?.room_title} in{" "}
                {selectedRoom.location.city}
              </div>
              <div
                id="slot_availability"
                className="leading-snug lg:leading-normal font-thin text-lg text-gray-500"
              >
                {selectedRoom.slot_availability} slots for guests
              </div>
              <div
                id="slot_availability"
                className="leading-snug lg:leading-normal font-thin text-lg text-gray-500"
              >
                Hotel Type: {`(${selectedRoom.hotel_type})`}
              </div>
              <div className="pt-4 border-slate-300 border-b w-full" />
            </div>
            <div id="amentities">
              <span className="block font-semibold text-2xl mb-4">
                What this place offers?
              </span>
              <div className="grid grid-cols-2 gap-6">
                {selectedRoom.room_details[0]?.amenities_offer.map((amenity) => (
                  <div
                    key={amenity._id}
                    className="flex flex-row items-center space-x-4 text-xl"
                  >
                    <div id="icon">
                      <Heart />
                    </div>
                    <div id="amenities">{amenity.amenities_name}</div>
                  </div>
                ))}
              </div>
              <div className="pt-12 border-slate-300 border-b w-full" />
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="space-y-2">
              <span className="block font-semibold text-2xl mb-4">
                {calculateNights()} nights in {selectedRoom.location.city}
              </span>
              <p className="text-gray-500">
                For this place, this is all booking reservations for this month of{" "}
                {firstDay} to {lastDay}
              </p>
            </div>
            <div className="flex xs:flex-col lg:flex-row items-start lg:space-x-4 mt-8">
            </div>
          </div>
        </section>

        <section className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start shadow-lg bg-white border rounded-xl p-6">
          <div className="w-full space-y-4">
            <div id="price_per_night" className="inline-flex items-end space-x-2">
              <span className="font-bold text-2xl">
                ₱{selectedRoom.room_details[0]?.initial_price_per_night}
              </span>
              <p className="text-lg">per night</p>
            </div>

            <Dialog>
              <DialogTrigger className="w-full text-left">
                <div
                  id="booking-process-alert-modal"
                  className="grid grid-cols-1 border border-slate-500 rounded-xl cursor-pointer select-none"
                >
                  <div id="two-way" className="flex items-start flex-row">
                    <div id="check-in" className="w-full p-4">
                      <span className="block uppercase text-[0.65rem] font-bold">Check-in</span>
                      <span className="text-md">{checkInMain ? format(checkInMain, "dd/MM/yyyy") : "DD/MM/YYYY"}</span>
                    </div>
                    <div
                      id="check-out"
                      className="w-full relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[1px] before:bg-slate-500 p-4"
                    >
                      <span className="block uppercase text-[0.65rem] font-bold">Check-out</span>
                      <span className="text-md">{checkOutMain ? format(checkOutMain, "dd/MM/yyyy") : "DD/MM/YYYY"}</span>
                    </div>
                  </div>
                  <div id="one-way" className="border-t border-slate-500 p-4">
                    <div id="guest">
                      <span className="block uppercase text-[0.65rem] font-bold">guests</span>
                      <span className="text-md">
                        {guests.adults + guests.children + guests.infants} guest
                        {guests.adults + guests.children + guests.infants !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-[720px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    Booking Reservation
                  </DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-4">
                  <div className="text-lg">
                    Fill out all essential fields needed.
                  </div>
                  <ScrollArea className="h-[360px] text-black">
                    <div className="space-y-2 mb-4">
                      <span className="block font-semibold text-2xl">
                        Check In / Check Out
                      </span>
                      <p className="text-lg">Specify date.</p>
                    </div>
                    <div className="flex xs:flex-col lg:flex-row items-start lg:space-x-4 mb-4">
                      <div className="rounded-md border">
                        <div className="flex max-sm:flex-col">
                          <Calendar
                            mode="range"
                            selected={{ from: checkInMain, to: checkOutMain }}
                            onSelect={(range) => {
                              if (range) {
                                setCheckInMain(range.from || null);
                                setCheckOutMain(range.to || null);
                              } else {
                                setCheckInMain(null);
                                setCheckOutMain(null);
                              }
                            }}
                            className="lg:w-[250px]"
                            disabled={(date) => isBefore(date, today)}
                            classNames={{
                              day_disabled: "text-muted-foreground opacity-50 line-through",
                            }}
                          />
                          <div className="relative w-full max-sm:h-48 sm:w-40">
                            <div className="absolute inset-0 py-4 max-sm:border-t">
                              <ScrollArea className="h-full sm:border-s">
                                <div className="space-y-3">
                                  <div className="flex h-5 shrink-0 items-center px-5">
                                    <p className="text-sm font-medium">{format(date, "EEEE, d")}</p>
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
                    </div>

                    <div className="space-y-2 mb-4">
                      <span className="block font-semibold text-xl">Guests (Minimum)</span>
                      <p className="text-md">
                        Our minimum for this hotel ({selectedRoom?.room_details[0]?.room_availability.adults} Adults, {selectedRoom?.room_details[0]?.room_availability.children} Children, {selectedRoom?.room_details[0]?.room_availability.infants} Infants)
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-[640px]">
                      <div className="flex flex-row items-center justify-between border rounded-lg border-slate-400 p-4">
                        <div className="">
                          <span className="block font-semibold text-lg">Adults</span>
                          <p>Age 13+</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button
                            id="subtract"
                            className="px-2"
                            variant="outline"
                            onClick={() => updateGuests("adults", false)}
                            disabled={guests.adults <= 0}
                          >
                            <CircleMinus />
                          </Button>
                          <div id="count" className="text-lg">
                            {guests.adults}
                          </div>
                          <Button
                            id="add"
                            className="px-2"
                            variant="outline"
                            onClick={() => updateGuests("adults", true)}
                            disabled={guests.adults >= 8}
                          >
                            <CirclePlus />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-between border rounded-lg border-slate-400 p-4">
                        <div className="">
                          <span className="block font-semibold text-lg">Children</span>
                          <p>Age 2-12</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button
                            id="subtract"
                            className="px-2"
                            variant="outline"
                            onClick={() => updateGuests("children", false)}
                            disabled={guests.children <= 0}
                          >
                            <CircleMinus />
                          </Button>
                          <div id="count" className="text-lg">{guests.children}</div>
                          <Button
                            id="add"
                            className="px-2"
                            variant="outline"
                            onClick={() => updateGuests("children", true)}
                            disabled={guests.children >= 8}
                          >
                            <CirclePlus />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-between border rounded-lg border-slate-400 p-4">
                        <div className="">
                          <span className="block font-semibold text-lg">Infants</span>
                          <p>Under 2</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button
                            id="subtract"
                            className="px-2"
                            variant="outline"
                            onClick={() => updateGuests("infants", false)}
                            disabled={guests.infants <= 0}
                          >
                            <CircleMinus />
                          </Button>
                          <div id="count" className="text-lg">{guests.infants}</div>
                          <Button
                            id="add"
                            className="px-2"
                            variant="outline"
                            onClick={() => updateGuests("infants", true)}
                            disabled={guests.infants >= 8}
                          >
                            <CirclePlus />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogDescription>
              </DialogContent>
            </Dialog>
            {/* Add some validation checks first from slot_availability thing */}
            <Dialog>
              <DialogTrigger className="w-full" disabled={selectedRoom.slot_availability === 0}>
                <Button
                  size="lg"
                  className="w-full select-none"
                  onClick={handleCreateReservation}
                  disabled={selectedRoom.slot_availability === 0}
                >
                  Reserve
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-xl">
                    {reservationStatus || "Reservation Processing"}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    {reservationStatus === 'Reservation created successfully'
                      ? 'Check the Reservations Tab Overview inside the queueing.'
                      : reservationStatus === 'You have already reserved this room.'
                        ? 'You have already reserved this room. Please check your existing reservations or select a different room.'
                        : 'Please verify all information and try again.'}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <div id="calculation" className="space-y-3 select-none">
              <div
                id="row"
                className="w-full flex items-start flex-row justify-between"
              >
                <span className="underline cursor-pointer">
                  ₱{selectedRoom.room_details[0]?.initial_price_per_night.toLocaleString()} x {calculateNights()} night{calculateNights() !== 1 ? "s" : ""}
                </span>
                <span>
                  ₱{(selectedRoom.room_details[0]?.initial_price_per_night * calculateNights()).toLocaleString()}
                </span>
              </div>
              <div
                id="row"
                className="w-full flex items-start flex-row justify-between"
              >
                <span className="underline cursor-pointer">Service fee</span>
                <span>₱{20}</span>
              </div>
              <div className="py-2 border-slate-300 border-b w-full" />
              <div
                id="row"
                className="w-full flex items-start flex-row justify-between text-lg font-bold"
              >
                <span>Total</span>
                <span>₱{(selectedRoom.room_details[0]?.initial_price_per_night * calculateNights() + 20).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>

  );
}

export default StaySuite_User_Room;