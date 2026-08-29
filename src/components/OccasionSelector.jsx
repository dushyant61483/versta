import { occasions } from '../data/outfits.js'

export default function OccasionSelector({ selected, onSelect }) {
  return (
    <div className="occasion-selector" role="listbox" aria-label="Select an occasion">
      {occasions.map((occasion) => (
        <button
          key={occasion.id}
          role="option"
          aria-selected={selected === occasion.id}
          className={`occasion-pill ${selected === occasion.id ? 'is-active' : ''}`}
          onClick={() => onSelect(occasion.id)}
        >
          <span aria-hidden="true">{occasion.icon}</span>
          {occasion.label}
        </button>
      ))}
    </div>
  )
}
