import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase";

function LogIn({setIsRegistered,setIsLoggedIn, user, setIsPasswordBeingReset}){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [message, setMessage] =useState('')

    const [isResetDisplayed, setIsResetDisplayed] = useState(false)

    function resetPadssword(){

    }

    const [isLoading, setIsLoading] = useState(false)

    async function LogInUser() {
  try {
    setMessage('Loading...')
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await user.reload();

    if (user.emailVerified) {
      window.alert("Pomyślnie zalogowano ✅");
      setIsLoggedIn(true);
    } else {
      setMessage("Twój email nie został zweryfikowany ❌");
      await auth.signOut();
    }
    setMessage('')
  } catch (error) {
    console.log(error)
    switch (error.code) {
      case "auth/invalid-email":
        setMessage("Nieprawidłowy email.");
        break;
      case "auth/user-not-found":
        setMessage("Nie znaleziono użytkownika o tym adresie.");
        break;
      case "auth/invalid-credential":
        setMessage("Błędne hasło. Spróbuj ponownie");
        setIsResetDisplayed(true)
        break;
      default:
        setMessage("Coś poszło nie tak. Spróbuj ponownie.");
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
            {
              isResetDisplayed &&
            
            <p onClick={()=>setIsPasswordBeingReset(true)}>Nie pamiętasz hasła? <span className="span">Zresetuj je tutaj!</span> </p>

            }

        </div>
    )
}
export default LogIn