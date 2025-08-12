import { act, useEffect, useState } from 'react'
import './ConfirmPanel.css'
import { deleteDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { addDoc, collection,doc } from 'firebase/firestore';

function FailedNotification({fetchActivitiesList,fetchTrainingsList,selectedTraining,setSelectedTraining, setIsFailedDisplayed}){
    const [action,setAction] = useState(null)
    const [newDate, setNewDate] = useState(null)
    const [newHour, setNewHour] = useState(null)



    useEffect(()=>{
    console.log(action)
},[action])

async function handleTraining(element){
        try{
            const docRef = doc(db, "Trainings", element.id)

        if(action==="delete"){
            await deleteDoc(docRef)

            }
        else if(action==="reschedule"){
            if(newDate!==null && newHour!==null){
                await updateDoc(docRef, {trainingDate:newDate,
                trainingHour:newHour
            })

            }
            else{
                window.alert("Podaj wszystkie wymagane informacje")
            }

        }
        fetchTrainingsList();
        setIsFailedDisplayed(false)
        fetchActivitiesList();


        }
        catch(error){
            console.log(error)
            window.alert("Coś poszło nie tak")
        }
    

} 

    return(
        <div className='Container'>
            <div style={{width:"auto"}} className="confirmContainer">
            <h1>Nie przejmuj się! Odpoczynek też jest częścią treningu.</h1>
            <h2>Głowa do góry i ruszaj z kolejnymi treningami!</h2>
            <p>Co chcesz zrobić z tym treningiem?</p>
            <div style={{cursor:"pointer"}} className='radioContainer'>
                <label htmlFor="reschedule">Przełóż trening</label>
                <input value="reschedule" onChange={event=>setAction(event.target.value)} checked={action==="reschedule"} name='action' type="radio" id='reschedule' />

                <label htmlFor="delete">Usuń trening</label>
                <input value="delete" onChange={event=>setAction(event.target.value)} checked={action==="delete"} name='action' type="radio" id='delete'/>
            </div>
            {action==="reschedule" &&
            <>
            <div style={{display:"flex", gap:"10px", width:"30%"
            }}>
            <p>Podaj nową datę:</p>
            <input min={new Date().toISOString().split("T")[0]} className='inputs' placeholder='Podaj nową datę' type='date' onChange={event=>setNewDate(event.target.value)}/>
            
            </div>
            <div style={{display:"flex", gap:"10px",width:"30%"
            }}>
            <p>Podaj nową godzinę: </p>
            <input className='inputs' placeholder='Podaj nową datę' type='time' onChange={event=>setNewHour(event.target.value)}/>
            
            </div>
            </>
            

        }


          
            <div className='buttonContainer'>
                <button onClick={()=>handleTraining(selectedTraining)} >Zakończ</button>
                <button onClick={()=>{setSelectedTraining(null),setIsFailedDisplayed(false)}} >Anuluj</button>


            </div>
            

        </div>



        </div>

    )
}
export default FailedNotification