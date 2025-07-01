import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import './ConfirmEmail.css'

function ConfirmEmail({setIsEmailConfirmDisplayed, setIsRegistered,setISEmailVerified}){

    function Confirm(){
                setIsRegistered(true)
                setIsEmailConfirmDisplayed(false)
            }

        
    
    return(<>
    <div className="ConfirmContainer">
            <h3 >Wysłaliśmy na twój e-mail wiadomość z potwierdzeniem konta. Kliknij w link aktywacyjny a następnie wróć na stronę i kliknij przycisk poniżej.</h3>
            <button onClick={Confirm}>Potwierdziłem </button>

    </div>

    </>)
}   
export default ConfirmEmail