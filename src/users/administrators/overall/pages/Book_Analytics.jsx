import { useState, useMemo, useEffect } from "react"
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, CartesianGrid } from "recharts"
import useBookingStore from "../stores/booking.stores"
import useTallyDateStore from "../stores/tally_data.store"

// Define chartConfig
const chartConfig = {
  views: {
    label: "Analytics",
  },
  engagement: {
    label: "Engagement",
    color: "hsl(var(--chart-2))",
  },
};

export default function Book_Analytic() {
  const [activeTab, setActiveTab] = useState("3months")
  const [activeChart, setActiveChart] = useState("engagement") // Fixed to engagement
  const { registrationData, fetchGuestUsers } = useTallyDateStore();
  const { books, fetchBooksAll } = useBookingStore();

  // Fetch data on component mount
  useEffect(() => {
    fetchBooksAll();
    fetchGuestUsers();
  }, [fetchBooksAll, fetchGuestUsers]);

  // Calculate total revenue from books data
  const totalRevenue = useMemo(() => {
    if (!Array.isArray(books)) return 0;
    return books.reduce((sum, book) => {
      const orderTotal = book?.receipt_record?.order_reservation_total || 0;
      return sum + orderTotal;
    }, 0);
  }, [books]);

  // Calculate bookings for the current month (May 2025)
  const bookingsThisMonth = useMemo(() => {
    if (!Array.isArray(books)) return 0;
    const currentMonth = new Date().getMonth(); // May 2025
    const currentYear = new Date().getFullYear();
    return books.filter((book) => {
      const bookingDate = new Date(book?.booking_date_added);
      return (
        bookingDate.getMonth() === currentMonth &&
        bookingDate.getFullYear() === currentYear
      );
    }).length;
  }, [books]);

  // Calculate active users
  const activeUsersCount = Array.isArray(registrationData) ? registrationData.length : 0;

  // Generate chart data from real booking data
  const chartData = useMemo(() => {
    if (!Array.isArray(books)) return [];

    const now = new Date();
    let periodStart;
    if (activeTab === "3months") {
      periodStart = new Date(now);
      periodStart.setMonth(now.getMonth() - 3);
      periodStart.setHours(0, 0, 0, 0);
    } else if (activeTab === "30days") {
      periodStart = new Date(now);
      periodStart.setDate(now.getDate() - 30);
      periodStart.setHours(0, 0, 0, 0);
    } else if (activeTab === "7days") {
      periodStart = new Date(now);
      periodStart.setDate(now.getDate() - 7);
      periodStart.setHours(0, 0, 0, 0);
    }

    // Group bookings by date and count them as engagement
    const dateMap = new Map();
    books.forEach((book) => {
      const bookingDate = new Date(book?.booking_date_added);
      // Ensure bookingDate is within the selected period
      if (bookingDate >= periodStart && bookingDate <= now) {
        const dateStr = bookingDate.toISOString().split("T")[0];
        dateMap.set(dateStr, (dateMap.get(dateStr) || 0) + 1);
      }
    });

    // Create a continuous range of dates to ensure the chart has data points
    const result = [];
    const currentDate = new Date(periodStart);
    while (currentDate <= now) {
      const dateStr = currentDate.toISOString().split("T")[0];
      result.push({
        date: dateStr,
        engagement: dateMap.get(dateStr) || 0, // Use 0 if no bookings on that date
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  }, [activeTab, books]);

  const total = useMemo(
    () => ({
      engagement: chartData.reduce((acc, curr) => acc + (curr.engagement || 0), 0),
    }),
    [chartData]
  );

  // Filter data based on activeTab (already handled in chartData generation)
  const filteredData = chartData;

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Revenue"
          value={`₱${totalRevenue.toFixed(2)}`}
          description="Trending up this month"
          subtext="Visitors for the last 6 months"
        />
        <MetricCard
          title="Bookings for this Month"
          value={bookingsThisMonth.toString()}
          description="Increasing steadily"
          subtext="Higher than last month"
        />
        <MetricCard
          title="Active Accounts"
          value={activeUsersCount.toString()}
          description="Strong user retention"
          subtext="Engagement exceed targets"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Analytics - Interactive</CardTitle>
            <CardDescription>
              Showing total engagement for the selected period
            </CardDescription>
          </div>
          <div className="flex">
            {["engagement"].map((key) => (
              <button
                key={key}
                data-active={activeChart === key}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(key)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[key].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="3months">Last 3 months</TabsTrigger>
              <TabsTrigger value="30days">Last 30 days</TabsTrigger>
              <TabsTrigger value="7days">Last 7 days</TabsTrigger>
            </TabsList>
          </Tabs>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={filteredData}
              margin={{
                top: 64,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }}
                  />
                }
              />
              <Line
                dataKey="engagement"
                type="monotone"
                stroke={`var(--color-${activeChart})`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({ title, value, change, trend, description, subtext }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div
          className={`flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium ${
            trend === "up" ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {change}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <span className="flex items-center">
            {description}
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">{subtext}</div>
      </CardContent>
    </Card>
  )
}