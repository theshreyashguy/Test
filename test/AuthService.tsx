// AuthService.ts
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth';
import {firebaseAuth} from './Firebaseconfig'

class AuthService {
  // Sign Up with Email and Password
  signUpWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth,email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  // Sign In with Email and Password
  signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth,email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  // Sign Out
}

export default new AuthService();
