import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import HotelDataTable from "../components/BookData";
import { ArrowUpDown, Info, LoaderCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import useBookingStore from "../stores/booking.stores";

function Book_Reservation() {
  const [activeTab, setActiveTab] = useState("current");
  const [selectedBookings, setSelectedBookings] = useState([]);
  const navigate = useNavigate();
  const { books, fetchBooksAll, fetchBookingById, loading, error } = useBookingStore();

  // Debug: Log initial state
  console.log("ReservationsData: Initial state", { books, loading, error });

  // Fetch booking data on component mount
  useEffect(() => {
    console.log("ReservationsData: useEffect triggered, books exists:", !!books);
    if (!books || books.length === 0) {
      console.log("ReservationsData: Fetching booking data...");
      fetchBooksAll();
    }
  }, [books, fetchBooksAll]);

  // Debug: Log books changes
  useEffect(() => {
    console.log("ReservationsData: books updated", books);
  }, [books]);

  // Handle navigation with a slight delay for animation
  const handleNavigate = async () => {
    if (selectedBookings.length === 0) {
      console.log("ReservationsData: No bookings selected for navigation");
      return;
    }
    const bookingId = selectedBookings[0]; // Take the first selected booking
    console.log("ReservationsData: Fetching booking for ID", bookingId);
    try {
      await fetchBookingById(bookingId);
      console.log("ReservationsData: Navigating to update booking page for ID", bookingId);
      setTimeout(() => {
        navigate(`/hms-admin/bookings/${bookingId}`);
      }, 300);
    } catch (err) {
      console.error("ReservationsData: Failed to fetch booking for ID", bookingId, err);
    }
  };

  // Transform booking data
  const bookingsData = books
    ? books.map((booking) => {
        const firstRoom = booking.reservation_room?.[0] || {};
        const firstRoomDetail = firstRoom.room_details?.[0] || {};
        const issuedByName = booking.booking_issued_by?.guest_name
          ? `${booking.booking_issued_by.guest_name.firstName} ${booking.booking_issued_by.guest_name.lastName}`
          : "Unknown";
        const transformedBooking = {
          id: booking._id || "N/A",
          title: firstRoom.hotel_type || "Unidentified",
          slotNumber: firstRoom.slot_availability?.toString() || "0",
          roomAvailability: {
            adults: firstRoomDetail.room_availability?.adults ?? 0,
            children: firstRoomDetail.room_availability?.children ?? 0,
            infants: firstRoomDetail.room_availability?.infants ?? 0,
          },
          issuedBy: issuedByName,
          dateTime: booking.booking_date_added || null,
        };
        console.log("ReservationsData: Transformed booking", transformedBooking);
        return transformedBooking;
      })
    : [];

  // Debug: Log transformed data
  console.log("ReservationsData: bookingsData", bookingsData);
  console.log("ReservationsData: Current state", { activeTab, selectedBookings });

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <AnimatePresence mode="wait">
          {selectedBookings.length === 0 ? (
            <motion.h2
              key="title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              className="text-xl font-bold tracking-tighter"
            >
              Guest Booking Reservations
            </motion.h2>
          ) : (
            <motion.div
              key="selection-alert"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              className="rounded-md text-blue-800 bg-blue-50 border border-blue-300 p-4 flex items-center justify-between w-[540px]"
            >
              <div className="flex items-start">
                <div className="mr-3 text-blue-800">
                  <Info size={24} />
                </div>
                <div>
                  <p className="text-blue-800">
                    You selected {selectedBookings.length}{" "}
                    {selectedBookings.length === 1 ? "item" : "items"}.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-2">
          <Button
            disabled={selectedBookings.length === 0}
            onClick={() => handleNavigate()}
          >
            <ArrowUpDown className="-ml-1" /> Update Data
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <LoaderCircle className="animate-spin text-black" size={32} />
          {console.log("ReservationsData: Rendering loading state")}
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center gap-4 h-64">
          <img
            src="/anubis-mascot.png"
            alt="No data"
            className="w-48 h-48 object-contain"
          />
          <p className="text-gray-500">{error || "No data available"}</p>
          {console.log("ReservationsData: Rendering error state", error)}
        </div>
      )}

      {!loading && !error && (
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            console.log("ReservationsData: Tab changed to", value);
            setActiveTab(value);
          }}
          className="mb-6"
        >
          <TabsList className="border rounded-md">
            <TabsTrigger value="current" className="data-[state=active]:bg-background">
              Current
            </TabsTrigger>
            <TabsTrigger
              value="previous"
              className="data-[state=active]:bg-background"
            >
              Previous
            </TabsTrigger>
          </TabsList>
          <TabsContent value="current" className="mt-4">
            <div className="border rounded-lg">
              <HotelDataTable
                data={bookingsData}
                selectedItems={selectedBookings}
                setSelectedItems={setSelectedBookings}
              />
              {console.log("ReservationsData: Rendering current tab with data", bookingsData)}
            </div>
          </TabsContent>
          <TabsContent value="previous" className="mt-4">
            <div className="border rounded-lg">
              <HotelDataTable
                data={bookingsData} // Placeholder: same data for now
                selectedItems={selectedBookings}
                setSelectedItems={setSelectedBookings}
              />
              {console.log("ReservationsData: Rendering previous tab w/ data", bookingsData)}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default Book_Reservation;