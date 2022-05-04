import {Context} from '../context'
import {useContext, useState} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import './Chat.css'
import Loader from '../components/Loader'
import firebase from 'firebase/compat/app'

const Chat = (props) => {
  const {auth, firestore} = useContext(Context)

  const [user] = useAuthState(auth)
  const [message, setMessage] = useState('')
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt')
  )



  const sendMessage = async () => {
    firestore.collection('messages').add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: message.trim(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })

    setMessage('')
  }

  const pad = (s) => ('00' + s).slice(-2)

  const getTime = time => {
    const d = new Date(time * 1000)

    return `${pad(d.getHours())}:${pad(d.getMinutes())}`
  }

  if(loading) {
    return (
      <Loader></Loader>
    )
  }

  return (
    <div className="chat-container">
      <div className="chat">
        <div className="message-field">
          {messages.map(mess =>
            <div className="mess" style={{
                justifyContent: user.uid === mess.uid ? 'flex-end': 'flex-start'
              }}>
              {user.uid !== mess.uid ? <img src={mess.photoURL} alt=""/> : ''}

              <div className="mess-inner">
                {user.uid !== mess.uid ?
                  <div className="name">
                    {mess.displayName}
                  </div>
                  :
                  ''
                }
                {mess.text}
                <div className="time">
                  {mess.createdAt?.seconds && getTime(mess.createdAt?.seconds)}
                </div>
              </div>
            </div>
          )}

        </div>
        <div className="message-form">
          <input type="text" placeholder="Input message" value={message} onChange={e => setMessage(e.target.value)}/>
            <button className="btn btn-dark" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chat
