# Movie Search App

A small React app built to practice consuming APIs and using custom Hooks.

## Features

- Search movies by title using an external API
- Debounced search while typing (avoids sending a request on every keystroke)
- Search input validations (empty, numbers only, less than 3 characters)
- Sort results alphabetically with a checkbox
- Loading state while fetching results
- "No movies found" message when the search returns no results

## Tech stack

- React
- Vite
- just-debounce-it
- [OMDb API](https://www.omdbapi.com/) (movie data)

## React concepts practiced

- Custom Hooks (`useMovies`, `useSearch`)
- `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`
- Consuming an external API with `fetch`

## Run locally

Clone the repository and install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`) in your browser.