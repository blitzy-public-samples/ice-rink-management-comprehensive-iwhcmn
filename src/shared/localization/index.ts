import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language resources
import en from './en.json';
import fr from './fr.json';

// Define constants
export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = ['en', 'fr'];

/**
 * Initializes the i18next library with the application's localization configuration
 * @returns {Promise<void>} A promise that resolves when i18next has been initialized
 */
export const initializeI18n = async (): Promise<void> => {
  await i18next
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        fr: { translation: fr },
      },
      lng: DEFAULT_LANGUAGE,
      fallbackLng: DEFAULT_LANGUAGE,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

  // TODO: Implement language detection logic based on user preferences or browser settings
};

/**
 * Changes the current language of the application
 * @param {string} lang - The language code to change to
 * @returns {Promise<void>} A promise that resolves when the language has been changed
 */
export const changeLanguage = async (lang: string): Promise<void> => {
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    await i18next.changeLanguage(lang);
    // TODO: Update any necessary application state or storage
  } else {
    console.warn(`Unsupported language: ${lang}`);
  }
};

/**
 * Retrieves the current language of the application
 * @returns {string} The current language code (e.g., 'en' or 'fr')
 */
export const getCurrentLanguage = (): string => {
  return i18next.language;
};

// List of pending human tasks
/**
 * TODO: Human tasks
 * 1. Create and populate the en.json file with English translations
 * 2. Create and populate the fr.json file with French translations
 * 3. Review and confirm the list of supported languages
 * 4. Implement language detection logic based on user preferences or browser settings
 */