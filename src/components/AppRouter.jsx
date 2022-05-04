import React from 'react'
import PropTypes from 'prop-types'
import {Route, Routes, Navigate } from 'react-router-dom'
import {privateRoutes, publicRoutes} from '../router'
import {CHAT_ROUTE, LOGIN_ROUTE} from '../utils/const'
import {useAuthState} from 'react-firebase-hooks/auth'
import {Context} from '../context'
import {useContext} from 'react'

const AppRouter = (props) => {
  const {auth} = useContext(Context)

  const [user] = useAuthState(auth)


  return user ?
  (
    <Routes>
      {privateRoutes.map(({path, Component}) =>
        <Route path={path} element={<Component/>} key={path} exact={true}></Route>
      )}
      <Route
        path="*"
        element={<Navigate to={CHAT_ROUTE} replace />}
      />
    </Routes>
  )
  :
  (
    <Routes>
      {publicRoutes.map(({path, Component}) =>
        <Route path={path} element={<Component/>} key={path} exact={true}></Route>
      )}
      <Route
        path="*"
        element={<Navigate to={LOGIN_ROUTE} replace />}
      />
    </Routes>
  )
}

export default AppRouter
