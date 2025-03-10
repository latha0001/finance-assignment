export type Transaction = {
  _id?: string
  amount: number
  description: string
  date: Date | string
  categoryId: string
  type: "income" | "expense"
  createdAt?: Date
  updatedAt?: Date
}

export type Category = {
  _id?: string
  name: string
  color: string
  icon?: string
  createdAt?: Date
  updatedAt?: Date
}

export type Budget = {
  _id?: string
  categoryId: string
  amount: number
  period: string // 'monthly', 'weekly', etc.
  startDate: Date | string
  endDate?: Date | string
  createdAt?: Date
  updatedAt?: Date
}

