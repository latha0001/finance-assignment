import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"
import type { Transaction, Category, Budget } from "./types"

export class DatabaseService {
  static async getTransactions(
    options: {
      limit?: number
      skip?: number
      category?: string
      startDate?: Date
      endDate?: Date
    } = {},
  ) {
    const { limit = 50, skip = 0, category, startDate, endDate } = options

    const client = await clientPromise
    const db = client.db("finance")

    const query: any = {}

    if (category) {
      query.categoryId = category
    }

    if (startDate || endDate) {
      query.date = {}
      if (startDate) query.date.$gte = startDate
      if (endDate) query.date.$lte = endDate
    }

    const transactions = await db
      .collection("transactions")
      .find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    // Enhance transactions with category information
    if (transactions.length > 0) {
      const categoryIds = [...new Set(transactions.map((t) => t.categoryId))]
      const categories = await db
        .collection("categories")
        .find({ _id: { $in: categoryIds.map((id) => new ObjectId(id)) } })
        .toArray()

      const categoryMap = new Map(categories.map((c) => [c._id.toString(), c]))

      return transactions.map((t) => ({
        ...t,
        category: categoryMap.get(t.categoryId),
      }))
    }

    return transactions
  }

  static async getTransaction(id: string) {
    const client = await clientPromise
    const db = client.db("finance")

    const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(id) })

    if (!transaction) return null

    const category = await db.collection("categories").findOne({ _id: new ObjectId(transaction.categoryId) })

    return {
      ...transaction,
      category,
    }
  }

  static async createTransaction(data: Omit<Transaction, "_id">) {
    const client = await clientPromise
    const db = client.db("finance")

    const transaction = {
      ...data,
      date: new Date(data.date),
      amount: Number(data.amount),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("transactions").insertOne(transaction)

    return { ...transaction, _id: result.insertedId }
  }

  static async updateTransaction(id: string, data: Partial<Transaction>) {
    const client = await clientPromise
    const db = client.db("finance")

    const updates: any = {
      ...data,
      updatedAt: new Date(),
    }

    if (updates.date) updates.date = new Date(updates.date)
    if (updates.amount) updates.amount = Number(updates.amount)

    const result = await db.collection("transactions").updateOne({ _id: new ObjectId(id) }, { $set: updates })

    if (result.matchedCount === 0) return null

    return this.getTransaction(id)
  }

  static async deleteTransaction(id: string) {
    const client = await clientPromise
    const db = client.db("finance")

    const result = await db.collection("transactions").deleteOne({ _id: new ObjectId(id) })

    return result.deletedCount > 0
  }

  static async getCategories() {
    const client = await clientPromise
    const db = client.db("finance")

    const categories = await db.collection("categories").find({}).toArray()

    return categories
  }

  static async createCategory(data: Omit<Category, "_id">) {
    const client = await clientPromise
    const db = client.db("finance")

    const category = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("categories").insertOne(category)

    return { ...category, _id: result.insertedId }
  }

  static async getBudgets() {
    const client = await clientPromise
    const db = client.db("finance")

    const budgets = await db.collection("budgets").find({}).toArray()

    // Enhance budgets with category information and spending data
    if (budgets.length > 0) {
      const categoryIds = [...new Set(budgets.map((b) => b.categoryId))]
      const categories = await db
        .collection("categories")
        .find({ _id: { $in: categoryIds.map((id) => new ObjectId(id)) } })
        .toArray()

      const categoryMap = new Map(categories.map((c) => [c._id.toString(), c]))

      // Calculate spending for each budget
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

      const result = []

      for (const budget of budgets) {
        // Get total spending for this category in the current month
        const spendingData = await db
          .collection("transactions")
          .aggregate([
            {
              $match: {
                categoryId: budget.categoryId,
                type: "expense",
                date: {
                  $gte: startOfMonth,
                  $lte: endOfMonth,
                },
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$amount" },
              },
            },
          ])
          .toArray()

        const spent = spendingData.length > 0 ? Math.abs(spendingData[0].total) : 0

        result.push({
          ...budget,
          category: categoryMap.get(budget.categoryId),
          spent,
        })
      }

      return result
    }

    return budgets
  }

  static async createBudget(data: Omit<Budget, "_id">) {
    const client = await clientPromise
    const db = client.db("finance")

    const budget = {
      ...data,
      amount: Number(data.amount),
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("budgets").insertOne(budget)

    return { ...budget, _id: result.insertedId }
  }

  static async getMonthlyData() {
    const client = await clientPromise
    const db = client.db("finance")

    // Get monthly data for the past 12 months
    const now = new Date()
    const months = []

    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
      const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0)

      const monthName = monthDate.toLocaleString("default", { month: "short" })

      // Get expense data for this month
      const expenseData = await db
        .collection("transactions")
        .aggregate([
          {
            $match: {
              type: "expense",
              date: {
                $gte: monthStart,
                $lte: monthEnd,
              },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
        ])
        .toArray()

      const expenses = expenseData.length > 0 ? Math.abs(expenseData[0].total) : 0

      months.unshift({
        name: monthName,
        expenses,
      })
    }

    return months
  }

  static async getCategoryBreakdown() {
    const client = await clientPromise
    const db = client.db("finance")

    // Get spending by category for the current month
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    const categoryData = await db
      .collection("transactions")
      .aggregate([
        {
          $match: {
            type: "expense",
            date: {
              $gte: startOfMonth,
              $lte: endOfMonth,
            },
          },
        },
        {
          $group: {
            _id: "$categoryId",
            total: { $sum: { $abs: "$amount" } },
          },
        },
      ])
      .toArray()

    if (categoryData.length === 0) return []

    // Get category details
    const categoryIds = categoryData.map((c) => c._id)
    const categories = await db
      .collection("categories")
      .find({ _id: { $in: categoryIds.map((id) => new ObjectId(id)) } })
      .toArray()

    const categoryMap = new Map(categories.map((c) => [c._id.toString(), c]))

    return categoryData.map((item) => ({
      name: categoryMap.get(item._id)?.name || "Uncategorized",
      value: item.total,
      color: categoryMap.get(item._id)?.color || "#999999",
    }))
  }
}

