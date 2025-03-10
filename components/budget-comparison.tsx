"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Food",
    budget: 500,
    actual: 456,
  },
  {
    name: "Transport",
    budget: 300,
    actual: 275,
  },
  {
    name: "Shopping",
    budget: 200,
    actual: 234,
  },
  {
    name: "Entertainment",
    budget: 150,
    actual: 125,
  },
  {
    name: "Utilities",
    budget: 200,
    actual: 180,
  },
]

export function BudgetComparison() {
  const chartConfig = {
    budget: {
      label: "Budget",
      color: "hsl(var(--chart-2))",
    },
    actual: {
      label: "Actual",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-80">
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={100} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="budget" fill="var(--color-budget)" radius={[0, 4, 4, 0]} />
        <Bar dataKey="actual" fill="var(--color-actual)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartContainer>
  )
}

