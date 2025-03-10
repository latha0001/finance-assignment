"use client"

import { Skeleton } from "@/components/ui/skeleton"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Mock categories
const categories = [
  { id: "food", name: "Food & Dining", color: "#FF6384" },
  { id: "shopping", name: "Shopping", color: "#36A2EB" },
  { id: "transportation", name: "Transportation", color: "#FFCE56" },
  { id: "entertainment", name: "Entertainment", color: "#4BC0C0" },
  { id: "utilities", name: "Utilities", color: "#9966FF" },
  { id: "income", name: "Income", color: "#4BC0C0" },
  { id: "other", name: "Other", color: "#FF9F40" },
]

const transactionSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) !== 0, {
    message: "Amount must be a non-zero number.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  categoryId: z.string({
    required_error: "Please select a category.",
  }),
  type: z.enum(["income", "expense"], {
    required_error: "Please select a transaction type.",
  }),
  notes: z.string().optional(),
})

export function TransactionForm({ transactionId }: { transactionId?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loadingTransaction, setLoadingTransaction] = useState(!!transactionId)

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      amount: "",
      date: new Date(),
      categoryId: "",
      type: "expense",
      notes: "",
    },
  })

  useEffect(() => {
    if (transactionId) {
      // In a real app, fetch transaction from API
      // Simulate API call for now
      setTimeout(() => {
        form.reset({
          description: "Grocery Shopping",
          amount: "84.97",
          date: new Date(2023, 4, 15),
          categoryId: "food",
          type: "expense",
          notes: "Weekly groceries",
        })
        setLoadingTransaction(false)
      }, 1000)
    }
  }, [transactionId, form])

  async function onSubmit(values: z.infer<typeof transactionSchema>) {
    setLoading(true)

    try {
      // In a real app, send data to API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: transactionId ? "Transaction updated" : "Transaction created",
        description: `Successfully ${transactionId ? "updated" : "created"} transaction: ${values.description}`,
      })

      router.push("/transactions")
      router.refresh()
    } catch (error) {
      console.error("Error saving transaction:", error)
      toast({
        title: "Error",
        description: "Failed to save transaction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loadingTransaction) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-1/4" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{transactionId ? "Edit" : "New"} Transaction</CardTitle>
        <CardDescription>
          {transactionId ? "Edit an existing" : "Add a new"} financial transaction to your records
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-2">
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="expense" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Expense</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="income" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Income</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter transaction description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                      <Input placeholder="0.00" className="pl-8" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>Enter the amount without currency symbols</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center">
                              <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: category.color }} />
                              {category.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes about this transaction"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/transactions")}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : transactionId ? "Update" : "Create"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

