import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { CalendarIcon, DollarSignIcon, PieChartIcon, TrendingUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ExpenseChart } from "@/components/expense-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import { CategoryBreakdown } from "@/components/category-breakdown"
import { BudgetComparison } from "@/components/budget-comparison"

export const metadata: Metadata = {
  title: "Personal Finance Visualizer",
  description: "Track, visualize, and optimize your personal finances",
}

export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track, visualize, and optimize your personal finances</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/transactions/new">
            <Button>
              <DollarSignIcon className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </Link>
          <Link href="/budgets">
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Manage Budgets
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<Skeleton className="h-[120px] w-full" />}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,234.56</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[120px] w-full" />}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$546.75</div>
              <p className="text-xs text-muted-foreground">-4.5% from last month</p>
            </CardContent>
          </Card>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[120px] w-full" />}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Category</CardTitle>
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Food & Dining</div>
              <p className="text-xs text-muted-foreground">$245.28 this month</p>
            </CardContent>
          </Card>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[120px] w-full" />}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">65%</div>
              <p className="text-xs text-muted-foreground">$456.75 of $700.00 spent</p>
            </CardContent>
          </Card>
        </Suspense>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Expense Trends</CardTitle>
            <CardDescription>Your monthly expenses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Your spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryBreakdown />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-1">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Recent transaction history</CardDescription>
            </div>
            <Link href="/transactions" className="ml-auto">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Budget vs. Actual</CardTitle>
            <CardDescription>Your spending against budget</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetComparison />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

