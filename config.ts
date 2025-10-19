// src/config.ts

/**
 * Firebase Configuration
 *
 * Reads your Firebase project configuration from environment variables.
 * These variables should be set in a .env file locally.
 */
export const firebaseConfig = {
	apiKey: "AIzaSyAMmArUjA5Cro-PDpyabQGexs9KZ3MH7dU",
	authDomain: "syncup-1360e.firebaseapp.com",
	projectId: "syncup-1360e",
	storageBucket: "syncup-1360e.firebasestorage.app",
	messagingSenderId: "389802074435",
	appId: "1:389802074435:web:70ee23b7a79a2da94c0ff6",
	measurementId: "G-RKM68KLK0H",
};

/**
 * Mapbox Access Token
 *
 * Reads your Mapbox access token from environment variables.
 */
export const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
