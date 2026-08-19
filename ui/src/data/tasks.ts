import type { ColumnData } from "../types/board"

export const initialColumns: ColumnData[] = [
  {
    id: "col-todo",
    name: "To Do",
    dotVariant: "neutral",
    tasks: [
      {
        id: "TSK-118",
        title: "Define WIP limit rules per column",
        description: "Decide whether limits are soft warnings or hard blocks, and where the counter...",
        tags: [
          { label: "Medium", variant: "medium" },
          { label: "Research", variant: "research" },
        ],
        ref: "TSK-118",
        date: "Aug 21",
      },
      {
        id: "TSK-1180",
        title: "Define WIP limit rules per column",
        description: "Decide whether limits are soft warnings or hard blocks, and where the counter...",
        tags: [
          { label: "Medium", variant: "medium" },
          { label: "Research", variant: "research" },
        ],
        ref: "TSK-1180",
        date: "Aug 21",
      },
      {
        id: "TSK-1181",
        title: "Define WIP limit rules per column",
        description: "Decide whether limits are soft warnings or hard blocks, and where the counter...",
        tags: [
          { label: "Medium", variant: "medium" },
          { label: "Research", variant: "research" },
        ],
        ref: "TSK-1181",
        date: "Aug 21",
      },
    ],
  },
  {
    id: "col-in-progress",
    name: "In Progress",
    dotVariant: "active",
    tasks: [
      {
        id: "TSK-104",
        title: "Keyboard-only card movement",
        description: "Shift + arrow shifts the focused card across columns with a live region announcement.",
        tags: [
          { label: "High", variant: "high" },
          { label: "Frontend", variant: "frontend" },
        ],
        ref: "TSK-104",
        date: "Today",
      },
    ],
  },
  {
    id: "col-testing",
    name: "Testing",
    dotVariant: "review",
    tasks: [],
  },
  {
    id: "col-done",
    name: "Done",
    dotVariant: "done",
    tasks: [
      {
        id: "TSK-88",
        title: "Tag colour tokens",
        description: "One chroma, one lightness, hue-varied — passes AA on tinted chips.",
        tags: [{ label: "Design", variant: "design" }],
        ref: "TSK-88",
        date: "Aug 12",
      },
    ],
  },
]