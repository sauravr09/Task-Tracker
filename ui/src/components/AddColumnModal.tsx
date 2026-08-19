import { useState, useRef, useEffect } from "react"
import Modal from "./Modal"
import { COLUMN_COLOR_OPTIONS, type ColumnColor } from "../data/columnColors"

type AddColumnModalProps = {
  isOpen: boolean
  onConfirm: (name: string, dotVariant: ColumnColor) => void
  onCancel: () => void
}

const AddColumnModal = ({ isOpen, onConfirm, onCancel }: AddColumnModalProps) => {
  const [name, setName] = useState("")
  const [color, setColor] = useState<ColumnColor>("neutral")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setName("")
      setColor("neutral")
      // slight delay ensures the input exists in the DOM before focusing
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [isOpen])

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onConfirm(trimmed, color)
  }

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="New column">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="modal-input"
          placeholder="Column name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <span className="column-menu-label">Color</span>
        <div className="color-swatch-row">
          {COLUMN_COLOR_OPTIONS.map(option => (
            <button
              key={option.variant}
              type="button"
              className={`color-swatch column-dot ${option.variant} ${color === option.variant ? "selected" : ""}`}
              aria-label={option.label}
              aria-pressed={color === option.variant}
              onClick={() => setColor(option.variant)}
            />
          ))}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={!name.trim()}>
            Add column
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddColumnModal
