# Todo App with TypeScript

A classic TodoMVC-style app built with React and TypeScript, focused on practicing strong typing in a real component structure.

## Features

- Add new todos
- Mark todos as completed / active
- Remove individual todos
- Filter todos: All / Active / Completed
- Clear all completed todos at once
- Pending todos counter

## Tech stack

- React
- TypeScript
- Vite

## TypeScript & React concepts practiced

- Typing function components with `React.FC<Props>`
- Shared types and interfaces (`Todo`, `TodoId`, `TodoTitle`, `FilterValue`)
- `Pick<Type, Keys>` utility type to derive smaller types from a base interface
- `as const` for literal, read-only constant objects
- Typed event handlers (`React.FormEvent`, `React.ChangeEvent`)
- Component composition (Header, Todos, Todo, Footer, Filters, CreateTodo)

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