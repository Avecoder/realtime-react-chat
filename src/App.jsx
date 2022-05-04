import { useState, useContext } from 'react'
import './App.css'
import {BrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar'
import AppRouter from './components/AppRouter'
import {Context} from './context'
import {useAuthState} from 'react-firebase-hooks/auth'
import Loader from './components/Loader'

function App() {
  const {auth} = useContext(Context)

  const [user, loading, error] = useAuthState(auth)

  if(loading) {
    return (
      <Loader></Loader>
    )
  }

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <AppRouter></AppRouter>
    </BrowserRouter>
  )
}

export default App
