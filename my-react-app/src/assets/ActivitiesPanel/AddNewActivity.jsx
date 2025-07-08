import '../TrainigsPanel/AddNewTraining.css'
import { estimateCalories } from '../caloriesEstimator';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore";

import { useState, useEffect } from 'react'
function AddNewActivity({trainingOptions,user,fetchActivitiesList}) {
    const [activityType, setActivityType] = useState('')
    const [activityGoal, setActivityGoal] = useState('Czas')
    const [activityGoalValue, setActivityTGoalValue] = useState('')
    const [activityHour, setActivityHour]  = useState('')
    const [activityDate, setActivityDate] = useState('')
    const [unit, setUnit] = useState('')
    const [activityDescription, setActivityDescription] = useState('')

    const [estimatedCalories, setEstimatedCalories] = useState()

    useEffect(()=>{
        switch(activityGoal){
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
    },[activityGoal])

 async function handleActivityAdd(){
        if(user){
            if(activityType&&activityGoal&&activityGoalValue&&activityDate&&activityHour!==""){
                const newActivity = {
                    userID: auth.currentUser.uid,
                    activityType:activityType,
                    activityGoal:activityGoal,
                    activityGoalValue:activityGoalValue,
                    activityUnit:unit,
                    activityDate:activityDate,
                    activityHour:activityHour,
                    activityDescription:activityDescription,
                    estimatedCalories:estimatedCalories,
                    addingDate:new Date(),

                }
                const docRef = await addDoc(collection(db, "Activities"), newActivity)
                window.alert("Dodano trening!");
                fetchActivitiesList()
                // ClearInputs();

                
            }
            else{
                window.alert("Uzupełnij wszystkie dane")

            }

            


        }
        else{
            window.alert("Musisz byc zalogowany, żeby dodać trening")
        }

    }
    useEffect(() => {
        if(activityGoal==="Kalorie"){
            setEstimatedCalories(activityGoalValue)
        }
        else {
                let result = 0;

                if (activityGoal === "Czas") {
                    result = estimateCalories({
                        type: activityType,
                        durationMin: parseFloat(activityGoalValue)
                    });
                } else if (activityGoal === "Dystans") {
                    result = estimateCalories({
                        type: activityType,
                        distanceKm: parseFloat(activityGoalValue) / 1000
                    });
                }

                setEstimatedCalories(result);
        

        }

}, [activityType, activityGoal, activityGoalValue]);
  return (
    <>
      <div className='AddNewTrainingContainer'>
        <h2>Wykonałeś nieplanowany trening? Dodaj go tutaj!</h2>

        <input className="Inputs" list='trainings' placeholder='Wybierz typ treningu' onChange={event=>setActivityType(event.target.value)}/>
        <datalist id='trainings'>
            {trainingOptions.map(element=>(
                <option value={element}/>
            ))}

        </datalist>

        <select className="Inputs" value={activityGoal} onChange={event=>setActivityGoal(event.target.value)}> 
          <option value="Czas">Czas</option>
          <option value="Dystans">Dystans</option>
          <option value="Kalorie">Kalorie</option>
        </select>

        <input className="Inputs" type="number" placeholder={`Wybierz ilość: ${activityGoal}(${unit})`} onChange={event=>setActivityTGoalValue(event.target.value)} />

        <input className="Inputs" type={activityDate ? 'date' : 'text'} onFocus={e => e.target.type = 'date'} onBlur={e => !e.target.value && (e.target.type = 'text')} placeholder="Wybierz datę treningu" onChange={event=>setActivityDate(event.target.value)} />

        <input className="Inputs" type={activityHour ? 'time' : 'text'} onFocus={e => e.target.type = 'time'} onBlur={e => !e.target.value && (e.target.type = 'text')} placeholder="Wybierz godzinę" onChange={event=>setActivityHour(event.target.value)}  />

        <textarea className="Inputs" placeholder="Dodatkowe notatki (opcjonalnie)" onChange={event=>setActivityDescription(event.target.value)}></textarea>

        <div className='ButtonContainer'>
          <button onClick={handleActivityAdd}>Dodaj trening</button>
          <button>Anuluj</button>
        </div>
      </div>
    </>
  );
}

export default AddNewActivity;
