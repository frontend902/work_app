// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCnfIvjx7SUAn4GrOwUByb0Q7DmVc3TVJ4',
  authDomain: 'htcontents.firebaseapp.com',
  projectId: 'htcontents',
  storageBucket: 'htcontents.appspot.com',
  messagingSenderId: '228261750078',
  appId: '1:228261750078:web:7862b5ab143f378fe5f86f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
