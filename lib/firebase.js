import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyCdKgafKL0Gbbf1wyA3Dv251MMqtK4kWOQ",
    authDomain: "nextjs-1e84c.firebaseapp.com",
    projectId: "nextjs-1e84c",
    storageBucket: "nextjs-1e84c.appspot.com",
    messagingSenderId: "104431127519",
    appId: "1:104431127519:web:a52dd325699f8cdf30926a"
  };
  
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;