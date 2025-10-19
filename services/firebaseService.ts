import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query } from "firebase/firestore";
import { firebaseConfig } from '../config';
import { User, Activity } from '../types';
import { MOCK_USERS, MOCK_ACTIVITIES } from './mockData';

const isConfigMissing = !firebaseConfig.apiKey || !firebaseConfig.projectId;

let app;
let db: any = null;
let auth: any = null;

if (!isConfigMissing) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Firebase initialization failed. Falling back to mock data.", error);
  }
} else {
  console.warn("Using mock data because Firebase environment variables are not set.");
}

// Export auth for use in other parts of the app
export { auth };

/**
 * Fetches all users from Firestore.
 * If Firestore is not configured or fails, it returns mock user data.
 * @returns A promise that resolves to an array of User objects.
 */
export const fetchAllUsers = async (): Promise<User[]> => {
  if (isConfigMissing || !db) {
    return Promise.resolve(MOCK_USERS);
  }
  try {
    const usersCol = collection(db, 'users');
    const q = query(usersCol);
    const userSnapshot = await getDocs(q);
    if (userSnapshot.empty) {
        console.warn("Firestore 'users' collection is empty, returning mock data.");
        return MOCK_USERS;
    }
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    return userList;
  } catch (error) {
    console.error("Error fetching users from Firestore. Falling back to mock data:", error);
    return MOCK_USERS; // Fallback to mock data on error
  }
};

/**
 * Fetches all activities from Firestore.
 * If Firestore is not configured or fails, it returns mock activity data.
 * @returns A promise that resolves to an array of Activity objects.
 */
export const fetchAllActivities = async (): Promise<Activity[]> => {
  if (isConfigMissing || !db) {
    return Promise.resolve(MOCK_ACTIVITIES);
  }
  try {
    const activitiesCol = collection(db, 'activities');
    const q = query(activitiesCol);
    const activitySnapshot = await getDocs(q);
     if (activitySnapshot.empty) {
        console.warn("Firestore 'activities' collection is empty, returning mock data.");
        return MOCK_ACTIVITIES;
    }
    const activityList = activitySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Activity));
    return activityList;
  } catch (error) {
    console.error("Error fetching activities from Firestore. Falling back to mock data:", error);
    return MOCK_ACTIVITIES; // Fallback to mock data on error
  }
};
