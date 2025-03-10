import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const skip = Number.parseInt(searchParams.get("skip") || "0")
    const category = searchParams.get("category")

    const client = await clientPromise
    const db = client.db("finance")

    const query: any = {}
    if (category) {
      query.categoryId = category
    }

    const transactions = await db
      .collection("transactions")
      .find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { amount, description, date, categoryId, type } = data

    if (!amount || !description || !date || !categoryId || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("finance")

    const transaction = {
      amount: Number(amount),
      description,
      date: new Date(date),
      categoryId,
      type,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("transactions").insertOne(transaction)

    return NextResponse.json({ ...transaction, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating transaction:", error)
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}

