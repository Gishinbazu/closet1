// utils/firestore.js

import { db } from "../constants/firebaseConfig";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

/**
 * Adds a new document to a Firestore collection.
 * @param {string} collectionName
 * @param {object} data
 */
export async function addDocument(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error.message);
    throw error;
  }
}

/**
 * Retrieves all documents from a Firestore collection.
 * @param {string} collectionName
 */
export async function getAllDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return documents;
  } catch (error) {
    console.error("Error retrieving documents:", error.message);
    throw error;
  }
}

/**
 * Retrieves a single document by ID from a Firestore collection.
 * @param {string} collectionName
 * @param {string} docId
 */
export async function getDocumentById(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving document:", error.message);
    throw error;
  }
}
