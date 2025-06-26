// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;

// Inicializa Firebase solo si no se ha hecho antes
if (!getApps().length) {
  // Asegúrate de que la API key exista antes de inicializar
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
  } else {
    // Esto previene que la app se bloquee y ayuda a depurar.
    console.error("Error: La API key de Firebase no se encontró. Asegúrate de que las variables de entorno en tu archivo .env.local estén definidas y tengan el prefijo NEXT_PUBLIC_.");
    app = null!; // Asigna null para evitar más errores
  }
} else {
  app = getApp();
}

// Exporta los servicios de Firebase de forma condicional para evitar errores
const db: Firestore = app ? getFirestore(app) : null!;
const auth = app ? getAuth(app) : null!;

export { app, db, auth };
