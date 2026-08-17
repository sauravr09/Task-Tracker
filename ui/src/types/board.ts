export type Tag = {
  label: string
  variant: "high" | "medium" | "low" | "frontend" | "design" | "research" | "ops"
}

export type Task = {
  id: string
  title: string
  description: string
  tags: Tag[]
  ref: string
  date: string
}

export type ColumnData = {
  id: string
  name: string
  dotVariant: "neutral" | "active" | "review" | "done"
  tasks: Task[]
}