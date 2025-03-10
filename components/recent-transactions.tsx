"use client"

import { useState, useEffect } from "react"
import { Avatar } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data - in a real app, this would come from an API
const mockTransactions = [
  {
    _id: "1",
    description: "Grocery Shopping",
    amount: -84.97,
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    categoryId: "food",
    category: {
      name: "Food & Dining",
      color: "#FF6384",
    },
    type: "expense",
  },
  {
    _id: "2",
    description: "Monthly Salary",
    amount: 3000,
    date: new Date(Date.now() - 12 * 60 * 60 * 1000),
    categoryId: "income",
    category: {
      name: "Income",
      color: "#4BC0C0",
    },
    type: "income",
  },
  {
    _id: "3",
    description: "Utility Bill",
    amount: -120.5,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    categoryId: "utilities",
    category: {
      name: "Utilities",
      color: "#9966FF",
    },
    type: "expense",
  },
  {
    _id: "4",
    description: "Online Shopping",
    amount: -65.25,
    date: new Date(Date.now() - 36 * 60 * 60 * 1000),
    categoryId: "shopping",
    category: {
      name: "Shopping",
      color: "#36A2EB",
    },
    type: "expense",
  },
]

export function RecentTransactions() {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    // In a real app, fetch data from API
    const fetchData = async () => {
      // Simulate API call
      setTimeout(() => {
        setTransactions(mockTransactions)
        setLoading(false)
      }, 1000)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-6">
        {transactions.map((transaction) => (
          <div key={transaction._id} className="flex justify-between items-start">
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-3" style={{ backgroundColor: transaction.category.color }}>
                {transaction.type === "income" ? (
                  <ArrowUpIcon className="h-4 w-4 text-white" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-white" />
                )}
              </Avatar>
              <div>
                <div className="font-medium">{transaction.description}</div>
                <div className="text-sm text-muted-foreground">
                  {formatDistanceToNow(transaction.date, { addSuffix: true })}
                </div>
              </div>
            </div>
            <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
              {transaction.amount > 0 ? "+" : ""}
              {transaction.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

