import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCga1Epn5R4INiS3z01xC6CcKywbJmxFGo',
  authDomain: 'thedoosite.firebaseapp.com',
  projectId: 'thedoosite',
  storageBucket: 'thedoosite.appspot.com',
  messagingSenderId: '303003732102',
  appId: '1:303003732102:web:635572e8cea65565f5a907',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
export const colRef = collection(db, 'users')
