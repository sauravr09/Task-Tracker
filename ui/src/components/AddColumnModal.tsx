import { useState, useRef, useEffect } from "react"
import Modal from "./Modal"

type AddColumnModalProps = {
  isOpen: boolean
  onConfirm: (name: string) => void
  onCancel: () => void
}

const AddColumnModal = ({ isOpen, onConfirm, onCancel }: AddColumnModalProps) => {
  const [name, setName] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setName("")
      // slight delay ensures the input exists in the DOM before focusing
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onConfirm(trimmed)
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