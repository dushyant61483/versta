import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Button from '../components/Button.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { defaultProfile } from '../data/profile.js'
import './Profile.css'

const STYLE_OPTIONS = ['Streetwear', 'Minimal', 'Smart Casual', 'Formal', 'Bohemian', 'Athleisure']
const FIT_OPTIONS = ['Slim', 'Regular', 'Relaxed', 'Oversized']

export default function Profile() {
  const [profile, setProfile] = useState(defaultProfile)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(defaultProfile)

  function startEdit() {
    setDraft(profile)
    setEditing(true)
  }

  function toggleStyle(style) {
    setDraft((d) => ({
      ...d,
      preferredStyles: d.preferredStyles.includes(style)
        ? d.preferredStyles.filter((s) => s !== style)
        : [...d.preferredStyles, style],
    }))
  }

  function save() {
    // TODO(Backend team): persist profile updates to the user's account
    // instead of local component state.
    setProfile(draft)
    setEditing(false)
  }

  const view = editing ? draft : profile

  return (
    <div className="page profile">
      <div className="container">
        <PageHeader
          eyebrow="Style profile"
          title="Your styling preferences"
          description="Style AI uses this to personalize recommendations. Nothing here is judged — it's just context you control."
        >
          {!editing ? (
            <Button variant="primary" onClick={startEdit}>Edit Profile</Button>
          ) : (
            <>
              <Button variant="primary" onClick={save}>Save Changes</Button>
              <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            </>
          )}
        </PageHeader>

        <div className="profile-layout">
          <div className="card profile-identity">
            <ImageWithFallback
              src={profile.avatar}
              alt={profile.name}
              className="profile-avatar"
            />
            {editing ? (
              <input
                className="profile-name-input"
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              />
            ) : (
              <h2>{profile.name}</h2>
            )}
            <span className="profile-location">📍 {profile.location}</span>
          </div>

          <div className="profile-details">
            <div className="card profile-section">
              <span className="stitch-tag">Fit & appearance</span>
              <div className="profile-grid">
                <div>
                  <span className="profile-label">Face shape</span>
                  <span className="profile-value">{profile.faceShape}</span>
                </div>
                <div>
                  <span className="profile-label">Fit preference</span>
                  {editing ? (
                    <select
                      value={draft.bodyFit}
                      onChange={(e) => setDraft((d) => ({ ...d, bodyFit: e.target.value }))}
                    >
                      {FIT_OPTIONS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="profile-value">{profile.bodyFit}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="card profile-section">
              <span className="stitch-tag">Preferred styles</span>
              <div className="profile-tags">
                {(editing ? STYLE_OPTIONS : view.preferredStyles).map((style) => {
                  const active = editing
                    ? draft.preferredStyles.includes(style)
                    : true
                  return (
                    <button
                      key={style}
                      className={`profile-tag ${active ? 'is-active' : ''} ${editing ? 'is-editable' : ''}`}
                      onClick={() => editing && toggleStyle(style)}
                      type="button"
                    >
                      {style}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="card profile-section">
              <span className="stitch-tag">Preferred colors</span>
              <div className="profile-swatches">
                {view.preferredColors.map((color) => (
                  <span key={color} className="profile-swatch" style={{ background: color }} />
                ))}
              </div>
            </div>

            <div className="card profile-section">
              <span className="stitch-tag">Favorite occasions</span>
              <div className="profile-tags">
                {view.favoriteOccasions.map((o) => (
                  <span key={o} className="profile-tag is-active">{o}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
