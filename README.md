# Versta — Frontend

Hackathon frontend for Versta, an AI personal fashion assistant built on
top of Problem Statement #37 (Hyperlocal Weather-Based Outfit Suggester).

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Structure

```
src/
├── components/     Reusable UI: Navbar, WeatherCard, OccasionSelector,
│                   OutfitCard, WardrobeItem, UploadBox, ScoreBar, Button,
│                   PageHeader, EmptyState, LoadingState, ImageWithFallback
├── pages/          Home, Recommendations, Wardrobe, TryOn, Profile
│                   (each page has a colocated .css file)
├── data/           Mock data: outfits.js, wardrobe.js, profile.js
├── services/       Placeholder services returning mock data:
│                   weatherService, recommendationService, tryOnService
├── styles/         base.css (design tokens + resets), components.css
├── App.jsx         Page switching via component state + URL hash
│                   (no React Router — kept intentionally simple)
└── main.jsx        Entry point
```

## What's mocked right now

Every page renders and the full user flow works, but these are backed by
mock data until the real integrations land. Each spot is marked with a
`TODO(...)` comment in code:

| Feature | File | Replace with |
|---|---|---|
| Weather | `src/services/weatherService.js` | Real weather API + geolocation |
| Outfit recommendations | `src/services/recommendationService.js` | AI recommendation engine |
| Virtual try-on | `src/services/tryOnService.js` | Virtual try-on model/API |
| Wardrobe upload | `src/pages/Wardrobe.jsx` | Cloud image storage + DB persistence |
| Profile save | `src/pages/Profile.jsx` | Auth + user database |

## Design system

- Palette: near-black ink background, warm ivory text, a single thread-gold
  accent (`--gold`), and a muted brick red used sparingly.
- Type: Fraunces (display/serif) for headings, Inter for body/UI, IBM Plex
  Mono for data (scores, tags, labels) — a nod to tailoring spec sheets.
- Signature motif: a dashed "running stitch" line used on dividers, card
  seams, and the score bars, echoing garment stitching.

Tokens live in `src/styles/base.css`.

## Images

Outfit/wardrobe images referenced in `src/data/*.js` point at
`/public/images/...` paths that don't exist yet. `ImageWithFallback`
gracefully renders a placeholder swatch instead of crashing — drop real
photos into `public/images/` with matching filenames to replace them.

## Navigation

Page switching is done with a `page` state value in `App.jsx`, synced to
the URL hash (`#recommendations`, `#wardrobe`, etc.) so refresh and
back/forward still work — no routing library required, per project rules.
