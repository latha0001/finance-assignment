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

// Mock categories
const mockCategories = [
  { _id: "1", name: "Food & Dining", color: "#FF6384", icon: "utensils" },
  { _id: "2", name: "Shopping", color: "#36A2EB", icon: "shopping-bag" },
  { _id: "3", name: "Transportation", color: "#FFCE56", icon: "car" },
  { _id: "4", name: "Entertainment", color: "#4BC0C0", icon: "film" },
  { _id: "5", name: "Utilities", color: "#9966FF", icon: "home" },
  { _id: "6", name: "Income", color: "#4BC0C0", icon: "money-bill" },
  { _id: "7", name: "Other", color: "#FF9F40", icon: "ellipsis-h" },
]

export function CategoryList() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<any[]>([])
  const [formOpen, setFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "#3b82f6",
    icon: "",
  })

  useEffect(() => {
    // In a real app, fetch from API
    const fetchData = async () => {
      // Simulate API delay
      setTimeout(() => {
        setCategories(mockCategories)
        setLoading(false)
      }, 1000)
    }

    fetchData()
  }, [])

  const handleOpenForm = (category?: any) => {
    if (category) {
      setEditingCategory(category)
      setNewCategory({
        name: category.name,
        color: category.color,
        icon: category.icon || "",
      })
    } else {
      setEditingCategory(null)
      setNewCategory({
        name: "",
        color: "#3b82f6",
        icon: "",
      })
    }
    setFormOpen(true)
  }

  const handleSaveCategory = async () => {
    if (!newCategory.name) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, send to API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (editingCategory) {
        // Update existing category
        setCategories(categories.map((cat) => (cat._id === editingCategory._id ? { ...cat, ...newCategory } : cat)))

        toast({
          title: "Category updated",
          description: `Successfully updated category: ${newCategory.name}`,
        })
      } else {
        // Add new category
        const newId = (Math.max(...categories.map((c) => Number.parseInt(c._id))) + 1).toString()
        setCategories([...categories, { _id: newId, ...newCategory }])

        toast({
          title: "Category created",
          description: `Successfully created category: ${newCategory.name}`,
        })
      }

      setFormOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      // In a real app, send to API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setCategories(categories.filter((cat) => cat._id !== id))

      toast({
        title: "Category deleted",
        description: "Successfully deleted category",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
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
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage your transaction categories</p>
        </div>
        <Button onClick={() => handleOpenForm()}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category List</CardTitle>
          <CardDescription>Manage your transaction categories for better organization</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Color</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10">
                    No categories found. Add a new category to get started.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: category.color }} />
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenForm(category)}>
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
                              <AlertDialogTitle>Delete Category</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the category "{category.name}"? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteCategory(category._id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit" : "Add"} Category</DialogTitle>
            <DialogDescription>
              {editingCategory ? "Update an existing" : "Add a new"} category for organizing your transactions
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <div className="w-10 h-10 rounded" style={{ backgroundColor: newCategory.color }} />
                <Input
                  id="color"
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCategory}>{editingCategory ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

