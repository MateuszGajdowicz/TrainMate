import { useEffect, useState } from 'react'
import './UserPersonalInfoContainer.css'
import {auth, db} from '../../firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { collection, getDocs, query,where,doc, addDoc, updateDoc } from 'firebase/firestore'

function UserPersonalInfoContainer({userInfo, FetchUserInformation,setIsSettingDisplayed}){

    const [changedData, setChangedData] = useState(null)
    const [selectedSex, setSelectedSex] = useState(userInfo? userInfo[0].userSex: '')
    const [selectedAge, setSelectedAge] = useState(userInfo? userInfo[0].userAge:0)
    const [selectedWeight, setSelectedWeight] = useState(userInfo?userInfo[0].userWeight:0)
    const [selectedHeight, setSelectedHeight] =useState(userInfo?userInfo[0].userHeight:0)

    const [selectedPicture, setSelectedPicture] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')


    useEffect(()=>{
    FetchUserInformation()
},[])
    async function uploadProfilePicture(){
        try{
            const storage = getStorage()
            const fileRef = ref(storage, `profilePictures/${userInfo[0].id}_${selectedPicture.name}`)
            await uploadBytes(fileRef, selectedPicture)
            const downloadUrl = await getDownloadURL(fileRef)
                const userDoc = doc(db, "UserInformation", userInfo[0].id)
    await updateDoc(userDoc, { userProfilePic: downloadUrl })
        }
        catch(error){
            console.log(error)
        }
    }

    async function handleDataChange(){
        try{
            const docRef = doc(db, "UserInformation", userInfo[0].id)
            switch(changedData){
                case 'userSex':
                    await updateDoc(docRef, {userSex:selectedSex})
                    break;
                case 'userAge':
                    await updateDoc(docRef, {userAge:selectedAge})
                    break
                case 'userHeight':
                    await updateDoc(docRef, {userHeight:selectedHeight})
                    break
                case 'userWeight':
                    await updateDoc(docRef, {userWeight:selectedWeight})
                    break
            }
            FetchUserInformation();
            setChangedData(null)
            

        }
        catch(error){
            console.log(error)
        }

    }

    useEffect(()=>{
        if(selectedPicture){
                    uploadProfilePicture();


        }
        console.log(selectedPicture)
    },[selectedPicture])
    return(
        <div className="UserPersonalInfoContainer">
            {/* <div className='ProfilePicture'>
                <input type="file" onChange={event=>setSelectedPicture(event.target.files[0])}/>
            </div> */}
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
                {changedData==='userSex'?
                    <>
                    <p onClick={()=>handleDataChange()}>Zapisz</p>
                    <p onClick={()=>setChangedData(null)}>Anuluj</p>

                    </>
                    :
                    <p onClick={()=>setChangedData('userSex')}>Edytuj</p>

                }
            </div>
            <h3>Wiek</h3>
            <div className='infoContainer'>
                {
                    changedData==='userAge'?
                    <input className='data' value={selectedAge} type="number" min='0' onChange={event=>setSelectedAge(event.target.value)}/>
                    :
                    <p className='data' >{userInfo[0].userAge===null?'Brak':userInfo[0].userAge}</p>
                }
                {changedData==='userAge' ?
                    <>
                    <p onClick={()=>handleDataChange()}>Zapisz</p>
                    <p onClick={()=>setChangedData(null)}>Anuluj</p>

                    </>
                    :
                    <p onClick={()=>setChangedData('userAge')}>Edytuj</p>
                                    }
            </div>        
            <h3>Waga (kg)</h3>
            <div className='infoContainer'>
                {
                    changedData==='userWeight'?
                    <input value={selectedWeight} onChange={event=>setSelectedWeight(event.target.value)} className='data' type="number" min='0'/>
                    :
                    <p className='data' >{userInfo[0].userWeight===null?'Brak':userInfo[0].userWeight}</p>
                }
                {changedData==='userWeight'?
                    <>
                    <p onClick={()=>handleDataChange()}>Zapisz</p>
                    <p onClick={()=>setChangedData(null)}>Anuluj</p>

                    </>
                    :
                    <p onClick={()=>setChangedData('userWeight')}>Edytuj</p>
                }
            </div>  
            <h3>Wzrost (cm)</h3>
            <div className='infoContainer'>
                {
                    changedData==='userHeight'?
                    <input value={selectedHeight} onChange={event=>setSelectedHeight(event.target.value)} className='data' type="number" min='0'/>
                    :
                    
                    <p className='data' >{userInfo[0].userHeight===null?'Brak':userInfo[0].userHeight}</p>
                }
                {changedData==='userHeight' ?
                    <>
                    <p onClick={()=>handleDataChange()}>Zapisz</p>
                    <p onClick={()=>setChangedData(null)}>Anuluj</p>

                    </>
                    :
                    <p onClick={()=>setChangedData('userHeight')}>Edytuj</p>                }

            </div>           
            <h2 onClick={()=>setIsSettingDisplayed(true)} className='settingsButton'>Ustawienia konta</h2>


        </div>
    )
}
export default UserPersonalInfoContainer