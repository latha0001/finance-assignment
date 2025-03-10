import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { BudgetList } from "@/components/budget-list"

export const metadata = {
  title: "Budgets | Personal Finance Visualizer",
  description: "Manage your monthly budgets",
}

export default function BudgetsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Suspense fallback={<Skeleton className="h-[800px] w-full" />}>
        <BudgetList />
      </Suspense>
    </div>
  )
}

