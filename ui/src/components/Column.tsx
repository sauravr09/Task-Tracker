import { useState } from "react"
import type { ColumnData, Task } from "../types/board"
import Card from "./Card"
import ColumnMenu from "./ColumnMenu"

type ColumnOption = { id: string; name: string }

type ColumnProps = {
  id: string
  name: string
  count: number
  dotVariant?: ColumnData["dotVariant"]
  tasks: Task[]
  otherColumns: ColumnOption[]
  onAddTask?: () => void
  onMoveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void
  onEditTask: (task: Task, columnId: string) => void
  onEditColumn: (columnId: string, name: string, dotVariant: ColumnData["dotVariant"]) => void
}

const Column = ({ id, name, count, dotVariant = "neutral", tasks, otherColumns, onAddTask, onMoveTask, onEditTask, onEditColumn }: ColumnProps) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    if (!isDragOver) setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    const raw = e.dataTransfer.getData("text/plain")
    if (!raw) return

    const { taskId, fromColumnId } = JSON.parse(raw) as { taskId: string; fromColumnId: string }
    if (fromColumnId === id) return
    onMoveTask(taskId, fromColumnId, id)
  }

  return (
    <div
      className={`column ${isDragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <div className="column-heading">
          <span className={`column-dot ${dotVariant}`} />
          <span className="column-title">{name}</span>
          <span className="column-count">{count}</span>
        </div>
        <div className="column-header-actions">
          <button className="icon-btn" aria-label="Add task" onClick={onAddTask}>+</button>
          <ColumnMenu columnId={id} name={name} dotVariant={dotVariant} onSave={onEditColumn} />
        </div>
      </div>

      <div className="column-body">
        {tasks.map(task => (
          <Card
            key={task.id}
            task={task}
            columnId={id}
            otherColumns={otherColumns}
            onMoveTask={onMoveTask}
            onEditTask={onEditTask}
          />
        ))}

        {tasks.length === 0 && (
          <div className="column-empty">
            <p>No tasks yet</p>
            <button className="add-a-task-link" onClick={onAddTask}>Add a task</button>
          </div>
        )}
      </div>

      <button className="add-task-btn" onClick={onAddTask}>+ Add task</button>
    </div>
  )
}

export default Column
