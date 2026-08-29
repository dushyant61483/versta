// Recommendation service — currently returns mock outfit data filtered
// by occasion.
//
// TODO(AI team): Replace getRecommendations() with a real call to the AI
// recommendation engine. It should send { weather, occasion, wardrobe,
// profile } to a multimodal AI API and return ranked outfit objects in
// the same shape as src/data/outfits.js.

import { outfits } from '../data/outfits.js'

export async function getRecommendations({ occasion } = {}) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!occasion || occasion === 'all') return outfits

  const filtered = outfits.filter(
    (outfit) => outfit.occasion.toLowerCase() === occasion.toLowerCase()
  )

  // Fall back to the full mock list if nothing matches the selected
  // occasion, so the demo never shows an empty screen.
  return filtered.length > 0 ? filtered : outfits
}
