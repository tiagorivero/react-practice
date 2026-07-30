# React Shop 🛒

A small e-commerce practice app built with React, focused on global state management using Context API and useReducer.

## Features

- Product listing with add/remove from cart
- Shopping cart with quantity tracking per product
- Cart persisted in the browser (localStorage)
- Filter products by category and minimum price
- Visual indicator on products already added to the cart

## Tech stack

- React
- Vite
- Context API
- useReducer

## React concepts practiced

- Global state management with `createContext` + `useReducer` (Cart)
- Global state management with `createContext` + `useState` (Filters)
- Custom Hooks to consume context (`useCart`, `useFilters`)
- `useId` for accessible form/label associations
- Conditional rendering and derived state

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