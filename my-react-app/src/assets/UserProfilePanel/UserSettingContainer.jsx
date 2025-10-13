import './UserSettingContainer.css'
import { useEffect, useState } from 'react'

function UserSettingsContainer({userInfo}){
      const [isNotificationOn, setIsNotificationOn] = useState(false);
      const [isDarkOn, setIsDarkOn] = useState(false)

      const [selectedElement, setSelectedElement] = useState(null)

    return(
        <>
        <div className="UserSettingsContainer">
            <h1>Ustawienia konta</h1>
            <h3>Nazwa użytkownika</h3>
            <div className='infoContainer'>
                <p className='data'>{userInfo[0].username}</p>
                <p>Edytuj</p>

            </div>
            <h3>Adres e-mail</h3>
            <div className='infoContainer'>
                <p className='data'>{userInfo[0].email}</p>
                <p>Edytuj</p>

            </div>
            <h3>Zresetuj hasło</h3>
            <button className='resetButton'>Zresetuj</button>


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
            <button className='deleteButton'>Usuń konto</button>
        </div>
        </>
    )
}
export default UserSettingsContainer