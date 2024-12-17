import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 設定値の検証
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value) {
    console.error(`Firebase設定エラー: ${key}が設定されていません`);
  }
});

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Firebase初期化エラー:', error);
  throw error;
}

export const db = getFirestore(app);
export const auth = getAuth(app);

// 認証の永続性を設定
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('認証の永続性設定エラー:', error);
  });