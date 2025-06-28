import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"

function ConfirmEmail({setIsEmailConfirmDisplayed, setIsRegistered,setISEmailVerified}){

    function Confirm(){
                setIsRegistered(true)
                setIsEmailConfirmDisplayed(false)
            }

        
    
    return(<>
    <h1 style={{fontSize:"1em", position:"absolute", top:"50%", left:"10%"}}>Wysłaliśmy na twój e-mail wiadomość z potwierdzeniem konta. Kliknij w link aktywacyjny a następnie wróć na stronę kliknij przycisk poniżej</h1>
    <button onClick={Confirm}>potweirdz </button>
    </>)
}   
export default ConfirmEmail