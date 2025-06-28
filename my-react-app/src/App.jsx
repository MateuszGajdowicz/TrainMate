import { useState,useEffect } from 'react'
import './App.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import LogIn from './assets/LogIn'
import SignUp from './assets/SignUp'
import ConfirmEmail from './assets/ConfirmEmail'

function App() {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistered, setIsRegistered] = useState(true)
  const [isEmailConfirmDisplayed, setIsEmailConfirmDisplayed] = useState(false)


useEffect(()=>{
    onAuthStateChanged(auth, (u)=>{
      setUser(u)
    })
  }, [])
  
  return (
    <>
    
      <div className='BackgroundImage'></div>

      {!isLoggedIn ? (
        <>
          {!isRegistered ? (
            !isEmailConfirmDisplayed ? (
              <SignUp 
                setIsRegistered={setIsRegistered} 
                setIsEmailConfirmDisplayed={setIsEmaailConfirmDisplayed} 
              />
            ) : (
              <ConfirmEmail 
                setIsEmailConfirmDisplayed={setIsEmailConfirmDisplayed} 
                setIsRegistered={setIsRegistered} 
              />
            )
          ) : (
            <LogIn setIsRegistered={setIsRegistered} setIsLoggedIn={setIsLoggedIn} />
          )}
        </>
      ) : (
        <>
          <h1>Witaj w aplikacji</h1>
        </>
      )}
    </>
  )
}

export default App
