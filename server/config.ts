export const CONFIG = {
  API_KEYS: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  API_ENDPOINTS: {
    TEXT_API: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent',
    IMAGE_API: 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict'
  }
};
