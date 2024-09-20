import { authProvider } from '@/api/constants';
import { auth as FIREBASE_AUTH } from '@/services/firebase.service';
import { queryClient } from '@/services/react-query.service';
import { handleError } from '@/shared';
import { User, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { useContext, createContext, useState, useEffect, type PropsWithChildren } from 'react';

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
  isLoading: boolean;
  authenticationStatus: string;
}>({
  signIn: async () => {},
  signOut: async () => {},
  user: null,
  isLoading: false,
  authenticationStatus: 'loading',
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticationStatus, setAuthenticationStatus] = useState('loading');

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await authProvider['signInUser']({ email, password });

      setUser(response?.data);
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
    <AuthContext.Provider value={{ signIn, signOut, user, isLoading, authenticationStatus }}>
      {children}
    </AuthContext.Provider>
  );
}
