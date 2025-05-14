"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

const Chart = React.forwardRef(({ id, className, children, data, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <div
      data-chart={chartId}
      ref={ref}
      className={cn(
        "flex h-full w-full justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className
      )}
      {...props}
    >
      <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
        <RechartsPrimitive.AreaChart data={data}>
          <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
          <RechartsPrimitive.YAxis 
            tickLine={false} 
            axisLine={false} 
            tick={{ fill: "#888888", fontSize: 12 }} 
          />
          {children}
        </RechartsPrimitive.AreaChart>
      </RechartsPrimitive.ResponsiveContainer>
    </div>
  )
})
Chart.displayName = "Chart"

// Export components directly from Recharts
const ChartArea = RechartsPrimitive.Area
const ChartLine = RechartsPrimitive.XAxis
const ChartTooltip = RechartsPrimitive.Tooltip

export {
  Chart,
  ChartArea,
  ChartLine,
  ChartTooltip
}
