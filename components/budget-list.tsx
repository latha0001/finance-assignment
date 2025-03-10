"use client"

import { useState, useEffect } from "react"
import { PlusCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"

// Mock categories
const mockCategories = [
  { _id: "1", name: "Food & Dining", color: "#FF6384" },
  { _id: "2", name: "Shopping", color: "#36A2EB" },
  { _id: "3", name: "Transportation", color: "#FFCE56" },
  { _id: "4", name: "Entertainment", color: "#4BC0C0" },
  { _id: "5", name: "Utilities", color: "#9966FF" },
  { _id: "7", name: "Other", color: "#FF9F40" },
]

// Mock budgets with actual spending data
const mockBudgets = [
  {
    _id: "1",
    categoryId: "1",
    amount: 500,
    period: "monthly",
    startDate: new Date(2023, 0, 1),
    category: { name: "Food & Dining", color: "#FF6384" },
    spent: 456,
  },
  {
    _id: "2",
    categoryId: "2",
    amount: 300,
    period: "monthly",
    startDate: new Date(2023, 0, 1),
    category: { name: "Shopping", color: "#36A2EB" },
    spent: 275,
  },
  {
    _id: "3",
    categoryId: "3",
    amount: 200,
    period: "monthly",
    startDate: new Date(2023, 0, 1),
    category: { name: "Transportation", color: "#FFCE56" },
    spent: 234,
  },
  {
    _id: "4",
    categoryId: "4",
    amount: 150,
    period: "monthly",
    startDate: new Date(2023, 0, 1),
    category: { name: "Entertainment", color: "#4BC0C0" },
    spent: 125,
  },
  {
    _id: "5",
    categoryId: "5",
    amount: 200,
    period: "monthly",
    startDate: new Date(2023, 0, 1),
    category: { name: "Utilities", color: "#9966FF" },
    spent: 180,
  },
]

export function BudgetList() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [budgets, setBudgets] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [formOpen, setFormOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<any>(null)
  const [newBudget, setNewBudget] = useState({
    categoryId: "",
    amount: "",
    period: "monthly",
  })

  useEffect(() => {
    // In a real app, fetch from API
    const fetchData = async () => {
      // Simulate API delay
      setTimeout(() => {
        setBudgets(mockBudgets)
        setCategories(mockCategories)
        setLoading(false)
      }, 1000)
    }

    fetchData()
  }, [])

  const handleOpenForm = (budget?: any) => {
    if (budget) {
      setEditingBudget(budget)
      setNewBudget({
        categoryId: budget.categoryId,
        amount: budget.amount.toString(),
        period: budget.period,
      })
    } else {
      setEditingBudget(null)
      setNewBudget({
        categoryId: "",
        amount: "",
        period: "monthly",
      })
    }
    setFormOpen(true)
  }

  const handleSaveBudget = async () => {
    if (!newBudget.categoryId || !newBudget.amount) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, send to API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const category = categories.find((c) => c._id === newBudget.categoryId)

      if (editingBudget) {
        // Update existing budget
        setBudgets(
          budgets.map((b) =>
            b._id === editingBudget._id
              ? {
                  ...b,
                  ...newBudget,
                  amount: Number.parseFloat(newBudget.amount),
                  category,
                }
              : b,
          ),
        )

        toast({
          title: "Budget updated",
          description: `Successfully updated budget for ${category?.name}`,
        })
      } else {
        // Add new budget
        const newId = (Math.max(...budgets.map((b) => Number.parseInt(b._id))) + 1).toString()
        setBudgets([
          ...budgets,
          {
            _id: newId,
            ...newBudget,
            amount: Number.parseFloat(newBudget.amount),
            startDate: new Date(),
            category,
            spent: 0,
          },
        ])

        toast({
          title: "Budget created",
          description: `Successfully created budget for ${category?.name}`,
        })
      }

      setFormOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save budget",
        variant: "destructive",
      })
    }
  }

  const handleDeleteBudget = async (id: string) => {
    try {
      // In a real app, send to API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setBudgets(budgets.filter((b) => b._id !== id))

      toast({
        title: "Budget deleted",
        description: "Successfully deleted budget",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete budget",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-8 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground">Manage your monthly spending budgets</p>
        </div>
        <Button onClick={() => handleOpenForm()}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add Budget
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget List</CardTitle>
          <CardDescription>Track your spending against your budget limits</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    No budgets found. Add a new budget to get started.
                  </TableCell>
                </TableRow>
              ) : (
                budgets.map((budget) => {
                  const percentSpent = (budget.spent / budget.amount) * 100
                  const isOverBudget = percentSpent > 100

                  return (
                    <TableRow key={budget._id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: budget.category.color }}
                          />
                          <span className="font-medium">{budget.category.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>${budget.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={isOverBudget ? "text-red-500 font-medium" : ""}>
                          ${budget.spent.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="w-full max-w-xs">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{percentSpent.toFixed(0)}%</span>
                            <span>
                              {isOverBudget
                                ? "Over budget"
                                : `$${(budget.amount - budget.spent).toLocaleString()} left`}
                            </span>
                          </div>
                          <Progress
                            value={Math.min(percentSpent, 100)}
                            className={isOverBudget ? "bg-red-200" : ""}
                            indicatorClassName={isOverBudget ? "bg-red-500" : ""}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{budget.period}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleOpenForm(budget)}>
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Budget</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete the budget for "{budget.category.name}"? This action
                                  cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteBudget(budget._id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingBudget ? "Edit" : "Add"} Budget</DialogTitle>
            <DialogDescription>
              {editingBudget ? "Update an existing" : "Add a new"} budget for a category
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <div className="col-span-3">
                <Select
                  value={newBudget.categoryId}
                  onValueChange={(value) => setNewBudget({ ...newBudget, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        <div className="flex items-center">
                          <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: category.color }} />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">
                Period
              </Label>
              <div className="col-span-3">
                <Select
                  value={newBudget.period}
                  onValueChange={(value) => setNewBudget({ ...newBudget, period: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBudget}>{editingBudget ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

