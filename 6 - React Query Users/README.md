# React Query Users

A user directory app built with React, TypeScript, and TanStack React Query, practicing infinite scrolling, sorting, and filtering over paginated API data.

<img width="1754" height="846" alt="Image" src="https://github.com/user-attachments/assets/99ff2a13-17d6-48ee-9eb3-a7df45084536" />

## Features

- Infinite scrolling user list (load more results on demand)
- Sort users by first name, last name, or country
- Filter users by country
- Toggle alternating row colors
- Reset the list back to its initial state

## Tech stack

- React
- TypeScript
- Vite
- TanStack React Query
- [Random User API](https://randomuser.me/) (user data)

## React & TypeScript concepts practiced

- Data fetching, caching, and pagination with `useInfiniteQuery`
- Strongly typed API responses (`User`, `Info`, `ApiResults`, etc.)
- Derived state with `useMemo` (filtering and sorting)
- Enums (`SortBy`)
- Global type augmentation (`Array.prototype.toSorted`)

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
