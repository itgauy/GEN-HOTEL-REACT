import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import HotelDataTable from "../components/DataManagement";
import { Trash, PlusCircle, Info, LoaderCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import useRoomDataStore from "../stores/room_data.store";

function Room_Management_Page() {
  const [activeTab, setActiveTab] = useState("rooms");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const navigate = useNavigate();
  const { roomData, fetchRoomData, loading, error } = useRoomDataStore();

  // Debug: Log initial state
  console.log("RoomData: Initial state", { roomData, loading, error });

  // Fetch room data on component mount
  useEffect(() => {
    console.log("RoomData: useEffect triggered, roomData exists:", !!roomData);
    if (!roomData) {
      console.log("RoomData: Fetching room data...");
      fetchRoomData();
    }
  }, [roomData, fetchRoomData]);

  // Debug: Log roomData changes
  useEffect(() => {
    console.log("RoomData: roomData updated", roomData);
  }, [roomData]);

  // Handle navigation with a slight delay for animation
  const handleNavigate = () => {
    console.log("RoomData: Navigating to add room page");
    setTimeout(() => {
      navigate("/hms-admin/room-data/add");
    }, 300);
  };

  // Filter and transform roomData based on hotel_type
  const roomsData = roomData
    ? roomData
        .filter((room) => room.hotel_type === "Hotel Room")
        .map((room) => {
          const firstRoomDetail = room.room_details?.[0] || {};
          const issuedByName = room.processed_by_id?.employee_name
            ? `${room.processed_by_id.employee_name.firstName} ${room.processed_by_id.employee_name.lastName}`
            : "Unknown";
          const transformedRoom = {
            id: room._id || "N/A",
            title: firstRoomDetail.room_title || "Unidentified",
            slotNumber: room.slot_availability?.toString() || "0",
            roomAvailability: {
              adults: firstRoomDetail.room_availability?.adults ?? 0,
              children: firstRoomDetail.room_availability?.children ?? 0,
              infants: firstRoomDetail.room_availability?.infants ?? 0,
            },
            issuedBy: issuedByName,
            dateTime: room.generated_room_date_added || null,
          };
          console.log("RoomData: Transformed room (Hotel Room)", transformedRoom);
          return transformedRoom;
        })
    : [];

  const condominiumsData = roomData
    ? roomData
        .filter((room) => room.hotel_type === "Hotel Condominium")
        .map((room) => {
          const firstRoomDetail = room.room_details?.[0] || {};
          const issuedByName = room.processed_by_id?.employee_name
            ? `${room.processed_by_id.employee_name.firstName} ${room.processed_by_id.employee_name.lastName}`
            : "Unknown";
          const transformedRoom = {
            id: room._id || "N/A",
            title: firstRoomDetail.room_title || "Unidentified",
            slotNumber: room.slot_availability?.toString() || "0",
            roomAvailability: {
              adults: firstRoomDetail.room_availability?.adults ?? 0,
              children: firstRoomDetail.room_availability?.children ?? 0,
              infants: firstRoomDetail.room_availability?.infants ?? 0,
            },
            issuedBy: issuedByName,
            dateTime: room.generated_room_date_added || null,
          };
          console.log("RoomData: Transformed room (Hotel Condominium)", transformedRoom);
          return transformedRoom;
        })
    : [];

  // Debug: Log transformed data
  console.log("RoomData: roomsData", roomsData);
  console.log("RoomData: condominiumsData", condominiumsData);
  console.log("RoomData: Current state", { activeTab, selectedRooms });

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <AnimatePresence mode="wait">
          {selectedRooms.length === 0 ? (
            <motion.h2
              key="title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              className="text-xl font-bold tracking-tighter"
            >
              Hotel Rooms / Condominiums
            </motion.h2>
          ) : (
            <motion.div
              key="selection-alert"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              className="rounded-md border border-red-400 bg-red-200/80 p-4 flex items-center justify-between w-[540px]"
            >
              <div className="flex items-start">
                <div className="mr-3 text-red-400">
                  <Info size={24} />
                </div>
                <div>
                  <p className="text-red-500">
                    You selected {selectedRooms.length}{" "}
                    {selectedRooms.length === 1 ? "item" : "items"}.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-2">
          <Button onClick={handleNavigate}>
            <PlusCircle className="mr-2" /> Add New Data
          </Button>
          <Button
            variant="destructive"
            disabled={selectedRooms.length === 0}
            onClick={() => console.log("RoomData: Archive clicked, selectedRooms:", selectedRooms)}
          >
            <Trash className="mr-2" /> Archive
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <LoaderCircle className="animate-spin text-black" size={32} />
          {console.log("RoomData: Rendering loading state")}
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
          {console.log("RoomData: Rendering error state", error)}
        </div>
      )}

      {!loading && !error && (
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            console.log("RoomData: Tab changed to", value);
            setActiveTab(value);
          }}
          className="mb-6"
        >
          <TabsList className="border rounded-md">
            <TabsTrigger value="rooms" className="data-[state=active]:bg-background">
              Rooms
            </TabsTrigger>
            {/* <TabsTrigger
              value="condominiums"
              className="data-[state=active]:bg-background"
            >
              Condominiums
            </TabsTrigger> */}
          </TabsList>
          <TabsContent value="rooms" className="mt-4">
            <div className="border rounded-lg">
              <HotelDataTable
                data={roomsData}
                selectedItems={selectedRooms}
                setSelectedItems={setSelectedRooms}
              />
              {console.log("RoomData: Rendering rooms tab with data", roomsData)}
            </div>
          </TabsContent>
          {/* <TabsContent value="condominiums" className="mt-4">
            <div className="border rounded-lg">
              <HotelDataTable
                data={condominiumsData}
                selectedItems={selectedRooms}
                setSelectedItems={setSelectedRooms}
              />
              {console.log("RoomData: Rendering condominiums tab with data", condominiumsData)}
            </div>
          </TabsContent> */}
        </Tabs>
      )}
    </div>
  );
}

export default Room_Management_Page;