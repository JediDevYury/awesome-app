import { firebaseConfig } from '@/configs';
import { getFirestore } from '@firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { Platform } from 'react-native';

const persistence =
  Platform.OS === 'web'
    ? browserSessionPersistence
    : getReactNativePersistence(ReactNativeAsyncStorage);

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence });
const db = getFirestore(app);

export { app, db, auth };
