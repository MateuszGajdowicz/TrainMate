import { useState } from 'react'
import { db, auth } from "../firebase";

import './AddNewTraining.css'
import { addDoc, collection } from 'firebase/firestore';
function AddNewTraining({trainingOptions, user}){
    const [value, setValue] = useState('zdsd')

    const [trainingType, setTrainingType] = useState('')
    const [trainingGoal, setTrainingGoal] = useState('')
    const [trainingGoalValue, setTrainingGoalValue] = useState('')
    const [trainingDate, setTrainingDate] = useState('')


    async function handleTrainingAdd(){
        if(user){
            if(trainingType&&trainingGoal&&trainingGoalValue&&trainingDate!==""){
                const newTraining = {
                    userID: auth.currentUser.uid,
                    trainingType:trainingType,
                    trainingGoal:trainingGoal,
                    trainingGoalValue:trainingGoalValue,
                    trainingDate:trainingDate,
                    addingDate:new Date(),

                }
                const docRef = await addDoc(collection(db, "Trainings"), newTraining)
                window.alert("Dodano trening!")
            }
            else{
                window.alert("Uzupełnij wszystkie dane")

            }

        }
        else{
            window.alert("Musisz byc zalogowany, żeby dodać trening")
        }

    }



    
    return(<>
    <div className='AddNewTrainingContainer'>
        <h2>Zaplanuj trening</h2>
        <input list='trainings' placeholder='Wybierz typ treningu' onChange={event=>setTrainingType(event.target.value)}/>
        <datalist id='trainings'>
            {trainingOptions.map(element=>(
                <option value={element}/>
            ))}

        </datalist>
        <select name="" id="" onChange={event=>setTrainingGoal(event.target.value)}>
            <option value="Czas">Czas</option>
            <option value='Dystans'>Dystans</option>
            <option value="Kalorie">Kalorie</option>
        </select>
        <input type="number" placeholder= {`Wybierz ilość: ${trainingGoal}`} onChange={event=>setTrainingGoalValue(event.target.value)}/>
        <input type="date" placeholder='Wybierz datę' onChange={event=>setTrainingDate(event.target.value)}/>
        <input type="time" placeholder='Wybierz godzinę'/>
        <button onClick={handleTrainingAdd}>Dodaj trening</button>


    </div>
    </>)
}
export default AddNewTraining