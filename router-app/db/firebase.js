
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
const auth = firebase.auth();

export const eventsCollection = collection(db, "events");

/**
 * Utility function to map Firestore documents to your event structure
 * including the Firestore document ID.
 */
export const mapDocToEvent = (doc) => ({
  id: doc.id,
  ...doc.data(),
});

// Export the Firestore CRUD operations
export const addEvent = (data) => addDoc(eventsCollection, data);
export const fetchEvents = async () => {
  const querySnapshot = await getDocs(eventsCollection);
  return querySnapshot.docs.map(mapDocToEvent);
};
export const updateEvent = (id, data) => updateDoc(doc(db, "events", id), data);
export const deleteEvent = (id) => deleteDoc(doc(db, "events", id));

export { db, auth };


