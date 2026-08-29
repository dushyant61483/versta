import { useEffect, useState } from 'react'
import WeatherCard from '../components/WeatherCard.jsx'
import OccasionSelector from '../components/OccasionSelector.jsx'
import OutfitCard from '../components/OutfitCard.jsx'
import Button from '../components/Button.jsx'
import LoadingState from '../components/LoadingState.jsx'
import { getWeather } from '../services/weatherService.js'
import { getRecommendations } from '../services/recommendationService.js'
import './Home.css'

export default function Home({ onNavigate }) {
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [occasion, setOccasion] = useState('college')
  const [outfits, setOutfits] = useState([])
  const [outfitsLoading, setOutfitsLoading] = useState(true)

  useEffect(() => {
    getWeather().then((data) => {
      setWeather(data)
      setWeatherLoading(false)
    })
  }, [])

  useEffect(() => {
    setOutfitsLoading(true)
    getRecommendations({ occasion }).then((data) => {
      setOutfits(data.slice(0, 3))
      setOutfitsLoading(false)
    })
  }, [occasion])

  return (
    <div className="page home">
      {/* Hero */}
      <section className="home-hero container">
        <span className="stitch-tag">Your personal AI stylist</span>
        <h1 className="home-hero-title">
          What should you <em>wear</em> today?
        </h1>
        <p className="home-hero-desc">
          Versta reads today's weather, your occasion, and the clothes you already own —
          then builds an outfit that actually makes sense, and lets you see it on yourself
          before you commit.
        </p>
        <div className="home-hero-actions">
          <Button variant="primary" onClick={() => onNavigate('recommendations')}>
            Get My Outfit
          </Button>
          <Button variant="outline" onClick={() => onNavigate('wardrobe')}>
            Browse My Wardrobe
          </Button>
        </div>
      </section>

      <hr className="stitch-divider container" />

      {/* Today's context */}
      <section className="home-context container">
        <div className="home-context-head">
          <span className="eyebrow">Today's context</span>
          <h2>Three inputs, one outfit</h2>
        </div>

        <div className="home-context-grid">
          <WeatherCard weather={weather} loading={weatherLoading} />

          <div className="card home-occasion-card">
            <span className="stitch-tag">Where are you headed</span>
            <OccasionSelector selected={occasion} onSelect={setOccasion} />
          </div>
        </div>
      </section>

      <hr className="stitch-divider container" />

      {/* AI recommendations preview */}
      <section className="home-recs container">
        <div className="home-context-head">
          <span className="eyebrow">AI recommended</span>
          <h2>Built for {occasion[0].toUpperCase() + occasion.slice(1)}, today</h2>
          <p>
            Ranked by how well each option fits the weather, the occasion, and your style
            profile — pulling first from clothes you already own.
          </p>
        </div>

        {outfitsLoading ? (
          <LoadingState label="Styling your options…" />
        ) : (
          <div className="home-recs-grid">
            {outfits.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                compact
                onSelect={() => onNavigate('recommendations')}
                onTryOn={() => onNavigate('tryon')}
              />
            ))}
          </div>
        )}
      </section>

      {/* Final CTA */}
      <section className="home-cta container">
        <div className="card home-cta-card">
          <div>
            <span className="eyebrow">See it before you wear it</span>
            <h2>Try any outfit on, virtually.</h2>
            <p>Open your camera, pick a look, and see how it fits — no fitting room required.</p>
          </div>
          <Button variant="primary" onClick={() => onNavigate('tryon')}>
            Open Try-On
          </Button>
        </div>
      </section>
    </div>
  )
}
