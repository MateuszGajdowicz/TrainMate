import { useState } from 'react'
import './LogIn.css'
import {auth} from '../firebase'

import { sendEmailVerification,createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function SignUp({setIsRegistered, setIsEmailConfirmDisplayed}){
    const [email,setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('')

    async function SignUpUser(){
        if(email=='' || username=='' || password==='' || confirmPassword===''){
            setMessage("Uzupełnij wszystkie dane")
            return;
        }
        else if(password!==confirmPassword){
            setMessage("Podane hasła różnią się od siebie")
            return;
        }
        else{
            try{
                const userCredential = await createUserWithEmailAndPassword(auth,email,password )
                const user = userCredential.user;


                await updateProfile(user,{
                    displayName:username
                } )
                
            await sendEmailVerification(user)
            setIsEmailConfirmDisplayed(true)

            setConfirmPassword("")
            setEmail("")
            setPassword("")
            setUsername("")



            }
            catch(error){
  switch (error.code) {
    case 'auth/email-already-in-use':
      setMessage("Ten email jest już używany.");
      break;
    case 'auth/invalid-email':
      setMessage("Nieprawidłowy format emaila.");
      break;
    case 'auth/weak-password':
      setMessage("Hasło musi mieć co najmniej 6 znaków.");
      break;
    default:
      setMessage("Ups! Coś poszło nie tak. 😥");
  }
}


        }
    }
    return(
        <div>
            <div className="LogInContainer">
                <input required value={email}type="email" placeholder="E-mail" onChange={event=>setEmail(event.target.value)}/>
                <input required value={username}type="text" placeholder="Nazwa użytkownika" onChange={event=>setUsername(event.target.value)}/>
                <input required value={password}type="password" placeholder="Hasło" onChange={event=>setPassword(event.target.value)}/>
                <input required value={confirmPassword}type="password" placeholder="Powtórz hasło"onChange={event=>setConfirmPassword(event.target.value)}/>
                <button onClick={SignUpUser}>Zarejestruj się</button>

                <p onClick={()=>setIsRegistered(true)}>Masz już konto? Zaloguj się</p>
                <h3>{message}</h3>

            </div>

        </div>
    )
}
export default SignUp