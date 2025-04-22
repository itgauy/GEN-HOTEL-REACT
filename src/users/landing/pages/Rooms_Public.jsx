import { Link } from "react-router-dom";
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
} from "date-fns";
import { useState } from "react";
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

function StaySuite_Rooms_Public() {
  const today = startOfDay(new Date());
  // State for the main calendar
  const [checkInMain, setCheckInMain] = useState(null);
  const [checkOutMain, setCheckOutMain] = useState(null);

  // State for the modal/dialog calendar
  const [checkInModal, setCheckInModal] = useState(null);
  const [checkOutModal, setCheckOutModal] = useState(null);
  const [date, setDate] = useState(today);
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

  const firstDay = format(startOfMonth(today), "MMMM d");
  const lastDay = format(endOfMonth(today), "MMMM d");

  return (
    // Left Side Grid

    <section className="pt-28 pb-24 grid xs:grid-cols-1 lg:grid-cols-12 mx-auto lg:container gap-8">
      <section className="lg:col-span-8 flex flex-col items-start">
        <div className="w-full mb-4">
          <Carousel>
            <CarouselContent className="mb-4 cursor-pointer">
              <PhotoProvider>
                <CarouselItem className="select-none">
                  <PhotoView src="https://qby900ozue.ufs.sh/f/k3CYx7aMjR9Sfse57vxE0UWKPRCnJ1H7ZBq8MNGFfriLpXwj">
                    <img
                      src="https://qby900ozue.ufs.sh/f/k3CYx7aMjR9Sfse57vxE0UWKPRCnJ1H7ZBq8MNGFfriLpXwj"
                      className="aspect-video rounded-xl"
                      alt=""
                    />
                  </PhotoView>
                </CarouselItem>
                <CarouselItem className="select-none">
                  <PhotoView src="https://qby900ozue.ufs.sh/f/k3CYx7aMjR9Sfse57vxE0UWKPRCnJ1H7ZBq8MNGFfriLpXwj">
                    <img
                      src="https://qby900ozue.ufs.sh/f/k3CYx7aMjR9Sfse57vxE0UWKPRCnJ1H7ZBq8MNGFfriLpXwj"
                      className="aspect-video rounded-xl"
                      alt=""
                    />
                  </PhotoView>
                </CarouselItem>
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
              Hotel room in {"<location>"}
            </div>
            <div
              id="slot_availability"
              className="leading-snug lg:leading-normal font-thin text-lg text-gray-500"
            >
              15 slots for guests.
            </div>
            <div className="pt-4 border-slate-300 border-b w-full" />
          </div>
          <div id="amentities">
            <span className="block font-semibold text-2xl mb-4">
              What this place offers?
            </span>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-row items-center space-x-4 text-xl">
                <div id="icon">
                  <Heart />
                </div>
                <div id="amenities">Amenities name</div>
              </div>
              <div className="flex flex-row items-center space-x-4 text-xl">
                <div id="icon">
                  <Heart />
                </div>
                <div id="amenities">Amenities name</div>
              </div>
              <div className="flex flex-row items-center space-x-4 text-xl">
                <div id="icon">
                  <Heart />
                </div>
                <div id="amenities">Amenities name</div>
              </div>
              <div className="flex flex-row items-center space-x-4 text-xl">
                <div id="icon">
                  <Heart />
                </div>
                <div id="amenities">Amenities name</div>
              </div>
            </div>
            <div className="pt-12 border-slate-300 border-b w-full" />
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <div className="space-y-2">
            <span className="block font-semibold text-2xl mb-4">
              0 nights in {"<location>"}
            </span>
            <p className="text-gray-500">
              For this place, this is all booking reservations for this month of{" "}
              {firstDay} to {lastDay}
            </p>
          </div>
          <div className="flex xs:flex-col lg:flex-row items-start lg:space-x-4 mt-8">
            {/* Check In Calendar */}
            <Calendar
              mode="range"
              selected={checkInMain}
              onSelect={(date) => {
                if (date) {
                  setCheckInMain(date);
                  setCheckOutMain(null);
                }
              }}
              className="rounded-md border border-slate-300 lg:w-[360px]"
              day="lg:w-12 lg:h-10"
              disabled={(date) => isBefore(date, today)}
              classNames={{
                day_disabled: "text-muted-foreground opacity-50 line-through",
              }}
            />
          </div>
        </div>
      </section>

      {/* Right Side Grid */}

      <section className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start shadow-lg bg-white border rounded-xl p-6">
        <div className="w-full space-y-4">
          <div id="price_per_night" className="inline-flex items-end space-x-2">
            <span className="font-bold text-2xl">₱10000</span>
            <p className="text-lg">per night</p>
          </div>

          {/* Dialog Trigger for Booking */}

          <Dialog>
            <DialogTrigger className="w-full text-left">
              <div
                id="booking-process-alert-modal"
                className="grid grid-cols-1 border border-slate-500 rounded-xl cursor-pointer select-none"
              >
                <div id="two-way" className="flex items-start flex-row">
                  <div id="check-in" className="w-full p-4">
                    <span className="block uppercase text-[0.65rem] font-bold">
                      Check-in
                    </span>
                    <span className="text-md">DD/MM/YYYY</span>{" "}
                    {/* Changed p to span */}
                  </div>
                  <div
                    id="check-out"
                    className="w-full relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[1px] before:bg-slate-500 p-4"
                  >
                    <span className="block uppercase text-[0.65rem] font-bold">
                      Check-out
                    </span>
                    <span className="text-md">DD/MM/YYYY</span>{" "}
                    {/* Changed p to span */}
                  </div>
                </div>
                <div id="one-way" className="border-t border-slate-500 p-4">
                  <div id="guest">
                    <span className="block uppercase text-[0.65rem] font-bold">
                      guests
                    </span>
                    <span className="text-md">0 guest</span>{" "}
                    {/* Changed p to span */}
                  </div>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="max-w-[720px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Booking Reservation
                </DialogTitle>
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
                      {/* Check In Calendar */}
                      <div className="rounded-md border">
                        <div className="flex max-sm:flex-col">
                          {/* Calendar Selection */}

                          <Calendar
                            mode="range"
                            selected={checkInMain}
                            onSelect={(date) => {
                              if (date) {
                                setCheckInMain(date);
                                setCheckOutMain(null);
                              }
                            }}
                            className="lg:w-[250px]"
                            disabled={(date) => isBefore(date, today)}
                            classNames={{
                              day_disabled: "text-muted-foreground opacity-50 line-through",
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
                                      ({ time: timeSlot, available }) => {
                                        const dateObj = new Date(timeSlot);
                                        const formattedTime =
                                          dateObj.toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                          });

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

                      {/* Check Out Calendar */}

                    </div>
                    <div className="space-y-2 mb-4">
                      <span className="block font-semibold text-2xl">
                        Guests
                      </span>
                      <p className="text-lg">Specify only required.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-[640px]">
                      <div className="flex flex-row items-center justify-between border rounded-lg border-slate-400 p-4">
                        <div className="">
                          <span className="block font-semibold text-lg">
                            Adults
                          </span>
                          <p>Age 13+</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button id="add" className="px-2" variant="outline">
                            <CircleMinus />
                          </Button>
                          <div id="count" className="text-lg">
                            1
                          </div>
                          <Button id="add" className="px-2" variant="outline">
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
                          <Button id="add" className="px-2" variant="outline">
                            <CircleMinus />
                          </Button>
                          <div id="count" className="text-lg">
                            1
                          </div>
                          <Button id="add" className="px-2" variant="outline">
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
                          <Button id="add" className="px-2" variant="outline">
                            <CircleMinus />
                          </Button>
                          <div id="count" className="text-lg">
                            1
                          </div>
                          <Button id="add" className="px-2" variant="outline">
                            <CirclePlus />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger className="w-full" disabled>
              <div id="reserve">
                <Button size="lg" className="w-full select-none" disabled>
                  Reserve
                </Button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl">
                  Login required.
                </AlertDialogTitle>
                <AlertDialogDescription className="text-md">
                  In order for you to issue booking reservation for this place,
                  you must login first. Enjoy!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Login</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div id="calculation" className="space-y-3 select-none">
            <div
              id="row"
              className="w-full flex items-start flex-row justify-between"
            >
              <span className="underline cursor-pointer">
                ₱10,000 x 1 nights
              </span>
              <span>₱10,000</span>
            </div>
            <div
              id="row"
              className="w-full flex items-start flex-row justify-between"
            >
              <span className="underline cursor-pointer">Service fee</span>
              <span>₱1000</span>
            </div>
            <div className="py-2 border-slate-300 border-b w-full" />
            <div
              id="row"
              className="w-full flex items-start flex-row justify-between text-lg font-bold"
            >
              <span>Total</span>
              <span>₱11000</span>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default StaySuite_Rooms_Public;