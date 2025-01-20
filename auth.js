import { auth } from "../constants/firebaseConfig"; // Adjust the path
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

/**
 * Registers a new user using Firebase Authentication.
 * @param {string} email
 * @param {string} password
 */
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error; // Pass error for handling
  }
}

/**
 * Logs in an existing user using Firebase Authentication.
 * @param {string} email
 * @param {string} password
 */
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error; // Pass error for handling
  }
}

/**
 * Logs out the currently authenticated user.
 */
export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    throw error; // Pass error for handling
  }
}
