import { auth as FIREBASE_AUTH } from '@/services/firebase.service';
import { queryClient } from '@/services/react-query.service';
import { handleError } from '@/shared';
import {
  User,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { useContext, createContext, useState, useEffect, type PropsWithChildren } from 'react';

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  authenticationStatus: string;
}>({
  signIn: async () => {},
  signOut: async () => {},
  user: null,
  isLoading: false,
  authenticationStatus: 'loading',
  setUser: () => {},
});

export function useAuth() {
  const auth = useContext(AuthContext);

  if (process.env.NODE_ENV !== 'production' && !auth) {
    throw new Error('useAuth must be wrapped in an AuthProvider');
  }

  if (!FIREBASE_AUTH) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return auth;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticationStatus, setAuthenticationStatus] = useState('loading');

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);

    try {
      await queryClient.invalidateQueries();
      await firebaseSignOut(FIREBASE_AUTH);
      setUser(null);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const nextOrObserver = (user: User | null) => {
    if (user) {
      setUser(user);
    }
    setAuthenticationStatus(user ? 'authenticated' : 'unauthenticated');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, nextOrObserver, handleError);

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user, isLoading, authenticationStatus, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
