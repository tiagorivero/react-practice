# Movie Search App

A small React app built to practice consuming APIs and using custom Hooks.

<img width="905" height="873" alt="Image" src="https://github.com/user-attachments/assets/cd6f7297-06fa-45c4-bd60-11ac8d1f29ef" />

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

## Setup

This project needs an OMDb API key to fetch movie data.

1. Get a free API key at [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
2. Create a `.env` file in the project root and add:

```
VITE_API_KEY=your_omdb_api_key_here
```

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
