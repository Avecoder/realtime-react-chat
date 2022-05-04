import {createContext} from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {Context} from './context'


const firebaseConfig = {
  apiKey: "AIzaSyAxnbtPevyp0GOeD5S2ZydewcaDI-OuQwU",
  authDomain: "auth-react-96b3a.firebaseapp.com",
  projectId: "auth-react-96b3a",
  storageBucket: "auth-react-96b3a.appspot.com",
  messagingSenderId: "262320972874",
  appId: "1:262320972874:web:0000b864232c7751f632b3",
  measurementId: "G-EV73K3RSBT"
}

firebase.initializeApp(firebaseConfig)



const auth = firebase.auth()
const firestore = firebase.firestore()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context.Provider value={{firebase, auth, firestore}}>
      <App></App>
    </Context.Provider>
  </React.StrictMode>
)
