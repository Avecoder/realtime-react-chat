import {NavLink} from 'react-router-dom'
import {LOGIN_ROUTE} from '../utils/const'
import {Context} from '../context'
import {useContext} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'

const Navbar = (props) => {
  const {auth} = useContext(Context)

  const [user] = useAuthState(auth)


  return (
    <div className="navbar">
      <div className="container">
        {user ?
          <div className="d-flex aic navbar__inner" style={{justifyContent: 'space-between'}}>
            <h3 className="username">{user.displayName}</h3>
            <button className="btn" onClick={() => auth.signOut()}>Выйти</button>
          </div>
          :
          <div className="d-flex flex-end aic navbar__inner">
            <NavLink to={LOGIN_ROUTE}>
              <button className="btn">Логин</button>
            </NavLink>
          </div>
        }


      </div>
    </div>
  )
}

export default Navbar
