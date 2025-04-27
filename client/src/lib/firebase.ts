// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYnfPYemtD0yhyS_Uiw_x8RzkV9K1Qj9k",
  authDomain: "payhub-7f45b.firebaseapp.com",
  projectId: "payhub-7f45b",
  storageBucket: "payhub-7f45b.firebasestorage.app",
  messagingSenderId: "343261378366",
  appId: "1:343261378366:web:280f92587a826413f6de6f",
  measurementId: "G-28ZXQGP93V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Login com Google (popup)
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      success: true,
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
      }
    };
  } catch (error) {
    console.error("Erro ao fazer login com Google:", error);
    return {
      success: false,
      error
    };
  }
};

export { auth };