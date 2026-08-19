import { useNavigate } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle"
import AvatarMenu from "./AvatarMenu"
import MobileNavMenu from "./MobileNavMenu"

type HeaderProps = {
  onNewTaskClick?: () => void
}

const Header = ({ onNewTaskClick }: HeaderProps) => {
  const navigate = useNavigate()
  const handleNewTaskClick = onNewTaskClick ?? (() => navigate("/home", { state: { openAddTask: true } }))

  return (
    <header className="nav-bar">
      <div onClick={() => navigate("/home")} className="nav-brand">
        <div className="nav-logo">TT</div>
        <div className="nav-title-group">
          <span className="nav-title">Task Tracker</span>
        </div>
      </div>

      <div className="nav-actions">
        <div className="nav-actions-desktop">
          <button className="btn-secondary">Customize</button>
          <button className="btn-primary" onClick={handleNewTaskClick}>
            + New Task
          </button>
          <ThemeToggle />
        </div>

        <MobileNavMenu>
          <button className="btn-secondary">Customize</button>
          <button className="btn-primary" onClick={handleNewTaskClick}>
            + New Task
          </button>
          <ThemeToggle />
        </MobileNavMenu>

        <span className="nav-divider" />
        <AvatarMenu avatarUrl="https://i.pravatar.cc/100?img=1" />
      </div>
    </header>
  )
}

export default Header
