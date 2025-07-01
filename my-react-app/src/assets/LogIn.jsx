import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase";

function LogIn({setIsRegistered,setIsLoggedIn, user}){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [message, setMessage] =useState('')

    async function LogInUser() {
        if(user){
            await user.reload()
            if(user.emailVerified){
                try{
                    await signInWithEmailAndPassword(auth,email,password)
                    window.alert("Pomyślnie zalogowano");
                    setIsLoggedIn(true)

                }
                catch(error){
                    setMessage("Coś poszło nie tak. Spróbuj jeszcze raz.")

                }
                }
            else{
                    setMessage("Twój email nie został zweryfikowany")
                }
                    
                }
        else{
                try{
                    await signInWithEmailAndPassword(auth,email,password)
                    window.alert("Pomyślnie zalogowano");
                    setIsLoggedIn(true)

                }
                catch(error){
                    setMessage("Coś poszło nie tak. Spróbuj jeszcze raz.")

                }
                

            }
        

    }
    return(
        <div className="LogInContainer" style={{top:"25%"}}>
        <div className="Logo"> 
            <h1>TrainMate</h1>
        </div>
            <input type="email" placeholder="E-mail" onChange={(event)=>setEmail(event.target.value)}/>
            <input type="password" placeholder="Hasło" onChange={(event)=>setPassword(event.target.value)} />
            <p onClick={()=>setIsRegistered(false)}>Nie masz konta? <span className='span'>Zarejestruj się</span></p>
            <button onClick={LogInUser}>Zaloguj</button>
            <p>{message}</p>

        </div>
    )
}
export default LogIn