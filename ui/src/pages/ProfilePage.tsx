import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

const DEFAULT_AVATAR = "https://i.pravatar.cc/100?img=1"

const ProfilePage = () => {
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") setAvatarUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <Header />
      <div className="profile-page">
        <div className="profile-card">
          <h1 className="auth-title">Profile</h1>
          <p className="auth-subtitle">Update your profile picture and details</p>

          <div className="profile-picture-row">
            <img className="avatar profile-avatar" src={avatarUrl} alt="Profile" />
            <div>
              <button type="button" className="btn-secondary" onClick={() => fileInputRef.current?.click()}>
                Change photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="profile-file-input"
                onChange={handlePictureChange}
              />
            </div>
          </div>

          <label htmlFor="profile-name">Name</label>
          <input id="profile-name" type="text" className="modal-input" placeholder="Your name" />

          {/* <label htmlFor="profile-email">Email</label>
          <input id="profile-email" type="email" className="modal-input" placeholder="you@example.com" /> */}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate("/home")}>
              Cancel
            </button>
            <button type="button" className="btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
