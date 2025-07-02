import { use, useEffect, useState } from 'react'
import { db, auth } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

import './AddNewTraining.css'
import { addDoc, collection } from 'firebase/firestore';
function AddNewTraining({trainingOptions, user,fetchTrainingsList,selectedTraining}){


    const [trainingType, setTrainingType] = useState('')
    const [trainingGoal, setTrainingGoal] = useState('')
    const [trainingGoalValue, setTrainingGoalValue] = useState('')
    const [trainingHour, setTrainingHour]  = useState('')
    const [trainingDate, setTrainingDate] = useState('')

    const [unit, setUnit] = useState('')

    const [isEditRunning, setIsEditRunning] = useState(false)


    useEffect(()=>{
        switch(trainingGoal){
            case "Czas":
                setUnit("min")
                break;
            case "Dystans":
                setUnit("m")
                break;
            case "Kalorie":
                setUnit("kcal")
                break;
        }
    },[trainingGoal])


    async function handleTrainingAdd(){
        if(user){
                if(trainingType&&trainingGoal&&trainingGoalValue&&trainingDate&&trainingHour!==""){
                const newTraining = {
                    userID: auth.currentUser.uid,
                    trainingType:trainingType,
                    trainingGoal:trainingGoal,
                    trainingGoalValue:trainingGoalValue,
                    trainingUnit:unit,
                    trainingDate:trainingDate,
                    trainingHour:trainingHour,
                    addingDate:new Date(),

                }
                const docRef = await addDoc(collection(db, "Trainings"), newTraining)
                window.alert("Dodano trening!")
                fetchTrainingsList();
                setTrainingType('')
                setTrainingGoal('')
                setTrainingGoalValue('')
                setTrainingDate('')
                setTrainingHour('')
                setIsEditRunning(false)
                
            }
            else{
                window.alert("Uzupełnij wszystkie dane")

            }

            


        }
        else{
            window.alert("Musisz byc zalogowany, żeby dodać trening")
        }

    }
    function prepareForTrainingEdit() {
        setTrainingType(selectedTraining.trainingType)
        setTrainingGoal(selectedTraining.trainingGoal)
        setTrainingGoalValue(selectedTraining.trainingGoalValue)
        setTrainingDate(selectedTraining.trainingDate)
        setTrainingHour(selectedTraining.trainingHour)
        setIsEditRunning(true)
        
    }

    async function handleTrainingEdit() {
        try{
            const docRef = doc(db, "Trainings", selectedTraining.id);
            await updateDoc(docRef, {
                trainingType:trainingType,
                trainingGoal:trainingGoal,
                trainingGoalValue:trainingGoalValue,
                trainingUnit:unit,
                trainingDate:trainingDate,
                trainingHour:trainingHour,

            })
            window.alert("Udało się zaktualizować trening!")
            fetchTrainingsList()
            setIsEditRunning(false)

        }
        catch(error){
            window.alert("Nie udało się zaaktualizować treningu")

        }
        
    }

    
    return(<>
    <div className='AddNewTrainingContainer'>
        <h2>{isEditRunning?"Edytuj Trening":"Zaplanuj trening"}</h2>
        <input value={trainingType} list='trainings' placeholder='Wybierz typ treningu' onChange={event=>setTrainingType(event.target.value)}/>
        <datalist id='trainings'>
            {trainingOptions.map((element,index)=>(
                <option value={element} key={index}/>
            ))}

        </datalist>
        <select value={trainingGoal} name="" id="" onChange={event=>setTrainingGoal(event.target.value)}>
            <option selected value="Czas">Czas</option>
            <option value='Dystans'>Dystans</option>
            <option value="Kalorie">Kalorie</option>
        </select>
        <input value={trainingGoalValue}type="number" placeholder= {`Wybierz ilość: ${trainingGoal}(${unit})`} onChange={event=>setTrainingGoalValue(event.target.value)}/>
        <input value={trainingDate} type="date" placeholder='Wybierz datę' onChange={event=>setTrainingDate(event.target.value)}/>
        <input value={trainingHour} type="time" placeholder='Wybierz godzinę' onChange={event=>setTrainingHour(event.target.value)}/>
        <button onClick={isEditRunning?handleTrainingEdit:handleTrainingAdd}>{isEditRunning?"Edytuj trening":"Dodaj trening"}</button>
        <button onClick={prepareForTrainingEdit}>click</button>


    </div>
    </>)
}
export default AddNewTraining