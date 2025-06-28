import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase";

function LogIn({setIsRegistered,setIsLoggedIn}){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState()
    const [message, setMessage] =useState('')

    async function LogInUser() {
        await auth.currentUser.reload()
        if(auth.currentUser.emailVerified){
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
    return(
        <div className="LogInContainer">
            <input type="email" placeholder="E-mail" onChange={(event)=>setEmail(event.target.value)}/>
            <input type="password" placeholder="Hasło" onChange={(event)=>setPassword(event.target.value)} />
            <p onClick={()=>setIsRegistered(false)}>Nie masz konta? Zarejestruj się</p>
            <button onClick={LogInUser}>Zaloguj</button>
            <p>{message}</p>

        </div>
    )
}
export default LogIn