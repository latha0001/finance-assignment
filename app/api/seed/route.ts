import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("finance")

    // Create collections if they don't exist
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map((c) => c.name)

    if (!collectionNames.includes("categories")) {
      await db.createCollection("categories")
    }

    if (!collectionNames.includes("transactions")) {
      await db.createCollection("transactions")
    }

    if (!collectionNames.includes("budgets")) {
      await db.createCollection("budgets")
    }

    // Check if categories already exist
    const categoriesCount = await db.collection("categories").countDocuments()

    if (categoriesCount === 0) {
      // Seed categories
      const categories = [
        { name: "Food & Dining", color: "#FF6384", icon: "utensils", createdAt: new Date(), updatedAt: new Date() },
        { name: "Shopping", color: "#36A2EB", icon: "shopping-bag", createdAt: new Date(), updatedAt: new Date() },
        { name: "Transportation", color: "#FFCE56", icon: "car", createdAt: new Date(), updatedAt: new Date() },
        { name: "Entertainment", color: "#4BC0C0", icon: "film", createdAt: new Date(), updatedAt: new Date() },
        { name: "Utilities", color: "#9966FF", icon: "home", createdAt: new Date(), updatedAt: new Date() },
        { name: "Income", color: "#4BC0C0", icon: "money-bill", createdAt: new Date(), updatedAt: new Date() },
        { name: "Other", color: "#FF9F40", icon: "ellipsis-h", createdAt: new Date(), updatedAt: new Date() },
      ]

      await db.collection("categories").insertMany(categories)
    }

    // Check if we already have transactions
    const transactionsCount = await db.collection("transactions").countDocuments()

    if (transactionsCount === 0) {
      // Get category IDs
      const categories = await db.collection("categories").find({}).toArray()
      const categoryMap = new Map(categories.map((c) => [c.name, c._id.toString()]))

      // Generate transactions spanning the last 3 months
      const transactions = []
      const now = new Date()

      // Sample transactions
      transactions.push({
        description: "Monthly Salary",
        amount: 3000,
        date: new Date(now.getFullYear(), now.getMonth(), 2),
        categoryId: categoryMap.get("Income"),
        type: "income",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      transactions.push({
        description: "Grocery Shopping",
        amount: -84.97,
        date: new Date(now.getFullYear(), now.getMonth(), 5),
        categoryId: categoryMap.get("Food & Dining"),
        type: "expense",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      transactions.push({
        description: "Utility Bill",
        amount: -120.5,
        date: new Date(now.getFullYear(), now.getMonth(), 10),
        categoryId: categoryMap.get("Utilities"),
        type: "expense",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      transactions.push({
        description: "Online Shopping",
        amount: -65.25,
        date: new Date(now.getFullYear(), now.getMonth(), 15),
        categoryId: categoryMap.get("Shopping"),
        type: "expense",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      transactions.push({
        description: "Dinner with Friends",
        amount: -45.8,
        date: new Date(now.getFullYear(), now.getMonth(), 20),
        categoryId: categoryMap.get("Food & Dining"),
        type: "expense",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      // Previous month
      transactions.push({
        description: "Monthly Salary",
        amount: 3000,
        date: new Date(now.getFullYear(), now.getMonth() - 1, 2),
        categoryId: categoryMap.get("Income"),
        type: "income",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      transactions.push({
        description: "Grocery Shopping",
        amount: -94.32,
        date: new Date(now.getFullYear(), now.getMonth() - 1, 5),
        categoryId: categoryMap.get("Food & Dining"),
        type: "expense",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await db.collection("transactions").insertMany(transactions)
    }

    // Check if we already have budgets
    const budgetsCount = await db.collection("budgets").countDocuments()

    if (budgetsCount === 0) {
      // Get category IDs
      const categories = await db.collection("categories").find({}).toArray()
      const categoryMap = new Map(categories.map((c) => [c.name, c._id.toString()]))

      // Create budgets
      const budgets = [
        {
          categoryId: categoryMap.get("Food & Dining"),
          amount: 500,
          period: "monthly",
          startDate: new Date(now.getFullYear(), now.getMonth(), 1),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: categoryMap.get("Shopping"),
          amount: 300,
          period: "monthly",
          startDate: new Date(now.getFullYear(), now.getMonth(), 1),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: categoryMap.get("Transportation"),
          amount: 200,
          period: "monthly",
          startDate: new Date(now.getFullYear(), now.getMonth(), 1),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: categoryMap.get("Entertainment"),
          amount: 150,
          period: "monthly",
          startDate: new Date(now.getFullYear(), now.getMonth(), 1),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: categoryMap.get("Utilities"),
          amount: 200,
          period: "monthly",
          startDate: new Date(now.getFullYear(), now.getMonth(), 1),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      await db.collection("budgets").insertMany(budgets)
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to seed database",
      },
      { status: 500 },
    )
  }
}

