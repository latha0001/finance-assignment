import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const client = await clientPromise
    const db = client.db("finance")

    const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(id) })

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json(transaction)
  } catch (error) {
    console.error("Error fetching transaction:", error)
    return NextResponse.json({ error: "Failed to fetch transaction" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
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
      updatedAt: new Date(),
    }

    const result = await db.collection("transactions").updateOne({ _id: new ObjectId(id) }, { $set: transaction })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ ...transaction, _id: id })
  } catch (error) {
    console.error("Error updating transaction:", error)
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const client = await clientPromise
    const db = client.db("finance")

    const result = await db.collection("transactions").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting transaction:", error)
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 })
  }
}

