import { ThemeToggle } from "./ThemeToggle"

const Header = () => {
  return (
    <header className="nav-bar">
      <div className="nav-brand">
        <div className="nav-logo">TT</div>
        <div className="nav-title-group">
          <span className="nav-title">Task Tracker</span>
        </div>
      </div>

      <div className="nav-actions">
        <button className="btn-secondary">Projects</button>
        <ThemeToggle />
        <button className="btn-primary">Login</button>
      </div>
    </header>
  )
}

export default Header