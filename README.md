# Gutendex Library — Frontend Assignment

## Requirements Recap
- Base API: `http://skunkworks.ignitesol.com:8000/books`
- Page 1: Show category buttons.
- Page 2: Show books for selected category with infinite scroll. Search by title/author while preserving category. Clicking a book opens it in HTML/PDF/TXT (in that priority). If none available, alert: **"No viewable version available"**.
- Only books with images (covers) must be shown.

## Tech
- React 18 + Vite
- React Router v6
- Axios for API
- CSS Modules for scoped styling
- IntersectionObserver for infinite scroll
- ESLint + Prettier included

## Getting Started
```bash
npm i
npm run dev
```
Open the URL printed by Vite (default: `http://localhost:5173`).

## Project Structure
```
src/
  api/gutendexApi.js
  components/
    CategoryList/
    BookCard/
    SearchBar/
    Loader/
  i18n/strings.js
  pages/
    Home.jsx
    Books.jsx
  utils/bookUtils.js
  App.jsx
  index.css
  theme.css
  main.jsx
```

## Key Implementation Notes
- **Infinite Scroll:** Uses an IntersectionObserver sentinel with `rootMargin` to prefetch early for smooth UX.
- **Search:** Debounced at 500ms to minimize network calls while typing.
- **Cover-only Filter:** `mime_type=image/` param is always applied for initial fetches. Pagination follows the API `next` URL as-is.
- **Format Priority & ZIP Caveat:** `openBookInBrowser()` prefers `text/html`, then `application/pdf`, then `text/plain`; ignores any format that includes `.zip`.
- **Error Handling:** Basic error message rendered on fetch failures; console logs retained for debugging.
- **Accessibility:** Keyboard activation on book cards (Enter), ARIA labels on loader and interactive elements.

## Theming
- The app uses CSS variables in `theme.css`. Adjust colors or add a theme switcher by toggling a `data-theme` attribute or swapping variable values.

## i18n
- Strings are centralized in `src/i18n/strings.js` with a `t(key)` helper. Set `LANG` to `'hi'` for Hindi placeholders.

## Coding Practices
- Components are small and single-responsibility.
- API calls are centralized in `api/gutendexApi.js`.
- Utils (`debounce`, `openBookInBrowser`) are isolated and unit-test friendly.
- Hooks usage is organized; side effects are encapsulated in `useEffect` with stable dependencies.
- Linting and formatting configurations are included.

## Production Considerations
- Add error boundary for component-level isolation.
- Add request cancelation on rapid search changes (Axios CancelToken/AbortController).
- Cache first page per category with `sessionStorage` for snappier back nav.
- Preload cover images via `<link rel="preload" as="image">` for above-the-fold items.
- Add skeletons/placeholders for better perceived performance.

## License
This submission is authored by the candidate and may use public API endpoints under their respective terms.
