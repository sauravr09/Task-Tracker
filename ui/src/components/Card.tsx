import { useEffect, useRef, useState } from "react"
import type { Task } from "../types/board"

type ColumnOption = { id: string; name: string }

type CardProps = {
  task: Task
  columnId: string
  otherColumns: ColumnOption[]
  onMoveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void
  onEditTask: (task: Task, columnId: string) => void
}

const Card = ({ task, columnId, otherColumns, onMoveTask, onEditTask }: CardProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isMoveMenuOpen, setIsMoveMenuOpen] = useState(false)
  const moveWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMoveMenuOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (moveWrapRef.current && !moveWrapRef.current.contains(e.target as Node)) {
        setIsMoveMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMoveMenuOpen])

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", JSON.stringify({ taskId: task.id, fromColumnId: columnId }))
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleMoveTo = (targetColumnId: string) => {
    onMoveTask(task.id, columnId, targetColumnId)
    setIsMoveMenuOpen(false)
  }

  return (
    <div
      className={`card ${isDragging ? "dragging" : ""}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card-title-row">
        <span className="card-drag-handle">≡</span>
        <span className="card-title">{task.title}</span>
      </div>
      <p className="card-description">{task.description}</p>
      <div className="card-tags">
        {task.tags.map(tag => (
          <span key={tag.label} className={`tag tag-${tag.variant}`}>
            <span className="tag-dot" />
            {tag.label}
          </span>
        ))}
      </div>
      <div className="card-divider" />
      <div className="card-footer">
        <span className="card-meta">{task.ref} · {task.date}</span>
        <div className="card-footer-actions">
          <div className="move-to-wrap" ref={moveWrapRef}>
            <button
              type="button"
              className="move-to-btn"
              disabled={otherColumns.length === 0}
              onClick={() => setIsMoveMenuOpen(open => !open)}
            >
              Move to...
            </button>
            {isMoveMenuOpen && (
              <div className="move-to-menu" role="menu">
                {otherColumns.map(column => (
                  <button
                    key={column.id}
                    type="button"
                    className="move-to-menu-item"
                    role="menuitem"
                    onClick={() => handleMoveTo(column.id)}
                  >
                    {column.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="icon-btn" aria-label="Edit" onClick={() => onEditTask(task, columnId)}>✏️</button>
          <button className="icon-btn" aria-label="Remove">×</button>
        </div>
      </div>
    </div>
  )
}

export default Card
