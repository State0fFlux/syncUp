
# API Integrations for SyncUp

This document outlines the key API integrations for the SyncUp MVP.

## 1. Google Gemini API
- **Purpose:** To generate safe and engaging icebreaker prompts for new conversations in Community Mode.
- **Service File:** `src/services/aiService.ts`
- **Model Used:** `gemini-2.5-flash`
- **Implementation:** A function `generateIcebreaker` sends a prompt to the Gemini API and returns a text-based conversation starter.
- **Authentication:** Requires an API key, which must be provided through the `process.env.API_KEY` environment variable.

## 2. Google Maps API (Simulated)
- **Purpose:**
    - To display friend and community member locations on a map.
    - To enable proximity-based matching.
- **Service File:** `src/services/maps.ts` (mocked)
- **Implementation:** The current MVP uses a placeholder component (`MapView.tsx`) to simulate the map. A full implementation would require the Google Maps JavaScript API to render an interactive map and markers. Geolocation is requested to simulate fetching the user's current location.

## 3. Google Calendar API (Simulated)
- **Purpose:** To sync user availability and display their status ("free," "busy," "social").
- **Service File:** `src/services/calendar.ts` (mocked)
- **Implementation:** The MVP uses mock data to represent calendar events and availability. A full implementation would use Google OAuth2 for user consent and the Google Calendar API to read calendar data.

## 4. Firebase (Simulated)
- **Purpose:** Backend services for Authentication, Firestore database, and Cloud Functions.
- **Service File:** `src/services/firebase.ts` (mocked)
- **Implementation:** All Firebase interactions are mocked. This includes user authentication, fetching/writing user profiles, friend lists, and activities.
