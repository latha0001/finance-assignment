"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  { name: "Food & Dining", value: 400, color: "#FF6384" },
  { name: "Shopping", value: 300, color: "#36A2EB" },
  { name: "Transportation", value: 200, color: "#FFCE56" },
  { name: "Entertainment", value: 150, color: "#4BC0C0" },
  { name: "Utilities", value: 100, color: "#9966FF" },
  { name: "Other", value: 50, color: "#FF9F40" },
]

export function CategoryBreakdown() {
  const [period, setPeriod] = useState("month")

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-end">
        <Select defaultValue="month" onValueChange={setPeriod}>
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
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

