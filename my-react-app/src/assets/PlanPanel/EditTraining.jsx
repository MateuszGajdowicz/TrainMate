import { useEffect, useState } from 'react'
import Select from 'react-select';
import { addDoc,query, collection, where,getDocs } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { estimateCalories } from '../caloriesEstimator';
import './GeneratePlanContainer.css'


function EditTraining({FetchTrainingPlanList,selectedTrainingIndex,trainingPlan,selectedTraining,setSelectedTraining,trainingOptions}){
    const weekDays = ['Poniedziałek', "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
    const [trainingOptionsArray, setTrainingOptionsArray] = useState(trainingOptions.map(element=>({value:element, label:element})))

    const [selectedActivities, setSelectedActivities] = useState([])
    const [trainingGoal, setTrainingGoal] = useState('')
    const [trainingGoalValue, setTrainingGoalValue] = useState(0)
    const [trainingHour, setTrainingHour] = useState('')
    const [trainingWeekDay, setTrainingWeekDay] = useState('')
    const [trainingDescription, setTrainingDescription] = useState('')




    
    useEffect(()=>{
        if(selectedTraining!==null){
        if(selectedTraining){
            switch(selectedTraining.trainingUnit){
                case "min":
                    setTrainingGoal("Czas")
                    break;
                case "km":
                    setTrainingGoal("Dystans")
                    break;

            }
            setSelectedActivities(selectedTraining.activity)
            setTrainingGoalValue(selectedTraining.trainingGoalValue)
            setTrainingHour(selectedTraining.timeOfDay);

            setTrainingWeekDay(selectedTraining.trainingDays)
            console.log(selectedTraining)
            setTrainingDescription(selectedTraining.trainingDescription)


        }

        }
        


        },[selectedTraining])
        

 async function handleTrainingEdit() {
    if (selectedActivities &&trainingGoal &&trainingGoalValue &&trainingHour &&trainingWeekDay
    ) {
        try {


            let trainingUnit = "";
            switch (trainingGoal) {
                case "Czas":
                    trainingUnit = "min";
                    break;
                case "Dystans":
                    trainingUnit = "km";
                    break;
                case "Kalorie":
                    trainingUnit = "kcal";
                    break;
            }
            let estimatedCalories = 0;
            if(trainingUnit ==="min"){
                 estimatedCalories = estimateCalories({type:selectedActivities,durationMin:Number(trainingGoalValue) })
            }
            else if(trainingUnit === "km"){
                estimatedCalories = estimateCalories({type:selectedActivities,distanceKm:Number(trainingGoalValue) })


    }
        let updatedTraining = {
                activity: selectedActivities,
                trainingGoalValue: Number(trainingGoalValue),
                timeOfDay: trainingHour,
                trainingDays: trainingWeekDay,
                trainingDescription: trainingDescription,
                estimatedCalories:estimatedCalories,
                trainingUnit: trainingUnit,
                dayOfTheWeek: weekDays.indexOf(trainingWeekDay),
                
            };
            const docRef = doc(db, "TrainingPlanList", trainingPlan[selectedTrainingIndex].id);
            await updateDoc(docRef,updatedTraining );


            window.alert("Zaktualizowano trening!");
            setSelectedTraining(null);
            FetchTrainingPlanList();

        } catch (error) {
            console.error("Błąd przy aktualizacji treningu:", error);
            window.alert("Coś poszło nie tak 😥");
        }
    } else {
        window.alert("Uzupełnij wszystkie pola!");
    }
}




    return(
        <div className="AddPlanContainer">
            <h1 className="Heading">Edytuj trening</h1>
           <input className="planInput" value={selectedActivities}
 list='trainings' placeholder='Wybierz typ treningu' onChange={event=>setSelectedActivities(event.target.value)}/>
        <datalist id='trainings'>
            {trainingOptions.map((element,index)=>(
                <option value={element} key={index}/>
            ))}

        </datalist>
            <div className="GoalContainer">
            <p>Wybierz swój cel:</p>
            <select value={trainingGoal} onChange={event=>setTrainingGoal(event.target.value)} className="planInput">
                <option value="Czas">Czas</option>
                <option value="Dystans">Dystans</option>
                <option value="Kalorie">Kalorie</option>
            </select>

            </div>
            <input value={trainingGoalValue} onChange={event=>setTrainingGoalValue(event.target.value)} className="planInput" type="number" placeholder="Wybierz ilość"/>

            <div className="GoalContainer">
                <p>Wybierz godzinę: </p>
                <input value={trainingHour} onChange={event=>setTrainingHour(event.target.value)} type="time" className="planInput" />
            </div>
            <div className="GoalContainer">
                <p>Wybierz dzień tygodnia </p>
                <select value={trainingWeekDay} onChange={event=>setTrainingWeekDay(event.target.value)} className="planInput" name="" id="">
                    {weekDays.map(element=>(
                    <option value={element}>{element}</option>
                ))}


                </select>
                
            </div>
            <textarea value={trainingDescription}  onChange={event=>setTrainingDescription(event.target.value)}  className='planInput' placeholder='Dodaj dodatkowe notatki' name="" id=""></textarea>
            <div style={{display:"flex"}}>
                <button className='createPlanButton' onClick={handleTrainingEdit} >Edytuj</button>
                <button className='createPlanButton' onClick={()=>setSelectedTraining(null)}>Anuluj</button>

            </div>




        </div>
    )
}
export default EditTraining
