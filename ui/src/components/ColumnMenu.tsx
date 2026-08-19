import { useEffect, useRef, useState } from "react"
import { COLUMN_COLOR_OPTIONS, type ColumnColor } from "../data/columnColors"

type ColumnMenuProps = {
  columnId: string
  name: string
  dotVariant: ColumnColor
  onSave: (columnId: string, name: string, dotVariant: ColumnColor) => void
}

const ColumnMenu = ({ columnId, name, dotVariant, onSave }: ColumnMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [draftName, setDraftName] = useState(name)
  const [draftColor, setDraftColor] = useState<ColumnColor>(dotVariant)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const handleToggle = () => {
    if (!isOpen) {
      setDraftName(name)
      setDraftColor(dotVariant)
    }
    setIsOpen(open => !open)
  }

  const handleSave = () => {
    const trimmed = draftName.trim()
    if (!trimmed) return
    onSave(columnId, trimmed, draftColor)
    setIsOpen(false)
  }

  return (
    <div className="column-menu-wrap" ref={menuRef}>
      <button
        type="button"
        className="icon-btn"
        aria-label="Column options"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        ···
      </button>

      {isOpen && (
        <div className="column-menu" role="menu">
          <label htmlFor={`column-name-${columnId}`}>Name</label>
          <input
            id={`column-name-${columnId}`}
            type="text"
            className="modal-input column-menu-input"
            value={draftName}
            onChange={e => setDraftName(e.target.value)}
          />

          <span className="column-menu-label">Color</span>
          <div className="color-swatch-row">
            {COLUMN_COLOR_OPTIONS.map(option => (
              <button
                key={option.variant}
                type="button"
                className={`color-swatch column-dot ${option.variant} ${draftColor === option.variant ? "selected" : ""}`}
                aria-label={option.label}
                aria-pressed={draftColor === option.variant}
                onClick={() => setDraftColor(option.variant)}
              />
            ))}
          </div>

          <div className="modal-actions column-menu-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn-primary" disabled={!draftName.trim()} onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColumnMenu
