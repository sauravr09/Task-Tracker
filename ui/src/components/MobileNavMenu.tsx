import { useEffect, useRef, useState, type ReactNode } from "react"

type MobileNavMenuProps = {
  children: ReactNode
}

const MobileNavMenu = ({ children }: MobileNavMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
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

  return (
    <div className="nav-mobile-menu-wrap" ref={menuRef}>
      <button
        type="button"
        className="nav-mobile-toggle"
        onClick={() => setIsOpen(open => !open)}
        aria-label="Open menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {isOpen && (
        <div className="nav-mobile-menu" role="menu" onClick={() => setIsOpen(false)}>
          {children}
        </div>
      )}
    </div>
  )
}

export default MobileNavMenu
