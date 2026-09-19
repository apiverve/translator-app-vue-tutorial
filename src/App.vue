<script setup>
/**
 * Translator, an APIVerve template.
 *
 * Translate text between 18 languages. The page calls /api/translate (api/translate.js),
 * which holds your API key and calls the Translator API: https://apiverve.com/marketplace/translator
 */

import { ref } from 'vue'

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

  if (sourceLang.value === targetLang.value) {
    error.value = 'Source and target languages must be different'
    return
  }

  loading.value = true
  error.value = ''
  translatedText.value = ''

  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: sourceText.value,
        source: sourceLang.value,
        target: targetLang.value
      })
    })

    const data = await response.json()

    if (response.ok) {
      translatedText.value = data.translatedText
    } else {
      error.value = data.error || 'Translation failed'
    }
  } catch (err) {
    error.value = 'Couldn’t reach the server. Try again.'
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
      <p class="subtitle">Translate text between 18 languages</p>

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
            maxlength="2000"
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

      <footer class="footer">
        Powered by
        <a href="https://apiverve.com/marketplace/translator?utm_source=github&amp;utm_medium=template&amp;utm_campaign=translator-app-vue-tutorial" target="_blank" rel="noopener noreferrer">APIVerve Translator API</a>
      </footer>
    </div>
  </div>
</template>
