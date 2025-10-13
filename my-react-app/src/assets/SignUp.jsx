import { useState } from 'react'
import './LogIn.css'
import {auth, db} from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

import { sendEmailVerification,createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function SignUp({username, setUsername,setIsRegistered, setIsEmailConfirmDisplayed}){
    const [email,setEmail] = useState('');
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
                    displayName:username,


                } )
                
            await sendEmailVerification(user)
            setIsEmailConfirmDisplayed(true)

        await addDoc(collection(db, "UserInformation"), {
          userID: user.uid,
          username: user.displayName,
          email: user.email,
          userPoints: 0,
          addDate: user.metadata.creationTime,
          lastLogin: user.metadata.lastSignInTime,
          userSex:null,
          userAge:null,
          userHeight:null,
          userWeight:null,
          userProfilePic:null
        });

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
            <div className="Logo"> 
                <h1>TrainMate</h1>
            </div>
                <input required value={email}type="email" placeholder="E-mail" onChange={event=>setEmail(event.target.value)}/>
                <input required value={username}type="text" placeholder="Nazwa użytkownika" onChange={event=>setUsername(event.target.value)}/>
                <input required value={password}type="password" placeholder="Hasło" onChange={event=>setPassword(event.target.value)}/>
                <input required value={confirmPassword}type="password" placeholder="Powtórz hasło"onChange={event=>setConfirmPassword(event.target.value)}/>
                <button onClick={SignUpUser}>Zarejestruj się</button>

                <p onClick={()=>setIsRegistered(true)}>Masz już konto? <span className='span'>Zaloguj się</span></p>
                <h3>{message}</h3>

            </div>

        </div>
    )
}
export default SignUp