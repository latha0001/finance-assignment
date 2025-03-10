import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { CategoryList } from "@/components/category-list"

export const metadata = {
  title: "Categories | Personal Finance Visualizer",
  description: "Manage your transaction categories",
}

export default function CategoriesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Suspense fallback={<Skeleton className="h-[800px] w-full" />}>
        <CategoryList />
      </Suspense>
    </div>
  )
}

