import Link from "next/link"
import { DollarSignIcon, BarChartIcon, LayersIcon, ListIcon } from "lucide-react"

export function MainNav() {
  return (
    <header className="bg-background sticky top-0 z-40 border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <DollarSignIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">FinanceViz</span>
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <BarChartIcon className="mr-1 h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/transactions"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ListIcon className="mr-1 h-4 w-4" />
              Transactions
            </Link>
            <Link
              href="/categories"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <LayersIcon className="mr-1 h-4 w-4" />
              Categories
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

