import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { 
  User, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const ALLOWED_EMAILS = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(',') || [];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthorized(
        currentUser ? ALLOWED_EMAILS.includes(currentUser.email || '') : false
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (!ALLOWED_EMAILS.includes(result.user.email || '')) {
        await signOut(auth);
        throw new Error('このメールアドレスではアクセスできません');
      }
      
      setUser(result.user);
      setIsAuthorized(true);
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthorized(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    isAuthorized,
    signInWithGoogle,
    logout,
  };
};