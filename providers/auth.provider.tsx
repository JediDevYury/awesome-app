import { authProvider } from '@/api/constants';
import { SignInResponse } from '@/api/types';
import { auth as FIREBASE_AUTH } from '@/services/firebase.service';
import { queryClient } from '@/services/react-query.service';
import { handleError } from '@/shared';
import { authStorage } from '@/storage/auth.storage';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useContext, createContext, useState, useEffect, type PropsWithChildren } from 'react';

type AuthContextType = {
  user: User | null;
  error: Error | null;
  verification: SignInResponse | null;
  isLoading: boolean;
  authenticationStatus: string;
  signIn: (email: string, password: string) => Promise<void>;
  createUser: (email: string, password: string) => Promise<void>;
  verify2fa: (email: string, token: string) => Promise<{ data: any } | void>;
  reset2fa: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: async () => {},
  reset2fa: async () => {},
  verify2fa: async () => undefined,
  createUser: async () => {},
  error: null,
  user: null,
  verification: null,
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
  const [error, setError] = useState<Error | null>(null);
  const [verification, setVerification] = useState<SignInResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticationStatus, setAuthenticationStatus] = useState('loading');

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await authProvider['signInUser']({ email, password });
      setVerification(response?.data || null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);

    const tokens = authStorage.getItem('tokens');

    if (!tokens) return Promise.reject(new Error('No tokens found'));

    try {
      await authProvider['signOut'](tokens.accessToken);
      setUser(null);
      authStorage.removeItem('tokens');
      queryClient.clear();
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const reset2fa = async (email: string) => {
    setIsLoading(true);

    try {
      await authProvider['reset2fa'](email);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const verify2fa = async (email: string, token: string) => {
    setIsLoading(true);
    setError(null);

    try {
      return await authProvider['verify2fa'](email, token);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authProvider['registerUser']({ email, password });
      setVerification(response?.data || null);
    } catch (err) {
      setError(err as Error);
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
      value={{
        user,
        isLoading,
        authenticationStatus,
        verification,
        error,
        signIn,
        signOut,
        reset2fa,
        verify2fa,
        createUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
