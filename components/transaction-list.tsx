"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { PlusCircleIcon, SearchIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for initial rendering
const mockTransactions = [
  {
    _id: "1",
    description: "Grocery Shopping",
    amount: -84.97,
    date: new Date(2023, 4, 15),
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
    date: new Date(2023, 4, 10),
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
    date: new Date(2023, 4, 5),
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
    date: new Date(2023, 4, 2),
    categoryId: "shopping",
    category: {
      name: "Shopping",
      color: "#36A2EB",
    },
    type: "expense",
  },
  {
    _id: "5",
    description: "Dinner with Friends",
    amount: -45.8,
    date: new Date(2023, 3, 28),
    categoryId: "food",
    category: {
      name: "Food & Dining",
      color: "#FF6384",
    },
    type: "expense",
  },
]

export function TransactionList() {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<any[]>([])
  const [filter, setFilter] = useState({
    search: "",
    category: "all",
    type: "all",
    dateRange: "all",
  })

  useEffect(() => {
    // In a real app, fetch from API
    const fetchData = async () => {
      // Simulate API delay
      setTimeout(() => {
        setTransactions(mockTransactions)
        setLoading(false)
      }, 1000)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Manage and track your financial transactions</p>
        </div>
        <Link href="/transactions/new">
          <Button>
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View and filter your transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0 mb-6">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={filter.search}
                  onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:w-2/3">
              <Select defaultValue="all" onValueChange={(value) => setFilter({ ...filter, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="food">Food & Dining</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all" onValueChange={(value) => setFilter({ ...filter, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all" onValueChange={(value) => setFilter({ ...filter, dateRange: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-10">
                        No transactions found. Add a new transaction to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    transactions.map((transaction) => (
                      <TableRow key={transaction._id}>
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-0"
                            style={{
                              backgroundColor: `${transaction.category.color}20`,
                              color: transaction.category.color,
                            }}
                          >
                            {transaction.category.name}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(new Date(transaction.date), "MMM d, yyyy")}</TableCell>
                        <TableCell
                          className={`text-right font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.amount > 0 ? "+" : ""}
                          {transaction.amount.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">Showing {transactions.length} transactions</div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

