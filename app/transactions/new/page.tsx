import { TransactionForm } from "@/components/transaction-form"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "New Transaction | Personal Finance Visualizer",
  description: "Add a new financial transaction",
}

export default function NewTransactionPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">New Transaction</h1>
        <p className="text-muted-foreground">Add a new financial transaction to your records</p>
      </div>

      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <TransactionForm />
      </Suspense>
    </div>
  )
}

