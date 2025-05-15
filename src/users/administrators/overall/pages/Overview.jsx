import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import Cardboard from "../components/Cardboard";
import useTallyDateStore from "../stores/tally_data.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function All_Admin_Page() {
  const { registrationData, roomData, reservation, fetchGuestUsers, fetchRoomData, fetchBookingReservation } =
    useTallyDateStore();

  const [userName, setUserName] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    // Fetch data from localStorage
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      try {
        const parsedData = JSON.parse(authStorage);
        const user = parsedData?.state?.user?.employee_name || {};
        setUserName({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
        });
      } catch (error) {
        console.error("Error parsing auth-storage:", error);
      }
    }

    // Fetch store data
    fetchGuestUsers();
    fetchRoomData();
    fetchBookingReservation();
  }, [fetchGuestUsers, fetchRoomData, fetchBookingReservation]);

  // Count lengths for display (dynamic)
  const activeUsersCount = Array.isArray(registrationData) ? registrationData.length : 0;
  const roomsTotalCount = Array.isArray(roomData) ? roomData.length : 0;
  const bookingCount = Array.isArray(reservation) ? reservation.length : 0;

  // Dynamic chart data for pie chart (Summary of Findings)
  const chartData = [
    { status: "Active Users", count: activeUsersCount, fill: "#2563eb" },
    { status: "Total Rooms", count: roomsTotalCount, fill: "#60a5fa" },
    { status: "Bookings", count: bookingCount, fill: "#93c5fd" },
  ];

  // Chart configuration
  const chartConfig = {
    count: {
      label: "Count",
    },
    activeUsers: {
      label: "Active Users",
      color: "#2563eb",
    },
    totalRooms: {
      label: "Total Rooms",
      color: "#60a5fa",
    },
    bookings: {
      label: "Bookings",
      color: "#93c5fd",
    },
  };

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const lastMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).toLocaleString(
    "default",
    { month: "long" }
  );
  const currentYear = new Date().getFullYear();

  return (
    <section id="welcome-page" className="p-8">
      <div>
        <h1 className="text-2xl font-semibold mb-4">
          Welcome, {userName.firstName} {userName.lastName}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Cardboard title="Rooms Total" value={roomsTotalCount} />
          <Cardboard title="Active Users" value={activeUsersCount} />
          <Cardboard title="Booking Reservations" value={bookingCount} />
        </div>

        {/* Pie Chart */}
        <div className="mt-6">
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-3">
              <CardTitle>Summary of Findings</CardTitle>
              <CardDescription>
                {lastMonth} - {currentMonth} {currentYear}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-3">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="status"
                    label={({ value }) => `${value}`}
                    labelLine={true}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm text-center">
            <div className="flex items-center justify-center gap-2 font-medium leading-none">
                Gathered for this month
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                {activeUsersCount} active users, {roomsTotalCount} total rooms,{" "}
                {bookingCount} bookings
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default All_Admin_Page;