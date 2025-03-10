import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { TransactionList } from "@/components/transaction-list"

export const metadata = {
  title: "Transactions | Personal Finance Visualizer",
  description: "Manage and track your financial transactions",
}

export default function TransactionsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Suspense fallback={<Skeleton className="h-[800px] w-full" />}>
        <TransactionList />
      </Suspense>
    </div>
  )
}

