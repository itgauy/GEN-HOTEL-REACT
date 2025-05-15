import { useState } from "react"
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ChartContainer, ChartArea, ChartLine, ChartTooltip } from "@/components/ui/chart"

export default function BookingAnalytics() {
  const [activeTab, setActiveTab] = useState("3months")

  // Sample data for the chart
  const chartData = [
    { date: "Jun 1", visitors: 1200, engagement: 800 },
    { date: "Jun 3", visitors: 1800, engagement: 1000 },
    { date: "Jun 5", visitors: 1400, engagement: 900 },
    { date: "Jun 7", visitors: 2200, engagement: 1400 },
    { date: "Jun 9", visitors: 1600, engagement: 1100 },
    { date: "Jun 12", visitors: 1900, engagement: 1300 },
    { date: "Jun 15", visitors: 2400, engagement: 1500 },
    { date: "Jun 18", visitors: 1800, engagement: 1200 },
    { date: "Jun 21", visitors: 2300, engagement: 1400 },
    { date: "Jun 24", visitors: 2100, engagement: 1300 },
    { date: "Jun 27", visitors: 2200, engagement: 1400 },
    { date: "Jun 30", visitors: 1700, engagement: 1100 },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="₱20.00"
          change="+12.5%"
          trend="up"
          description="Trending up this month"
          subtext="Visitors for the last 6 months"
        />
        <MetricCard
          title="New Customers"
          value="2"
          change="-20%"
          trend="down"
          description="Down 20% this period"
          subtext="Acquisition needs attention"
        />
        <MetricCard
          title="Bookings for this Month"
          value="3"
          change="+8.3%"
          trend="up"
          description="Increasing steadily"
          subtext="Higher than last month"
        />
        <MetricCard
          title="Active Accounts"
          value="2"
          change="+12.5%"
          trend="up"
          description="Strong user retention"
          subtext="Engagement exceed targets"
        />
      </div>


      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Total for the last 3 months</CardTitle>
          <Tabs defaultValue="3months" className="ml-auto" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="3months">Last 3 months</TabsTrigger>
              <TabsTrigger value="30days">Last 30 days</TabsTrigger>
              <TabsTrigger value="7days">Last 7 days</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer data={chartData}>
              <ChartTooltip />
              <ChartLine dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "#888888", fontSize: 12 }} />
              <ChartArea dataKey="engagement" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.2} name="Engagement" />
              <ChartArea dataKey="visitors" stroke="#f97316" fill="#f97316" fillOpacity={0.2} name="Visitors" />
            </ChartContainer>
          </div>
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
          {trend === "up" ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
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
