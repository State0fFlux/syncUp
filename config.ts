// src/config.ts

/**
 * Firebase Configuration
 * 
 * Reads your Firebase project configuration from environment variables.
 * These variables should be set in a .env file locally.
 */
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

/**
 * Mapbox Access Token
 * 
 * Reads your Mapbox access token from environment variables.
 */
export const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;
