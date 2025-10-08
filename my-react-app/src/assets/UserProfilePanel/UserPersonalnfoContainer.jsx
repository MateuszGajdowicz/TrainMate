import { useState } from 'react'
import './UserPersonalInfoContainer.css'
import {auth, db} from '../../firebase'
import { collection, getDocs, query,where,doc, addDoc, updateDoc } from 'firebase/firestore'

function UserPersonalInfoContainer({userInfo}){

    const [changedData, setChangedData] = useState(null)
    const [selectedSex, setSelectedSex] = useState('')
    const [selectedAge, setSelectedAge] = useState(0)
    const [selectedWeight, setSelectedWeight] = useState(0)
    const [selectedHeight, setSelectedHeight] =useState(0)

    function handleDataChange(){
        try{
            const docRef = doc(db, "UserInformation", userInfo[0].id)
            // await updateDoc(docRef, 
            //     switch
            // )

        }
        catch(error){
            console.log(error)
        }

    }

    return(
        <div className="UserPersonalInfoContainer">
            <div className='ProfilePicture'></div>
            <h1>{userInfo[0].username}</h1>
            <h2>{userInfo[0].email}</h2>
            <p>Informacje o Tobie</p>
            <h3>Płeć</h3>
            <div className='infoContainer'>
                {
                    changedData==='userSex'?
                    <select className='data' value={selectedSex} onChange={event=>setSelectedSex(event.target.value)} name="" id="">
                        <option value="Mężczyzna">Mężczyzna</option>
                        <option value="Kobieta">Kobieta</option>
                        <option value="Inne">Inne</option>
                    </select>
                    :
                    <p className='data' >{userInfo[0].userSex===null?'Brak':userInfo[0].userSex}</p>
                }
                <p onClick={()=>setChangedData(changedData === 'userSex' ? null : 'userSex')}>{changedData==='userSex'?'Zapisz':'Edytuj'}</p>
                {changedData==='userSex' &&
                    <p onClick={()=>setChangedData(null)}>Anuluj</p>
                }
            </div>
            <h3>Wiek</h3>
            <div className='infoContainer'>
                {
                    changedData==='userAge'?
                    <input className='data' type="number" min='0' onChange={event=>selectedAge(event.target.value)}/>
                    :
                    <p className='data' >{userInfo[0].userAge===null?'Brak':userInfo[0].userAge}</p>
                }
                <p onClick={()=>setChangedData(changedData === 'userAge' ? null : 'userAge')}>{changedData==='userAge'?'Zapisz':'Edytuj'}</p>
                {changedData==='userAge' &&
                    <p onClick={()=>setChangedData(null)}>Anuluj</p>
                }
            </div>        
            <h3>Waga</h3>
            <div className='infoContainer'>
                {
                    changedData==='userWeight'?
                    <input onChange={event=>setSelectedWeight(event.target.value)} className='data' type="number" min='0'/>
                    :
                    <p className='data' >{userInfo[0].userWeight===null?'Brak':userInfo[0].userWeight}</p>
                }
                <p onClick={()=>setChangedData(changedData === 'userWeight' ? null : 'userWeight')}>{changedData==='userWeight'?'Zapisz':'Edytuj'}</p>
                {changedData==='userWeight' &&
                    <p onClick={()=>setChangedData(null)}>Anuluj</p>
                }
            </div>  
            <h3>Wzrost</h3>
            <div className='infoContainer'>
                {
                    changedData==='userHeight'?
                    <input onChange={event=>setSelectedHeight(event.target.value)} className='data' type="number" min='0'/>
                    :
                    
                    <p className='data' >{userInfo[0].userHeight===null?'Brak':userInfo[0].userHeight}</p>
                }
                <p onClick={()=>setChangedData(changedData === 'userHeight' ? null : 'userHeight')}>{changedData==='userHeight'?'Zapisz':'Edytuj'}</p>
                {changedData==='userHeight' &&
                    <p onClick={()=>setChangedData(null)}>Anuluj</p>
                }

            </div>           
            <h2 className='settingsButton'>Ustawienia konta</h2>


        </div>
    )
}
export default UserPersonalInfoContainer