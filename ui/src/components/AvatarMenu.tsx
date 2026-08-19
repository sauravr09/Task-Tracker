import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

type AvatarMenuProps = {
  avatarUrl: string
}

const AvatarMenu = ({ avatarUrl }: AvatarMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

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

  const handleProfile = () => {
    setIsOpen(false)
    navigate("/profile")
  }

  const handleLogout = () => {
    setIsOpen(false)
    navigate("/")
  }

  return (
    <div className="avatar-menu-wrap" ref={menuRef}>
      <button
        type="button"
        className="avatar-btn"
        onClick={() => setIsOpen(open => !open)}
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <img className="avatar" src={avatarUrl} alt="Avatar" />
      </button>

      {isOpen && (
        <div className="avatar-menu" role="menu">
          <button type="button" className="avatar-menu-item" role="menuitem" onClick={handleProfile}>
            Profile
          </button>
          <button type="button" className="avatar-menu-item" role="menuitem" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default AvatarMenu
