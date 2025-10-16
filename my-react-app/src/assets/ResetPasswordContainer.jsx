import { useState } from 'react';
import './ResetPasswordContainer.css'
import { db, auth } from '../firebase'
import { getAuth, sendPasswordResetEmail} from "firebase/auth";

function ResetPasswordContainer({setIsPasswordBeingReset}){
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const [email, setEmail] = useState('')

        async function ResetPassword(){
            if(emailRegex.test(email)){
                const auth = getAuth();
                try{
                    await sendPasswordResetEmail(auth, email)
                    window.alert("Mail został wysłany na podany adres. Potwierdź go a następnie wróć do strony logowania.")
                }
                catch(error){
                    console.log(error)
                    window.alert("Coś poszło nie tak. Spróbuj ponownie")
                }

            }
            else{
                window.alert("Podaj poprawny adres e-mail.")
            }
            
        }

    return(
        <>
        <div className="resetPasswordContainer">
            <h1>Podaj adres e-mail, na który wyślemy mail do resetu hasła</h1>
            <div className='inputcontainer'>
            <input onChange={event=>setEmail(event.target.value)} placeholder='np. twójdadres@wp.pl' type="text" />
                <button onClick={ResetPassword} className='button'>Wyślij</button>
            </div>
            <button onClick={()=>setIsPasswordBeingReset(false)} style={{padding:'20px 20px', marginTop:'70px'}} className='button'>Wróć do strony logowania</button>

        </div>
        
        </>
    )
}
export default ResetPasswordContainer