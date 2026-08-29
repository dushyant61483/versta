// Mock outfit data used across Home and Recommendations pages.
// TODO(AI team): replace with output from recommendationService.getRecommendations()
// once the real AI recommendation engine is connected.

export const outfits = [
  {
    id: 'outfit-1',
    name: 'Overcast Campus',
    description:
      'An oversized cotton shirt with relaxed cargos — breathable for humidity, sharp enough for a lecture hall.',
    image: '/images/outfit1.png',
    items: ['White oversized shirt', 'Black cargo trousers', 'White sneakers'],
    occasion: 'College',
    scores: { style: 94, weather: 92, occasion: 96, overall: 94 },
    badge: 'Top Pick',
    fromWardrobe: true,
  },
  {
    id: 'outfit-2',
    name: 'Evening Ceremony',
    description:
      'A muted-gold kurta set for warm evening events, with minimal accessories so the fabric does the talking.',
    image: '/images/outfit2.png',
    items: ['Ochre kurta', 'Tailored churidar', 'Leather mojaris'],
    occasion: 'Wedding',
    scores: { style: 91, weather: 88, occasion: 97, overall: 92 },
    badge: 'Occasion Match',
    fromWardrobe: false,
  },
  {
    id: 'outfit-3',
    name: 'Interview Ready',
    description:
      'A structured, neutral outfit that reads as composed and prepared without feeling stiff.',
    image: '/images/outfit3.png',
    items: ['Charcoal blazer', 'White shirt', 'Black trousers', 'Black derbies'],
    occasion: 'Interview',
    scores: { style: 89, weather: 85, occasion: 98, overall: 91 },
    badge: 'Sharp Fit',
    fromWardrobe: true,
  },
  {
    id: 'outfit-4',
    name: 'Trail Layered',
    description:
      'A wind-resistant layering set built for changing trail temperatures and light rain.',
    image: '/images/outfit4.png',
    items: ['Moss quarter-zip', 'Utility trousers', 'Trail runners', 'Packable shell'],
    occasion: 'Trekking',
    scores: { style: 86, weather: 95, occasion: 90, overall: 90 },
    badge: 'Weather Smart',
    fromWardrobe: false,
  },
  {
    id: 'outfit-5',
    name: 'After-Hours',
    description:
      'A slightly elevated take on casualwear for a party that starts indoors and ends on a rooftop.',
    image: '/images/outfit5.png',
    items: ['Black silk shirt', 'Straight denim', 'Chelsea boots'],
    occasion: 'Party',
    scores: { style: 93, weather: 84, occasion: 92, overall: 90 },
    badge: 'Trending Now',
    fromWardrobe: true,
  },
  {
    id: 'outfit-6',
    name: 'Slow Sunday',
    description:
      'A soft, unstructured outfit for a low-key coffee run or first date that shouldn\u2019t feel try-hard.',
    image: '/images/outfit6.png',
    items: ['Beige linen shirt', 'Straight chinos', 'Canvas sneakers'],
    occasion: 'Date',
    scores: { style: 90, weather: 89, occasion: 91, overall: 90 },
    badge: 'Wardrobe Ready',
    fromWardrobe: true,
  },
]

export const occasions = [
  { id: 'college', label: 'College', icon: '🎓' },
  { id: 'wedding', label: 'Wedding', icon: '💍' },
  { id: 'trekking', label: 'Trekking', icon: '🏔️' },
  { id: 'party', label: 'Party', icon: '🎉' },
  { id: 'interview', label: 'Interview', icon: '💼' },
  { id: 'casual', label: 'Casual', icon: '☕' },
  { id: 'vacation', label: 'Vacation', icon: '🏖️' },
  { id: 'date', label: 'Date', icon: '❤️' },
]
