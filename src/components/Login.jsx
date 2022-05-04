import {useContext} from 'react'

import {Context} from '../context'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const Login = (props) => {

  const auth = getAuth()

  const login = async () => {
    const provider = new GoogleAuthProvider()

    const {user} = await signInWithPopup(auth, provider)

  }

  return (
    <div className="login">
      <div className="login-form">
        <h3>Войти через гугл</h3>
        <button className="btn" onClick={login}>Войти</button>
      </div>
    </div>
  )
}

export default Login
