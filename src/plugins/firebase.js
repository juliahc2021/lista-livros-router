import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCKL76ZRr8Jf8fUTaUVn7bcAGYrx1D-lcA",
    authDomain: "julia-livros-vue.firebaseapp.com",
    projectId: "julia-livros-vue",
    storageBucket: "julia-livros-vue.appspot.com",
    messagingSenderId: "142571175997",
    appId: "1:142571175997:web:d2e039e75d510ad121aa54"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()

const profileCollection = db.collection('profile')
const tasksCollection = db.collection('tasks')

export {
    db, auth, profileCollection, tasksCollection, googleProvider
}