// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB3ZBnSppUaHZEGCJUZq4yMC7aLlJU-WeQ',
  authDomain: 'beroapp-5d241.firebaseapp.com',
  projectId: 'beroapp-5d241',
  storageBucket: 'beroapp-5d241.appspot.com',
  messagingSenderId: '922113156868',
  appId: '1:922113156868:web:3138c2720af43088a91251',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export const auth = getAuth(app)
export const db = getFirestore(app)

export const storage = getStorage(app)
