import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ThemeToggle } from "../components/ThemeToggle"
import { API_URL } from "../utils/constants"

type AuthMode = "login" | "register"


const LandingPage = () => {

  const [mode, setMode] = useState<AuthMode>("login")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const password = formData.get("password") as string

    
    let endpoint : string;
    let body: Record<string, string>

    if (mode === "login") {
      endpoint = "/auth/login"
      const identifier = formData.get("identifier") as string
      body = {identifier, password}
    }
    else{ 
      endpoint = "/auth/register"
      const username = formData.get("username") as string
      const email = formData.get("email") as string
      const confirmPassword = formData.get("confirmPassword") as string
      if (password != confirmPassword){ 
        setError("Passwords must match") 
        return
      };
      body = {username, email, password, confirmPassword}
    }

    try { 
      setLoading(true)
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include", // browser stores the refresh cookie 
        body: JSON.stringify(body)
      })

      const data = await res.json();

      if (!res.ok) { 
        setError(data.error ?? "Something went wrong");
        return;
      }

      navigate('/home');

    }catch{
      setError("Server is busy")
    }
    finally{
      setLoading(false)
    }




    
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


        {error && <p className="error-p">{error}</p>}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => {setMode("login") 
              setError("")}
            }
          >
            Log in
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === "register" ? "active" : ""}`}
            onClick={() => {setMode("register")
              setError("")
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
           <>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" className="modal-input" placeholder="CoolguyJosh" required/>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="modal-input" placeholder="example@gmail.com" required/>
           </>
          )}
          {mode === "login" && (
           <>
            <label htmlFor="identifier">Username or Email</label>
            <input id="identifier" name="identifier" type="text" className="modal-input" placeholder="CoolguyJosh" required/>
           </>
          )}
          <>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className="modal-input" placeholder="Password" required/>
          </>
          {mode === "register" && (
            <>
              <label htmlFor="confirm-password">Confirm password</label>
              <input id="confirm-password" name="confirmPassword" type="password" className="modal-input" placeholder="Confirm password" required/>
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
