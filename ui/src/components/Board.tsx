import { useState, useRef, useEffect } from "react"
import Column from "./Column"
import AddColumnModal from "./AddColumnModal"
import type { ColumnData, Task } from "../types/board"
import type { ColumnColor } from "../data/columnColors"

type BoardProps = {
  columns: ColumnData[]
  onAddColumn: (name: string, dotVariant: ColumnColor) => void
  onOpenAddTask: (columnId: string) => void
  onMoveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void
  onEditTask: (task: Task, columnId: string) => void
  onEditColumn: (columnId: string, name: string, dotVariant: ColumnData["dotVariant"]) => void
}

const Board = ({ columns, onAddColumn, onOpenAddTask, onMoveTask, onEditTask, onEditColumn }: BoardProps) => {
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const boardRef = useRef<HTMLDivElement>(null)
  const prevCountRef = useRef(columns.length)

  useEffect(() => {
    if (columns.length > prevCountRef.current) {
      boardRef.current?.scrollTo({ left: boardRef.current.scrollWidth, behavior: "smooth" })
    }
    prevCountRef.current = columns.length
  }, [columns.length])

  const handleConfirmAddColumn = (name: string, dotVariant: ColumnColor) => {
    onAddColumn(name, dotVariant)
    setIsAddingColumn(false)
  }

  return (
    <div className="board" ref={boardRef}>
      {columns.map(column => (
        <Column
          key={column.id}
          id={column.id}
          name={column.name}
          count={column.tasks.length}
          dotVariant={column.dotVariant}
          tasks={column.tasks}
          otherColumns={columns
            .filter(other => other.id !== column.id)
            .map(other => ({ id: other.id, name: other.name }))}
          onAddTask={() => onOpenAddTask(column.id)}
          onMoveTask={onMoveTask}
          onEditTask={onEditTask}
          onEditColumn={onEditColumn}
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
