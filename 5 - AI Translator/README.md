# AI Translator

A Google Translate-style app built with React, TypeScript, and an AI language model for real-time text translation.

<img width="825" height="351" alt="Image" src="https://github.com/user-attachments/assets/cfe7e7c3-65a2-4d1b-b9d0-8257400a9a26" />

## Features

- Translate text between multiple languages
- Automatic source language detection
- Debounced translation while typing (avoids calling the API on every keystroke)
- Swap source/target languages with one click
- Copy translated text to clipboard
- Text-to-speech playback of the translation
- Loading state while waiting for the translation

## Tech stack

- React
- TypeScript
- Vite
- React Bootstrap
- Groq API (Llama 3.3 70B) via the OpenAI SDK

## TypeScript & React concepts practiced

- Global state management with `useReducer` (`useStore` hook)
- Discriminated unions for props (`LanguageSelector`, `TextArea`)
- Custom Hooks (`useDebounce`, `useStore`)
- Enums (`SectionType`)
- Typed reducer actions and state

## Setup

This project needs a Groq API key to translate text.

1. Get a free API key at [console.groq.com](https://console.groq.com/keys)
2. Create a `.env` file in the project root and add:

```
VITE_GROQ_API_KEY=your_groq_api_key_here
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
