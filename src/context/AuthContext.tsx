import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check if user document exists, if not create it
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              email: currentUser.email,
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp()
            });
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, `users/${currentUser.uid}`);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateLoginTime = async (uid: string) => {
    try {
      await setDoc(doc(db, 'users', uid), {
        lastLogin: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.error(e);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      // Wait for onAuthStateChanged to potentially create the doc
      const userDocRef = doc(db, 'users', res.user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          lastLogin: serverTimestamp()
        });
      } else {
        await setDoc(userDocRef, {
          email: res.user.email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error signing in with Google', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      await updateDoc(doc(db, 'users', res.user.uid), {
        lastLogin: serverTimestamp()
      });
    } catch (error) {
      console.error('Error signing in with email', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      // create full doc on signup
      await setDoc(doc(db, 'users', res.user.uid), {
        email: res.user.email,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
    } catch (error) {
      console.error('Error signing up', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error sending reset email', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      if (user) {
        try {
          await updateDoc(doc(db, 'users', user.uid), {
            lastLogout: serverTimestamp()
          });
        } catch (e) {
          console.error('Error updating lastLogout', e);
        }
      }
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
