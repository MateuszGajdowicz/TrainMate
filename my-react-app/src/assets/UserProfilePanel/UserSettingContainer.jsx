import './UserSettingContainer.css'
import { useEffect, useState } from 'react'
import { collection, getDocs, query,where,doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase';
import { getAuth,updateProfile, sendPasswordResetEmail, updateEmail,sendEmailVerification , deleteUser    } from "firebase/auth";


function UserSettingsContainer({userInfo,FetchUserInformation,setIsSettingDisplayed, LogOut}){
      const [isNotificationOn, setIsNotificationOn] = useState(false);
      const [isDarkOn, setIsDarkOn] = useState(false)

      const [selectedElement, setSelectedElement] = useState(null)

      const [selectedUsername, setSelectedUsername] = useState('')
      const [selectedEmail, setSelectedEmail] = useState('')




      async function hadleSettingChange(){
        try{
          const docRef = doc(db, 'UserInformation', userInfo[0].id)
          switch(selectedElement){
            case 'username':
              const auth = getAuth()
              const user = auth.currentUser
              await updateDoc(docRef, {username:selectedUsername})
              await updateProfile(user, {displayName:selectedUsername})
              break;

            
            
          }
        FetchUserInformation();
        setSelectedElement(null)

        }
        catch(error){
          console.log(error)
        }


      }

      async function handleAccountDelete(){
        const auth = getAuth();
        const user = auth.currentUser;
        let confirm= window.confirm("Czy na pewno chcesz usunąć konto? Ta akcja nie będzie mogła być cofnięta, a wszystkie dane użytkownika zostaną usunięte")
        if(confirm){
          try{

            await deleteDoc(doc(db,"UserInformation", userInfo[0].id ))
            await LogOut();


            await deleteUser(user)


          }
          catch(error){
            console.log(error)


          }
        }

      }




      async function handlePasswordReset(){
        let resetConfirm = window.confirm("Czy na pewno chcesz zresetować hasło?")
        if(resetConfirm){
          const auth = getAuth(); 
          const userEmail = userInfo[0].email;
          try{
            await sendPasswordResetEmail(auth, userEmail)
            window.alert(`Mail do resetu hasła został wysłany na adres ${userInfo[0].email}`)

          }
          catch(error){
            console.log(error)
          }

        }
      }
      

    return(
        <>
        
        <div className="UserSettingsContainer">
          <p onClick={()=>setIsSettingDisplayed(false)} className='arrowLeft'>&#x2190;</p>
            <h1>Ustawienia konta</h1>
            <h3>Nazwa użytkownika</h3>
            <div className='infoContainer'>
              {
                selectedElement==='username'?
                <>
                <input value={selectedUsername} onChange={event=>setSelectedUsername(event.target.value)} type="text" className='data' style={{backgroundColor:'white'}}/>
                <p onClick={()=>hadleSettingChange()}>Zapisz</p>
                <p onClick={()=>setSelectedElement(null)}>Anuluj</p>
                </>
                :
                <>
                <p className='data'>{userInfo[0]?.username}</p>
                <p onClick={()=>setSelectedElement('username')}>Edytuj</p>
                </>
                
              }


            </div>
            {/* <h3>Adres e-mail</h3>
            <div className='infoContainer'>
                {selectedElement==='email'?
                <>
                <input  value={selectedEmail} onChange={event=>setSelectedEmail(event.target.value)} style={{backgroundColor:'white'}} className='data'  type="email" />

                <p onClick={()=>hadleSettingChange()}>Zapisz</p>
                <p onClick={()=>setSelectedElement(null)}>Anuluj</p>
                </>
                :
                <>
              <p className='data'>{userInfo[0]?.email}</p>
              <p onClick={()=>setSelectedElement('email')}>Edytuj</p>


                </>


                }

            </div> */}
            <h3>Zresetuj hasło</h3>
            <button onClick={handlePasswordReset} className='resetButton'>Zresetuj</button>


            <h3>Włącz powiadomienia mailowe</h3>
            <div className='infoContainer'>
                    <div className="toggle-container">
      <div
        className={`toggle-switch ${isNotificationOn ? "on" : ""}`}
        onClick={()=>setIsNotificationOn(prev=>!prev)}
      >
        <div className="toggle-thumb"></div>
      </div>
      <span className="toggle-label">{isNotificationOn ? "Włączone" : "Wyłączone"}</span>
    </div>
                


            </div>
            <h3>Włącz tryb ciemny</h3>
            <div className='infoContainer'>
                    <div className="toggle-container">
      <div
        className={`toggle-switch ${isDarkOn ? "on" : ""}`}
        onClick={()=>setIsDarkOn(prev=>!prev)}
      >
        <div className="toggle-thumb"></div>
      </div>
      <span className="toggle-label">{isDarkOn ? "Włączone" : "Wyłączone"}</span>
    </div>
                


            </div>
            <button className='deleteButton' onClick={handleAccountDelete}>Usuń konto</button>
        </div>
        </>
    )
}
export default UserSettingsContainer