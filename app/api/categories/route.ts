import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("finance")

    const categories = await db.collection("categories").find({}).toArray()

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, color, icon } = data

    if (!name || !color) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("finance")

    const category = {
      name,
      color,
      icon: icon || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("categories").insertOne(category)

    return NextResponse.json({ ...category, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}

