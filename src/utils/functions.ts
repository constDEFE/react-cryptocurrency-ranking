import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Theme } from "../models/models";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
} from "firebase/auth";

export const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const storedPrefs = localStorage.getItem("color-theme");
    if (storedPrefs) return storedPrefs as Theme;

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");

    if (userMedia.matches) return "dark";
  }

  return "light";
};

export const checkTheme = (existingTheme: Theme): void => {
  const root = window.document.documentElement;
  const isDark = existingTheme === "dark";

  root.classList.remove(isDark ? "light" : "dark");
  root.classList.add(existingTheme);

  localStorage.setItem("color-theme", existingTheme);
};

export const signUp = async (email: string, password: string): Promise<void> => {
  createUserWithEmailAndPassword(auth, email, password);

  return setDoc(doc(db, "users", email), {
    watchList: [],
  });
};

export const signIn = async (email: string, password: string): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);

export const logout = (): Promise<void> => signOut(auth);
