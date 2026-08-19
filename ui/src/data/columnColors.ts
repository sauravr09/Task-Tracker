import type { ColumnData } from "../types/board"

export type ColumnColor = ColumnData["dotVariant"]

export const COLUMN_COLOR_OPTIONS: { variant: ColumnColor; label: string }[] = [
  { variant: "neutral", label: "Gray" },
  { variant: "active", label: "Blue" },
  { variant: "review", label: "Amber" },
  { variant: "done", label: "Green" },
]
