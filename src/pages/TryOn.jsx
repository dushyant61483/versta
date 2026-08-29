import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import UploadBox from '../components/UploadBox.jsx'
import Button from '../components/Button.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { outfits } from '../data/outfits.js'
import { generateTryOn } from '../services/tryOnService.js'
import './TryOn.css'

export default function TryOn({ selectedOutfit, onSelectOutfit }) {
  const [photo, setPhoto] = useState(null)
  const [outfit, setOutfit] = useState(selectedOutfit || outfits[0])
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  function handlePhoto(file) {
    if (!file) return

    if (photo?.startsWith('blob:')) {
      URL.revokeObjectURL(photo)
    }

    const url = URL.createObjectURL(file)
    setPhoto(url)
    setStatus('idle')
    setResult(null)
  }

  function pickOutfit(o) {
    setOutfit(o)
    onSelectOutfit?.(o)
    setStatus('idle')
    setResult(null)
  }

  async function handleGenerate() {
    setStatus('loading')
    setError(null)
    try {
      const res = await generateTryOn({ userPhoto: photo, outfit })
      setResult(res)
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  function reset() {
    if (photo?.startsWith('blob:')) {
      URL.revokeObjectURL(photo)
    }
    setPhoto(null)
    setResult(null)
    setStatus('idle')
    setError(null)
  }

  return (
    <div className="page tryon">
      <div className="container">
        <PageHeader
          eyebrow="Virtual try-on"
          title="See it on yourself first"
          description="Upload a photo, pick a look from your recommendations, and preview it — no fitting room needed."
        />

        <div className="tryon-layout">
          <div className="tryon-col">
            <span className="stitch-tag">Step 1 · Your photo</span>
            <UploadBox label="Upload a full-length photo" onFile={handlePhoto} previewSrc={photo} />
            {photo && (
              <button className="btn btn-ghost tryon-clear" onClick={reset}>
                Remove photo
              </button>
            )}
          </div>

          <div className="tryon-col">
            <span className="stitch-tag">Step 2 · Pick an outfit</span>
            <div className="tryon-outfit-list">
              {outfits.map((o) => (
                <button
                  key={o.id}
                  className={`tryon-outfit-pill ${outfit?.id === o.id ? 'is-active' : ''}`}
                  onClick={() => pickOutfit(o)}
                >
                  <ImageWithFallback src={o.image} alt={o.name} className="tryon-outfit-thumb" />
                  <span>{o.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="tryon-col tryon-result-col">
            <span className="stitch-tag">Step 3 · Preview</span>

            <div className="tryon-result-frame">
              {status === 'loading' && (
                <div className="tryon-result-state">
                  <span className="loading-stitch" aria-hidden="true" />
                  <p>Fitting {outfit?.name} to your photo…</p>
                </div>
              )}

              {status === 'idle' && !result && (
                <div className="tryon-result-state">
                  <span aria-hidden="true">✦</span>
                  <p>Your preview will appear here.</p>
                </div>
              )}

              {status === 'error' && (
                <div className="tryon-result-state">
                  <p>{error}</p>
                </div>
              )}

              {status === 'done' && result && (
                <div className="tryon-result-done">
                  <img src={result.resultImage} alt={`${outfit.name} try-on preview`} />
                  <span className="tryon-mock-badge">Mock preview — real AI generation coming soon</span>
                </div>
              )}
            </div>

            <div className="tryon-actions">
              <Button
                variant="primary"
                block
                onClick={handleGenerate}
                disabled={!photo || !outfit || status === 'loading'}
              >
                {status === 'loading' ? 'Generating…' : 'Generate Try-On'}
              </Button>
              {result && (
                <Button variant="outline" block onClick={reset}>
                  Try Another Photo
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
