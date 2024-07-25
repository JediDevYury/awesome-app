import {
  useContext,
  createContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import {
  User,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth as FIREBASE_AUTH } from "@/services/firebase";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  user: User | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  signOut: async () => {},
  user: null,
  isLoading: false,
});

export function useAuth() {
  const auth = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production" && !auth) {
    throw new Error("useAuth must be wrapped in an AuthProvider");
  }

  if (!FIREBASE_AUTH) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);

    await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);

    setIsLoading(false);
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(FIREBASE_AUTH);
      setUser(null);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to sign out", error);
    }

    setIsLoading(true);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
