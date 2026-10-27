# Zalkar Guest House

React (Vite + TypeScript) web application for **Zalkar Guest House** in Kyzart village, Naryn Region, Kyrgyzstan, offering guest accommodation and horseback trips toward Son-Kul Lake.

## Features

- **Trilingual Support (`EN` / `RU` / `KY`)**: Instant language switching with automatic browser/URL detection (`?lang=ru`, `?lang=ky`) and `localStorage` persistence.
- **Pages & Navigation**:
  - **Home (`/`)**: Hero banner with animated mountain SVG & portrait mobile video background, highlights, About section, Explore cards, category-filterable photo/video gallery with interactive lightbox modal, and location map.
  - **Stay (`/stay`)**: Room cards with multi-photo carousels, facilities, graceful fallbacks for unconfirmed details, and pre-filled WhatsApp availability inquiries.
  - **Horse Tours (`/tours`)**: Scenic mountain riding features, tour details list, photo mosaic, and WhatsApp tour inquiry CTAs.
  - **Contact (`/contact`)**: WhatsApp inquiry form (supporting `?interest=stay|tour|both|other` pre-selection and date validation), direct contact links, embedded Google Map, directions, and FAQs.

## Configuration & Content

- **Site Data**: Edit `src/data/config.ts` to update WhatsApp/phone contact details, room descriptions, prices, photos, tour details, and gallery items. Empty fields automatically display localized "On request" / "To be confirmed" / "Photo coming soon" fallbacks.
- **Translations**: Edit `src/data/i18n.ts` to customize copy across English, Russian, and Kyrgyz.
- **Static Media**: Place images in `public/images/` and videos/posters in `public/videos/`, then reference them in `src/data/config.ts` (e.g., `/images/room-1.jpg`).

## Development

```bash
npm install
npm run dev
```

Runs the development server at `http://0.0.0.0:3000`.

## Build

```bash
npm run build
```
