import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import WardrobeItem from '../components/WardrobeItem.jsx'
import EmptyState from '../components/EmptyState.jsx'
import UploadBox from '../components/UploadBox.jsx'
import Button from '../components/Button.jsx'
import { wardrobeCategories, wardrobeItems as initialItems } from '../data/wardrobe.js'
import './Wardrobe.css'

export default function Wardrobe() {
  const [items, setItems] = useState(initialItems)
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [showUpload, setShowUpload] = useState(false)
  const [pendingCategory, setPendingCategory] = useState(wardrobeCategories[0])
  const [pendingPreview, setPendingPreview] = useState(null)
  const [pendingName, setPendingName] = useState('')

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [items, activeCategory, query])

  function handleFile(file) {
    if (!file) return

    if (pendingPreview?.startsWith('blob:')) {
      URL.revokeObjectURL(pendingPreview)
    }

    const url = URL.createObjectURL(file)
    setPendingPreview(url)
    if (!pendingName) setPendingName(file.name.replace(/\.[^.]+$/, ''))
  }

  function addItem() {
    if (!pendingPreview) return
    const newItem = {
      id: `w-${Date.now()}`,
      name: pendingName || 'New item',
      category: pendingCategory,
      color: '#c9a227',
      image: pendingPreview,
    }
    // TODO(Backend team): upload the file to cloud storage and persist the
    // wardrobe record instead of only keeping it in local component state.
    setItems((prev) => [newItem, ...prev])
    setShowUpload(false)
    if (pendingPreview?.startsWith('blob:')) {
      URL.revokeObjectURL(pendingPreview)
    }
    setPendingPreview(null)
    setPendingName('')
  }

  return (
    <div className="page wardrobe">
      <div className="container">
        <PageHeader
          eyebrow="My wardrobe"
          title="Clothes you already own"
          description="Style AI builds outfits from these pieces first, so getting dressed uses what's already in your closet."
        >
          <Button variant="primary" onClick={() => setShowUpload((v) => !v)}>
            {showUpload ? 'Close' : '+ Add Item'}
          </Button>
        </PageHeader>

        {showUpload && (
          <div className="card wardrobe-upload">
            <div className="wardrobe-upload-media">
              <UploadBox
                label="Upload a photo of the item"
                onFile={handleFile}
                previewSrc={pendingPreview}
              />
            </div>
            <div className="wardrobe-upload-form">
              <label className="wardrobe-field">
                <span>Name</span>
                <input
                  type="text"
                  value={pendingName}
                  onChange={(e) => setPendingName(e.target.value)}
                  placeholder="e.g. Olive Green Shirt"
                />
              </label>
              <label className="wardrobe-field">
                <span>Category</span>
                <select value={pendingCategory} onChange={(e) => setPendingCategory(e.target.value)}>
                  {wardrobeCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <Button variant="primary" onClick={addItem} disabled={!pendingPreview}>
                Save to Wardrobe
              </Button>
            </div>
          </div>
        )}

        <div className="wardrobe-toolbar">
          <div className="wardrobe-categories">
            <button
              className={`rec-pill ${activeCategory === 'All' ? 'is-active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >
              All ({items.length})
            </button>
            {wardrobeCategories.map((c) => (
              <button
                key={c}
                className={`rec-pill ${activeCategory === c ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            type="search"
            className="wardrobe-search"
            placeholder="Search your wardrobe…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="👕"
            title="Nothing here yet"
            description="Add a few pieces so Style AI can start building outfits from your own wardrobe."
            action={
              <Button variant="outline" onClick={() => setShowUpload(true)}>
                Add your first item
              </Button>
            }
          />
        ) : (
          <div className="wardrobe-grid">
            {filtered.map((item) => (
              <WardrobeItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
