import ImageWithFallback from './ImageWithFallback.jsx'

export default function WardrobeItem({ item }) {
  return (
    <article className="card wardrobe-item">
      <div className="wardrobe-item-media">
        <ImageWithFallback src={item.image} alt={item.name} className="wardrobe-item-img" />
        <span className="wardrobe-item-swatch" style={{ background: item.color }} aria-hidden="true" />
      </div>
      <div className="wardrobe-item-body">
        <h4>{item.name}</h4>
        <span className="wardrobe-item-category">{item.category}</span>
      </div>
    </article>
  )
}
