import { useState, useRef, useEffect } from "react"
import Column from "./Column"
import AddColumnModal from "./AddColumnModal"
import type { ColumnData } from "../types/board"
import { initialColumns } from "../data/tasks"

let nextColumnId = 1

const Board = () => {
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns)
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const boardRef = useRef<HTMLDivElement>(null)
  const prevCountRef = useRef(columns.length)

  useEffect(() => {
    if (columns.length > prevCountRef.current) {
      boardRef.current?.scrollTo({ left: boardRef.current.scrollWidth, behavior: "smooth" })
    }
    prevCountRef.current = columns.length
  }, [columns.length])

  const handleConfirmAddColumn = (name: string) => {
    const newColumn: ColumnData = {
      id: `col-new-${nextColumnId++}`,
      name,
      dotVariant: "neutral",
      tasks: [],
    }
    setColumns(prev => [...prev, newColumn])
    setIsAddingColumn(false)
  }

  const handleAddTask = (columnId: string) => {
    // placeholder for now — wire up to a real "new task" form/modal later
    console.log("Add task to", columnId)
  }

  return (
    <div className="board" ref={boardRef}>
      {columns.map(column => (
        <Column
          key={column.id}
          name={column.name}
          count={column.tasks.length}
          dotVariant={column.dotVariant}
          tasks={column.tasks}
          onAddTask={() => handleAddTask(column.id)}
        />
      ))}

      <button className="add-column-btn" onClick={() => setIsAddingColumn(true)}>
        + Add column
      </button>

      <AddColumnModal
        isOpen={isAddingColumn}
        onConfirm={handleConfirmAddColumn}
        onCancel={() => setIsAddingColumn(false)}
      />
    </div>
  )
}

export default Board