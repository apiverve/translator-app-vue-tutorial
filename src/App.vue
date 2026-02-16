<script setup>
/**
 * Translator App - Tutorial Example
 *
 * A simple Vue app using the APIVerve Translator API.
 * https://apiverve.com/marketplace/translator
 */

import { ref } from 'vue'

// API Configuration
// Create a .env file with: VITE_API_KEY=your-api-key-here
// Get a free key at: https://dashboard.apiverve.com
const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = 'https://api.apiverve.com/v1/translator'

// Common languages
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pl', name: 'Polish' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
  { code: 'sv', name: 'Swedish' }
]

const sourceText = ref('')
const translatedText = ref('')
const sourceLang = ref('en')
const targetLang = ref('es')
const loading = ref(false)
const error = ref('')

const translate = async () => {
  if (!sourceText.value.trim()) {
    error.value = 'Please enter text to translate'
    return
  }

  if (!API_KEY) {
    error.value = 'Add your API key to .env file (VITE_API_KEY=your-key)'
    return
  }

  if (sourceLang.value === targetLang.value) {
    error.value = 'Source and target languages must be different'
    return
  }

  loading.value = true
  error.value = ''
  translatedText.value = ''

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({
        text: sourceText.value,
        source: sourceLang.value,
        target: targetLang.value
      })
    })

    const data = await response.json()

    if (data.status === 'ok') {
      translatedText.value = data.data.translatedText
    } else {
      error.value = data.error || 'Translation failed'
    }
  } catch (err) {
    error.value = 'Failed to translate. Check your API key.'
    console.error('API Error:', err)
  } finally {
    loading.value = false
  }
}

const swapLanguages = () => {
  const temp = sourceLang.value
  sourceLang.value = targetLang.value
  targetLang.value = temp

  // Also swap the text if there's a translation
  if (translatedText.value) {
    const tempText = sourceText.value
    sourceText.value = translatedText.value
    translatedText.value = tempText
  }
}

const copyTranslation = () => {
  if (translatedText.value) {
    navigator.clipboard.writeText(translatedText.value)
  }
}
</script>

<template>
  <div class="app">
    <div class="container">
      <h1>Translator App</h1>
      <p class="subtitle">Translate text between 100+ languages</p>

      <div class="language-selector">
        <select v-model="sourceLang">
          <option v-for="lang in languages" :key="lang.code" :value="lang.code">
            {{ lang.name }}
          </option>
        </select>

        <button class="swap-btn" @click="swapLanguages" title="Swap languages">
          <span>&#8644;</span>
        </button>

        <select v-model="targetLang">
          <option v-for="lang in languages" :key="lang.code" :value="lang.code">
            {{ lang.name }}
          </option>
        </select>
      </div>

      <div class="translation-area">
        <div class="text-box">
          <label>Source Text</label>
          <textarea
            v-model="sourceText"
            placeholder="Enter text to translate..."
            rows="6"
          ></textarea>
          <span class="char-count">{{ sourceText.length }} characters</span>
        </div>

        <div class="text-box">
          <label>Translation</label>
          <textarea
            v-model="translatedText"
            placeholder="Translation will appear here..."
            rows="6"
            readonly
          ></textarea>
          <button
            v-if="translatedText"
            class="copy-btn"
            @click="copyTranslation"
            title="Copy translation"
          >
            Copy
          </button>
        </div>
      </div>

      <button
        class="translate-btn"
        @click="translate"
        :disabled="loading || !sourceText.trim()"
      >
        {{ loading ? 'Translating...' : 'Translate' }}
      </button>

      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>
