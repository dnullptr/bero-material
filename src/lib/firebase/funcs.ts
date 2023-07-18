import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth, db } from './index'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { User } from 'src/models/User'
export async function signInWithOtp(phone: string, recaptchaVerifier: RecaptchaVerifier, otp: string) {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier)
    const verificationCode = otp
    const result = await confirmationResult.confirm(verificationCode)
    return result
  } catch (error) {
    console.error(error)
  }
}

export const getUserDataFromDb = async (id: string) => {
  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data())
    return docSnap.data() as User
  }

  console.log('No such document!')
  return null
}
export const loginWithFirebase = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    // Signed in
    const user = userCredential.user
    return user
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(` err code : ${errorCode}, \n err msg : ${errorMessage}`)
  }
}
export const registerWithFirebase = async (user: User) => {
  const { email, password, fullName, phone } = user
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // Signed in
    const user = userCredential.user
    await setDoc(doc(db, 'users', user.uid), {
      fullName,
      email,
      phone,
    })
    return (await getUserDataFromDb(user.uid)) as User
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(` err code : ${errorCode}, \n err msg : ${errorMessage}`)
  }
}

export const logoutWithFirebase = async () => {
  try {
    await auth.signOut()
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(` err code : ${errorCode}, \n err msg : ${errorMessage}`)
  }
}
