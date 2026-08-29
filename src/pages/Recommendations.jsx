import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import WeatherCard from '../components/WeatherCard.jsx'
import OccasionSelector from '../components/OccasionSelector.jsx'
import OutfitCard from '../components/OutfitCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { getWeather } from '../services/weatherService.js'
import { getRecommendations } from '../services/recommendationService.js'
import './Recommendations.css'

const SORTS = [
  { id: 'overall', label: 'Overall match' },
  { id: 'style', label: 'Style score' },
  { id: 'weather', label: 'Weather fit' },
]

export default function Recommendations({ onNavigate, onSelectOutfit, selectedOutfit }) {
  const [weather, setWeather] = useState(null)
  const [occasion, setOccasion] = useState('college')
  const [outfits, setOutfits] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('overall')
  const [wardrobeOnly, setWardrobeOnly] = useState(false)

  useEffect(() => {
    getWeather().then(setWeather)
  }, [])

  useEffect(() => {
    setLoading(true)
    getRecommendations({ occasion }).then((data) => {
      setOutfits(data)
      setLoading(false)
    })
  }, [occasion])

  const visibleOutfits = useMemo(() => {
    let list = wardrobeOnly ? outfits.filter((o) => o.fromWardrobe) : outfits
    return [...list].sort((a, b) => b.scores[sortBy] - a.scores[sortBy])
  }, [outfits, sortBy, wardrobeOnly])

  return (
    <div className="page recommendations">
      <div className="container">
        <PageHeader
          eyebrow="AI recommendation engine"
          title="Today's outfit recommendations"
          description="Ranked using today's weather, your selected occasion, your style profile, and what's already in your wardrobe."
        />

        <div className="rec-context">
          <WeatherCard weather={weather} loading={!weather} />
          <div className="card rec-occasion">
            <span className="stitch-tag">Occasion</span>
            <OccasionSelector selected={occasion} onSelect={setOccasion} />
          </div>
        </div>

        <div className="rec-toolbar">
          <div className="rec-toolbar-group">
            <span className="eyebrow">Sort by</span>
            <div className="rec-toolbar-pills">
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  className={`rec-pill ${sortBy === s.id ? 'is-active' : ''}`}
                  onClick={() => setSortBy(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <label className="rec-toggle">
            <input
              type="checkbox"
              checked={wardrobeOnly}
              onChange={(e) => setWardrobeOnly(e.target.checked)}
            />
            From my wardrobe only
          </label>
        </div>

        {loading ? (
          <LoadingState label="Matching outfits to today…" />
        ) : visibleOutfits.length === 0 ? (
          <EmptyState
            icon="🧥"
            title="No matching outfits yet"
            description="Try turning off the wardrobe filter, or upload a few more items."
          />
        ) : (
          <div className="rec-grid">
            {visibleOutfits.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                selected={selectedOutfit?.id === outfit.id}
                onSelect={onSelectOutfit}
                onTryOn={(o) => {
                  onSelectOutfit(o)
                  onNavigate('tryon')
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
