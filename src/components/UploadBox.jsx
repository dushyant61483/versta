import { useRef, useState } from 'react'

export default function UploadBox({ label = 'Upload a photo', onFile, previewSrc }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function handleFiles(files) {
    const file = files?.[0]
    if (file && onFile) onFile(file)
  }

  return (
    <div
      className={`upload-box ${dragging ? 'is-dragging' : ''} ${previewSrc ? 'has-preview' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      {previewSrc ? (
        <img src={previewSrc} alt="Uploaded preview" className="upload-box-preview" />
      ) : (
        <>
          <span className="upload-box-icon" aria-hidden="true">⤒</span>
          <p className="upload-box-label">{label}</p>
          <span className="upload-box-hint">Drag & drop, or click to browse</span>
        </>
      )}
    </div>
  )
}
