# Translator App | APIVerve API Tutorial

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![Vue](https://img.shields.io/badge/Vue-3-42b883)](https://vuejs.org)
[![Vite](https://img.shields.io/badge/Vite-5-646cff)](https://vitejs.dev)
[![APIVerve | Translator](https://img.shields.io/badge/APIVerve-Translator-purple)](https://apiverve.com/marketplace/translator?utm_source=github&utm_medium=tutorial&utm_campaign=translator-app-vue-tutorial)

A clean, responsive language translator app built with Vue 3. Translate text between 100+ languages with auto-detection support.

![Screenshot](https://raw.githubusercontent.com/apiverve/translator-app-vue-tutorial/main/screenshot.jpg)

---

### Get Your Free API Key

This tutorial requires an APIVerve API key. **[Sign up free](https://dashboard.apiverve.com?utm_source=github&utm_medium=tutorial&utm_campaign=translator-app-vue-tutorial)** - no credit card required.

---

## Features

- Translate text between 100+ languages
- Auto-detect source language
- Swap languages with one click
- Copy translation to clipboard
- Character count display
- Clean, modern UI with responsive design
- Built with Vue 3 and Vite for fast development

## Quick Start

1. **Clone this repository**
   ```bash
   git clone https://github.com/apiverve/translator-app-vue-tutorial.git
   cd translator-app-vue-tutorial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your API key**

   Open `.env` and add your API key:
   ```
   VITE_API_KEY=your-api-key-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**

   Visit http://localhost:5173 and start translating!

## Project Structure

```
translator-app-vue-tutorial/
├── src/
│   ├── App.vue         # Main Vue component
│   ├── style.css       # Styles
│   └── main.js         # Entry point
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── .env                # Environment variables (add your API key)
├── screenshot.jpg      # Preview image
├── LICENSE             # MIT license
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## How It Works

1. User selects source and target languages
2. User enters text to translate
3. Vue captures the input and calls the Translator API
4. API returns the translated text
5. Component displays the translation with copy option

### The API Call

```javascript
const response = await fetch('https://api.apiverve.com/v1/translator', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  },
  body: JSON.stringify({
    text: sourceText,
    source: 'en',
    target: 'es'
  })
});
```

## API Reference

**Endpoint:** `POST https://api.apiverve.com/v1/translator`

**Request Body:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | Text to translate |
| `target` | string | Yes | Target language code (e.g., "es") |
| `source` | string | No | Source language code (auto-detected if omitted) |

**Example Response:**

```json
{
  "status": "ok",
  "error": null,
  "data": {
    "sourceLang": "en",
    "targetLang": "es",
    "translatedText": "¡Hola! ¿Cómo estás?"
  }
}
```

## Supported Languages

The API supports 100+ languages including:

| Code | Language | Code | Language |
|------|----------|------|----------|
| en | English | es | Spanish |
| fr | French | de | German |
| it | Italian | pt | Portuguese |
| ru | Russian | ja | Japanese |
| ko | Korean | zh | Chinese |
| ar | Arabic | hi | Hindi |

## Customization Ideas

- Add speech-to-text input
- Add text-to-speech for translations
- Save translation history to localStorage
- Add favorite/frequent language pairs
- Implement real-time translation as you type
- Add dark mode toggle

## Related APIs

Explore more APIs at [APIVerve](https://apiverve.com/marketplace?utm_source=github&utm_medium=tutorial&utm_campaign=translator-app-vue-tutorial):

- [Language Detector](https://apiverve.com/marketplace/languagedetector?utm_source=github&utm_medium=tutorial&utm_campaign=translator-app-vue-tutorial) - Detect the language of text
- [Text Summarizer](https://apiverve.com/marketplace/textsummarizer?utm_source=github&utm_medium=tutorial&utm_campaign=translator-app-vue-tutorial) - Summarize long text
- [Sentiment Analysis](https://apiverve.com/marketplace/sentimentanalysis?utm_source=github&utm_medium=tutorial&utm_campaign=translator-app-vue-tutorial) - Analyze text sentiment

## License

MIT - see [LICENSE](LICENSE)

## Links

- [Get API Key](https://dashboard.apiverve.com?utm_source=github&utm_medium=tutorial&utm_campaign=translator-app-vue-tutorial) - Sign up free
- [APIVerve Marketplace](https://apiverve.com/marketplace?utm_source=github&utm_medium=tutorial&utm_campaign=translator-app-vue-tutorial) - Browse 300+ APIs
- [Translator API](https://apiverve.com/marketplace/translator?utm_source=github&utm_medium=tutorial&utm_campaign=translator-app-vue-tutorial) - API details
