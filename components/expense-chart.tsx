"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  { name: "Jan", expenses: 1200 },
  { name: "Feb", expenses: 1900 },
  { name: "Mar", expenses: 800 },
  { name: "Apr", expenses: 1600 },
  { name: "May", expenses: 900 },
  { name: "Jun", expenses: 1700 },
  { name: "Jul", expenses: 1100 },
  { name: "Aug", expenses: 1400 },
  { name: "Sep", expenses: 1000 },
  { name: "Oct", expenses: 800 },
  { name: "Nov", expenses: 1200 },
  { name: "Dec", expenses: 1500 },
]

export function ExpenseChart() {
  const [period, setPeriod] = useState("year")

  const chartConfig = {
    expenses: {
      label: "Expenses",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-end">
        <Select defaultValue="year" onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ChartContainer config={chartConfig} className="h-80">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

