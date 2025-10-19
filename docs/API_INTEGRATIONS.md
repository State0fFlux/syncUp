# API Integrations for SyncUp

This document outlines the key API integrations for the SyncUp MVP.

## 1. Google Gemini API
- **Purpose:** To generate safe and engaging icebreaker prompts for new conversations in Community Mode.
- **Service File:** `src/services/aiService.ts`
- **Model Used:** `gemini-2.5-flash`
- **Implementation:** A function `generateIcebreaker` sends a prompt to the Gemini API and returns a text-based conversation starter.
- **Authentication:** Requires an API key, which must be provided through the `process.env.API_KEY` environment variable.

## 2. Mapbox API
- **Purpose:**
    - To display friend and community member locations on a real, interactive map.
    - To enable proximity-based matching.
- **Service File:** `src/components/MapView.tsx`
- **Implementation:** The app uses Mapbox GL JS to render an interactive map. A valid Mapbox Access Token must be provided in `src/config.ts`. The `MapView.tsx` component will render markers for users based on their location data. If the token is a placeholder, a fallback message is displayed instead of the map.

## 3. Firebase
- **Purpose:** Backend services for Authentication, Firestore database, and Cloud Functions.
- **Service File:** `src/services/firebaseService.ts`
- **Implementation:** The app is configured to connect to a Firebase project. A configuration object must be provided in `src/config.ts`. The service in `src/services/firebaseService.ts` will fetch live data from Firestore. If the configuration is a placeholder, the app will fall back to using mock data to ensure functionality.
