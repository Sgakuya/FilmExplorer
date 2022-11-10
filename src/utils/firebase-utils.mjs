// Import the functions you need from the SDKs you need

import { getApp, initializeApp } from "firebase/app";
import {  initializeFirestore, connectFirestoreEmulator, getFirestore, collection, doc, addDoc, deleteDoc, getDocs } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ09rTMC0nvtBQiFZobUoayNiylPKfU3o",
  authDomain: "practical05-743eb.firebaseapp.com",
  projectId: "practical05-743eb",
  storageBucket: "practical05-743eb.appspot.com",
  messagingSenderId: "472584118579",
  appId: "1:472584118579:web:f2720a318342923b00de46",
  measurementId: "G-0L2HEHG4W1"
};



// Initialize Firebase

export function initializeFirebase(){
  try{
    return getApp();
  } catch (e){
    // app has not been initialized
    const app = initializeApp(firebaseConfig);

    // initialize the database
    const db = initializeFirestore(app, {useFetchStreams: false})
    // connect up the emulator to the database
    if (process.env.NEXT_PUBLIC_EMULATE || process.env.FIRESTORE_EMULATOR_HOST){
      console.log("Connecting to emulator");
      connectFirestoreEmulator(db, "localhost", 8080 );
    }
    return app;
  }
}

/**
 * This is a helper function for bulk loading a collection. 
 * 
 * The main reason to use this is for seeding or testing.
 * 
 * @param {*} data - an Array of objects to be stored as documents
 * @param {string} collectionName  - the name of the collection
 */
export async function loadData(data, collectionName){

  const db = getFirestore();

  const collectionRef = collection(db, collectionName);

  await Promise.all(data.map(async (d)=>{
    // add the document to firestore
    await addDoc(collectionRef, d);
  }));
}


/**
 * This function is designed to remove all documents from a 
 * collection. (It will not take care of sub collections).
 * 
 * Its primary use is for testing.
 * 
 * @param {string} collectionName 
 */
export async function clearCollection(collectionName){
  const db = getFirestore();
  const docSnapshot = await getDocs(collection(db, collectionName));
  await Promise.all(docSnapshot.docs.map((d)=>{
    return deleteDoc(doc(db, "films", d.id))
  }));
}