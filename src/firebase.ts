// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCExaLzKWdhhr_1IRPe1NIFdR7Uor12LTI',
  authDomain: 'testfire-1bc2f.firebaseapp.com',
  databaseURL: 'https://testfire-1bc2f.firebaseio.com',
  projectId: 'testfire-1bc2f',
  storageBucket: 'testfire-1bc2f.appspot.com',
  messagingSenderId: '243423113529',
  appId: '1:243423113529:web:d363f5aa8bf5ca297bf8e8',
}

export const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
}
