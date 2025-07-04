import { use, useEffect, useState } from 'react'
import { db, auth } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import './AddNewTraining.css'
import { addDoc, collection } from 'firebase/firestore';
function AddNewTraining({trainingsList,trainingOptions, user,fetchTrainingsList,selectedTraining,setSelectedTraining}){


    const [trainingType, setTrainingType] = useState('')
    const [trainingGoal, setTrainingGoal] = useState('Czas')
    const [trainingGoalValue, setTrainingGoalValue] = useState('')
    const [trainingHour, setTrainingHour]  = useState('')
    const [trainingDate, setTrainingDate] = useState('')
    const [unit, setUnit] = useState('')
    const [trainingDescription, setTrainingDescription] = useState('')

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

    function ClearInputs(){
            setTrainingType('')
            setTrainingGoal('')
            setTrainingGoalValue('')
            setTrainingDate('')
            setTrainingHour('')
            setTrainingDescription('')
    }
    useEffect(()=>{
        ClearInputs();
        setIsEditRunning(false)
        console.log(trainingsList)
    },[trainingsList])

    function CancelEdit(){
        setIsEditRunning(false);
        ClearInputs();
        setSelectedTraining(null)
        }

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
                    trainingDescription:trainingDescription,
                    addingDate:new Date(),

                }
                const docRef = await addDoc(collection(db, "Trainings"), newTraining)
                window.alert("Dodano trening!")
                fetchTrainingsList();
                ClearInputs();

                
            }
            else{
                window.alert("Uzupełnij wszystkie dane")

            }

            


        }
        else{
            window.alert("Musisz byc zalogowany, żeby dodać trening")
        }

    }

    useEffect(()=>{
        if(selectedTraining){
            setTrainingType(selectedTraining.trainingType)
            setTrainingGoal(selectedTraining.trainingGoal)
            setTrainingGoalValue(selectedTraining.trainingGoalValue)
            setTrainingDate(selectedTraining.trainingDate)
            setTrainingHour(selectedTraining.trainingHour)
            setTrainingDescription(selectedTraining.trainingDescription)

            setIsEditRunning(true)

        }


    }, [selectedTraining])

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
                trainingDescription:trainingDescription,

            })
            window.alert("Udało się zaktualizować trening!")
            fetchTrainingsList()
            setIsEditRunning(false)
            ClearInputs();

        }
        catch(error){
            window.alert("Nie udało się zaaktualizować treningu")

        }
        
    }

    
    return(<>
    <div className='AddNewTrainingContainer'>
        <h2>{isEditRunning?"Edytuj Trening":"Zaplanuj trening"}</h2>
        <input className="Inputs" value={trainingType} list='trainings' placeholder='Wybierz typ treningu' onChange={event=>setTrainingType(event.target.value)}/>
        <datalist id='trainings'>
            {trainingOptions.map((element,index)=>(
                <option value={element} key={index}/>
            ))}

        </datalist>
        <select className="Inputs" value={trainingGoal} name="" id="" onChange={event=>setTrainingGoal(event.target.value)}>
            <option selected value="Czas">Czas</option>
            <option value='Dystans'>Dystans</option>
            <option value="Kalorie">Kalorie</option>
        </select>
        <input className="Inputs" value={trainingGoalValue}type="number" placeholder= {`Wybierz ilość: ${trainingGoal}(${unit})`} onChange={event=>setTrainingGoalValue(event.target.value)}/>
        <input placeholder="Wybierz datę treningu" type={trainingDate ? 'date' : 'text'} onFocus={e => e.target.type = 'date'} onBlur={e => !e.target.value && (e.target.type = 'text')}  className="Inputs" value={trainingDate}  onChange={event=>setTrainingDate(event.target.value)}/>
        <input className="Inputs" type={trainingHour ? 'time' : 'text'} onFocus={e => e.target.type = 'time'} onBlur={e => !e.target.value && (e.target.type = 'text')}value={trainingHour}  placeholder='Wybierz godzinę' onChange={event=>setTrainingHour(event.target.value)}/>
        <textarea className="Inputs" value={trainingDescription} name="" id="" placeholder='Dodatkowe notatki (opcjonalnie)' onChange={event=>setTrainingDescription(event.target.value)}></textarea>
        <div className='ButtonContainer'>
            <button onClick={isEditRunning?handleTrainingEdit:handleTrainingAdd}>{isEditRunning?"Edytuj trening":"Dodaj trening"}</button>
            { isEditRunning &&
                <button onClick={CancelEdit}>Anuluj</button>
            }

        </div>

    </div>
    </>)
}
export default AddNewTraining