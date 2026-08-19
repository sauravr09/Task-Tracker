import { useState, useRef, useEffect } from "react"
import Modal from "./Modal"
import type { Tag } from "../types/board"

export type TaskFormInput = {
  taskId?: string
  title: string
  description: string
  tags: Tag[]
  columnId: string
}

export type EditingTask = {
  id: string
  title: string
  description: string
  tags: Tag[]
  columnId: string
}

type ColumnOption = { id: string; name: string }

type AddTaskModalProps = {
  isOpen: boolean
  columns: ColumnOption[]
  initialColumnId?: string
  editingTask?: EditingTask | null
  onConfirm: (task: TaskFormInput) => void
  onCancel: () => void
}

const PRIORITY_OPTIONS: Tag["variant"][] = ["high", "medium", "low"]
const CATEGORY_OPTIONS: Tag["variant"][] = ["frontend", "design", "research", "ops"]

const label = (variant: string) => variant.charAt(0).toUpperCase() + variant.slice(1)

const AddTaskModal = ({ isOpen, columns, initialColumnId, editingTask, onConfirm, onCancel }: AddTaskModalProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<Tag["variant"] | "">("")
  const [category, setCategory] = useState<Tag["variant"] | "">("")
  const [columnId, setColumnId] = useState("")
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return

    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
      setPriority(editingTask.tags.find(tag => PRIORITY_OPTIONS.includes(tag.variant))?.variant ?? "")
      setCategory(editingTask.tags.find(tag => CATEGORY_OPTIONS.includes(tag.variant))?.variant ?? "")
      setColumnId(editingTask.columnId)
    } else {
      setTitle("")
      setDescription("")
      setPriority("")
      setCategory("")
      setColumnId(initialColumnId ?? columns[0]?.id ?? "")
    }
    // slight delay ensures the input exists in the DOM before focusing
    setTimeout(() => titleRef.current?.focus(), 0)
  }, [isOpen, initialColumnId, columns, editingTask])

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle || !columnId) return

    const tags: Tag[] = []
    if (priority) tags.push({ label: label(priority), variant: priority })
    if (category) tags.push({ label: label(category), variant: category })

    onConfirm({
      taskId: editingTask?.id,
      title: trimmedTitle,
      description: description.trim(),
      tags,
      columnId,
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={editingTask ? "Edit task" : "New task"} maxWidth={420}>
      <form onSubmit={handleSubmit}>
        <select
          className="modal-input modal-select"
          value={columnId}
          onChange={e => setColumnId(e.target.value)}
        >
          {columns.map(column => (
            <option key={column.id} value={column.id}>{column.name}</option>
          ))}
        </select>
        <input
          ref={titleRef}
          type="text"
          className="modal-input"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="modal-input modal-textarea"
          placeholder="Description"
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <div className="modal-field-row">
          <select
            className="modal-input modal-select"
            value={priority}
            onChange={e => setPriority(e.target.value as Tag["variant"] | "")}
          >
            <option value="">Priority</option>
            {PRIORITY_OPTIONS.map(option => (
              <option key={option} value={option}>{label(option)}</option>
            ))}
          </select>
          <select
            className="modal-input modal-select"
            value={category}
            onChange={e => setCategory(e.target.value as Tag["variant"] | "")}
          >
            <option value="">Category</option>
            {CATEGORY_OPTIONS.map(option => (
              <option key={option} value={option}>{label(option)}</option>
            ))}
          </select>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={!title.trim() || !columnId}>
            {editingTask ? "Save changes" : "Add task"}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddTaskModal
