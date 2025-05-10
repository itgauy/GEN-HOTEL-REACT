import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Info,
  LoaderCircle,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from "motion/react";
import useBookingStore from "../stores/booking.stores";

// Utility to format dates
const formatDate = (dateString) => {
  if (!dateString) return "Unknown";
  try {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "Invalid Date";
  }
};

function Reservation_UpdateData() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { booking, fetchBookingById, bookingUpdate, loading, error, alert, clearAlert } = useBookingStore();

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
  };

  const [bookingData, setBookingData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("UNPAID");

  // Fetch booking data on mount
  useEffect(() => {
    console.log("Reservation_UpdateData: Fetching booking for ID", id);
    fetchBookingById(id);
  }, [id, fetchBookingById]);

  // Update local state when booking data is fetched
  useEffect(() => {
    if (booking) {
      console.log("Reservation_UpdateData: Booking data updated", booking);
      setBookingData({
        issuedBy: booking.booking_issued_by?.guest_name
          ? `${booking.booking_issued_by.guest_name.firstName} ${booking.booking_issued_by.guest_name.lastName}`
          : "Unknown",
        bookingDate: booking.booking_date_added || null,
        hotel_type: booking.reservation_room?.[0]?.hotel_type || "Unidentified",
        slot_availability: booking.reservation_room?.[0]?.slot_availability || 0,
        adults: booking.reservation_room?.[0]?.room_details?.[0]?.room_availability?.adults || 0,
        children: booking.reservation_room?.[0]?.room_details?.[0]?.room_availability?.children || 0,
        infants: booking.reservation_room?.[0]?.room_details?.[0]?.room_availability?.infants || 0,
        room_title: booking.reservation_room?.[0]?.room_details?.[0]?.room_title || "",
        street: booking.reservation_room?.[0]?.location?.street || "",
        subdivision_village: booking.reservation_room?.[0]?.location?.subdivision_village || "",
        brgy: booking.reservation_room?.[0]?.location?.brgy || "",
        city: booking.reservation_room?.[0]?.location?.city || "",
        province: booking.reservation_room?.[0]?.location?.province || "",
        postalcode: booking.reservation_room?.[0]?.location?.postalcode?.toString() || "",
        email: booking.contact_information?.email_address || "",
        contactFirstName: booking.contact_information?.contact_first_name || "",
        contactLastName: booking.contact_information?.contact_last_name || "",
        modeOfPayment: booking.mode_of_payment || "",
        payment_status: booking.payment_status || "UNPAID",
      });
      setPaymentStatus(booking.payment_status || "UNPAID");
    }
  }, [booking]);

  // Handle payment status change
  const handlePaymentStatusChange = (value) => {
    console.log("Reservation_UpdateData: Payment status changed to", value);
    setPaymentStatus(value);
  };

  // Handle Proceed button click to update payment status and handled_by
  const handleProceed = async () => {
    try {
      console.log("Reservation_UpdateData: Proceeding with update", { paymentStatus, id });

      // Retrieve auth-storage from localStorage
      const authStorage = localStorage.getItem("auth-storage");
      let handledById = null;

      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          handledById = authData?.state?.user?._id;
          if (!handledById) {
            console.error("Reservation_UpdateData: No _id found in auth-storage");
            throw new Error("User ID not found in auth-storage");
          }
        } catch (error) {
          console.error("Reservation_UpdateData: Error parsing auth-storage", error);
          throw new Error("Invalid auth-storage data");
        }
      } else {
        console.error("Reservation_UpdateData: auth-storage not found in localStorage");
        throw new Error("Authentication data not found");
      }

      // Construct the request body
      const requestBody = {
        payment_status: paymentStatus,
        handled_by: handledById,
        email_address: bookingData.email,
      };

      console.log("Reservation_UpdateData: Sending update request with body", requestBody);

      // Send the update request
      await bookingUpdate(id, requestBody);
    } catch (error) {
      console.error("Reservation_UpdateData: Error in handleProceed", error);
      // Optionally, update the store to show an error alert
      useBookingStore.setState({
        alert: {
          show: true,
          type: "error",
          message: error.message || "Failed to update booking",
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-black" size={32} />
        {console.log("Reservation_UpdateData: Rendering loading state")}
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <img
          src="/anubis-mascot.png"
          alt="No data"
          className="w-48 h-48 object-contain"
        />
        <p className="text-gray-500">{error || "No booking data available"}</p>
        {console.log("Reservation_UpdateData: Rendering error state", error)}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="update-booking"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        id="welcome-page"
      >
        <section id="welcome-page">
          <div className="flex items-center justify-between border-b border-gray-300 p-4">
            <div className="flex items-center gap-4">
              <div
                className="bg-slate-100/80 h-9 w-9 inline-flex items-center justify-center rounded-lg cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-6 w-6" />
              </div>
              <span className="text-lg font-medium">
                Booking Reservation (Manage)
              </span>
            </div>
            <Button
              className="bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-2"
              onClick={handleProceed}
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" size={16} />
              ) : (
                "Proceed"
              )}
            </Button>
          </div>
          <div className="flex flex-row h-full bg-gray-100">
            <ScrollArea className="flex-1 border border-gray-300 bg-white h-[calc(100vh-120px)] rounded-md mx-6 mt-6 mb-6 p-4">
              <Card className="space-y-2 rounded-none border-none bg-none shadow-none">
                <CardHeader className="p-2">
                  <CardTitle className="text-2xl underline">
                    Booking Information
                  </CardTitle>
                  <CardDescription>
                    Review the booking details below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="space-y-4">
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="issued-by" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Booking Issued By
                        </span>
                      </label>
                      <Input
                        id="issued-by"
                        type="text"
                        value={bookingData.issuedBy}
                        disabled
                      />
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="booking-date" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Booking Date Added
                        </span>
                      </label>
                      <Input
                        id="booking-date"
                        type="text"
                        value={formatDate(bookingData.bookingDate)}
                        disabled
                      />
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="room-type" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Room Type
                        </span>
                      </label>
                      <Input
                        id="room-type"
                        type="text"
                        value={bookingData.hotel_type}
                        disabled
                      />
                    </div>
                    <div id="sub-header" className="space-y-2">
                      <h1 className="font-bold text-xl tracking-tight">
                        Availability
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        Provide minimum area spaces that this hotel stay vacation offers
                      </p>
                    </div>
                    <div className="border border-slate-300 rounded-lg grid grid-cols-4 gap-4 items-center">
                      <div className="space-y-2 border-r border-slate-300 p-4">
                        <Label className="text-foreground text-sm font-medium">
                          Slots Availability
                        </Label>
                        <div className="border-input relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-focus-within:ring-[3px]">
                          <Button
                            type="button"
                            size="icon"
                            disabled
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <MinusIcon size={16} aria-hidden="true" />
                          </Button>
                          <Input
                            className="bg-background text-foreground w-full grow px-3 py-2 text-center rounded-none"
                            value={bookingData.slot_availability}
                            readOnly
                            disabled
                          />
                          <Button
                            type="button"
                            size="icon"
                            disabled
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <PlusIcon size={16} aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground text-sm font-medium">
                          Adults
                        </Label>
                        <div className="border-input relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-focus-within:ring-[3px]">
                          <Button
                            type="button"
                            size="icon"
                            disabled
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <MinusIcon size={16} aria-hidden="true" />
                          </Button>
                          <Input
                            className="bg-background text-foreground w-full grow px-3 py-2 text-center rounded-none"
                            value={bookingData.adults}
                            readOnly
                            disabled
                          />
                          <Button
                            type="button"
                            size="icon"
                            disabled
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <PlusIcon size={16} aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground text-sm font-medium">
                          Children
                        </Label>
                        <div className="border-input relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-focus-within:ring-[3px]">
                          <Button
                            type="button"
                            size="icon"
                            disabled
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <MinusIcon size={16} aria-hidden="true" />
                          </Button>
                          <Input
                            className="bg-background text-foreground w-full grow px-3 py-2 text-center rounded-none"
                            value={bookingData.children}
                            readOnly
                            disabled
                          />
                          <Button
                            type="button"
                            size="icon"
                            disabled
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <PlusIcon size={16} aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2 pr-4">
                        <Label className="text-foreground text-sm font-medium">
                          Infants
                        </Label>
                        <div className="border-input relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-focus-within:ring-[3px]">
                          <Button
                            type="button"
                            size="icon"
                            disabled
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <MinusIcon size={16} aria-hidden="true" />
                          </Button>
                          <Input
                            className="bg-background text-foreground w-full grow px-3 py-2 text-center rounded-none"
                            value={bookingData.infants}
                            readOnly
                            disabled
                          />
                          <Button
                            type="button"
                            size="icon"
                            disabled
                            className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <PlusIcon size={16} aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div id="sub-header" className="space-y-2">
                      <h1 className="font-bold text-xl tracking-tight">
                        Room Details
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        Important details within stay vacation or room presents here.
                      </p>
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="room-title" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Title
                        </span>
                      </label>
                      <Input
                        id="room-title"
                        type="text"
                        value={bookingData.room_title}
                        disabled
                      />
                    </div>
                    <div id="sub-header" className="space-y-2">
                      <h1 className="font-bold text-xl tracking-tight">
                        Location (Full Address)
                      </h1>
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="street" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Street
                        </span>
                      </label>
                      <Input
                        id="street"
                        type="text"
                        value={bookingData.street}
                        disabled
                      />
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="subdivision-village" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Subdivision / Village (if necessary)
                        </span>
                      </label>
                      <Input
                        id="subdivision-village"
                        type="text"
                        value={bookingData.subdivision_village}
                        disabled
                      />
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="brgy" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Barangay
                        </span>
                      </label>
                      <Input
                        id="brgy"
                        type="text"
                        value={bookingData.brgy}
                        disabled
                      />
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="city" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          City
                        </span>
                      </label>
                      <Input
                        id="city"
                        type="text"
                        value={bookingData.city}
                        disabled
                      />
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="province" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Province
                        </span>
                      </label>
                      <Input
                        id="province"
                        type="text"
                        value={bookingData.province}
                        disabled
                      />
                    </div>
                    <div className="w-full space-y-2 relative">
                      <label htmlFor="postalcode" className="-ml-2">
                        <span className="bg-background inline-flex px-2">
                          Postal / Zip code
                        </span>
                      </label>
                      <Input
                        id="postalcode"
                        type="text"
                        value={bookingData.postalcode}
                        disabled
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollArea>
            <div className="w-[400px] border-l bg-white border-gray-300 flex flex-col">
              <div className="flex items-start flex-col p-6 space-y-4">
                <div className="font-bold tracking-tight text-lg">
                  Booking Details
                </div>
                <div className="w-full space-y-2 relative">
                  <label htmlFor="email" className="-ml-2">
                    <span className="bg-background inline-flex px-2">
                      Email Address
                    </span>
                  </label>
                  <Input
                    id="email"
                    type="text"
                    value={bookingData.email}
                    disabled
                  />
                </div>
                <div className="w-full space-y-2 relative">
                  <label htmlFor="contact-first-name" className="-ml-2">
                    <span className="bg-background inline-flex px-2">
                      Contact First Name
                    </span>
                  </label>
                  <Input
                    id="contact-first-name"
                    type="text"
                    value={bookingData.contactFirstName}
                    disabled
                  />
                </div>
                <div className="w-full space-y-2 relative">
                  <label htmlFor="contact-last-name" className="-ml-2">
                    <span className="bg-background inline-flex px-2">
                      Contact Last Name
                    </span>
                  </label>
                  <Input
                    id="contact-last-name"
                    type="text"
                    value={bookingData.contactLastName}
                    disabled
                  />
                </div>
                <div className="w-full space-y-2 relative">
                  <label htmlFor="mode-of-payment" className="-ml-2">
                    <span className="bg-background inline-flex px-2">
                      Mode of Payment
                    </span>
                  </label>
                  <Input
                    id="mode-of-payment"
                    type="text"
                    value={bookingData.modeOfPayment}
                    disabled
                  />
                </div>
                <div className="w-full space-y-2 relative">
                  <label htmlFor="payment-status" className="-ml-2">
                    <span className="bg-background inline-flex px-2">
                      Payment Status
                    </span>
                  </label>
                  <Select
                    value={paymentStatus}
                    onValueChange={handlePaymentStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PAID">PAID</SelectItem>
                      <SelectItem value="UNPAID">UNPAID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div
                  className="flex items-start p-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text meanings-blue-400 dark:border-blue-800 space-x-3 w-full"
                  role="alert"
                >
                  <Info size={48} className="p-0" />
                  <div>
                    <span className="font-medium text-md">
                      If they were present over the counter to pay ensure their receipts all provided does have minimum expiration up to 15 hours.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.section>

      {/* Alert Dialog for Success/Error Messages */}
      <AlertDialog open={alert.show} onOpenChange={clearAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alert.type === "success" ? "Success" : "Error"}</AlertDialogTitle>
            <AlertDialogDescription>{alert.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={clearAlert}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AnimatePresence>
  );
}

export default Reservation_UpdateData;