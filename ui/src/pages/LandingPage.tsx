import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ThemeToggle } from "../components/ThemeToggle"

type AuthMode = "login" | "register"

const LandingPage = () => {
  const [mode, setMode] = useState<AuthMode>("login")
  const navigate = useNavigate()

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate("/home")
  }

  return (
    <div className="landing-page">
      <div className="login-page-theme"><ThemeToggle/></div>
      <div className="auth-card">
        <div className="nav-logo auth-logo">TT</div>
        <h1 className="auth-title">Task Tracker</h1>
        <p className="auth-subtitle">
          {mode === "login" ? "Log in to see your tasks" : "Create an account to get started"}
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
          >
            Log in
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === "register" ? "active" : ""}`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
           <>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" className="modal-input" placeholder="John" />
           </>
          )}
          <>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" className="modal-input" placeholder="example@gmail.com" />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" className="modal-input" placeholder="Password" />
          </>
          {mode === "register" && (
            <>
              <label htmlFor="confirm-password">Confirm password</label>
              <input id="confirm-password" type="password" className="modal-input" placeholder="Confirm password" />
            </>
          )}

          <button type="submit" className="btn-primary auth-submit">
            {mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LandingPage
