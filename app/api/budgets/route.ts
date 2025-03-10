import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("finance")

    const budgets = await db.collection("budgets").find({}).toArray()

    return NextResponse.json(budgets)
  } catch (error) {
    console.error("Error fetching budgets:", error)
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { categoryId, amount, period, startDate } = data

    if (!categoryId || !amount || !period || !startDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("finance")

    const budget = {
      categoryId,
      amount: Number(amount),
      period,
      startDate: new Date(startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("budgets").insertOne(budget)

    return NextResponse.json({ ...budget, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating budget:", error)
    return NextResponse.json({ error: "Failed to create budget" }, { status: 500 })
  }
}

