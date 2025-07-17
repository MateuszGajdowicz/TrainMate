import { useEffect, useState } from 'react'
import Select from 'react-select';
import { addDoc,query, collection, where,getDocs } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

function EditTraining({selectedTrainingIndex,trainingPlan,selectedTraining,setSelectedTraining,trainingOptions}){
    const weekDays = ['Poniedziałek', "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
    const [trainingOptionsArray, setTrainingOptionsArray] = useState(trainingOptions.map(element=>({value:element, label:element})))

    const [selectedActivities, setSelectedActivities] = useState([])
    const [trainingGoal, setTrainingGoal] = useState('')
    const [trainingGoalValue, setTrainingGoalValue] = useState(0)
    const [trainingHour, setTrainingHour] = useState('')
    const [trainingWeekDay, setTrainingWeekDay] = useState('')
    const [trainingDescription, setTrainingDescription] = useState('')




    
    useEffect(()=>{
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
            const formattedHour = selectedTraining.timeOfDay.toString().padStart(2, '0') + ":00";
            setTrainingHour(formattedHour);

            setTrainingWeekDay(selectedTraining.trainingDays)
            console.log(selectedTraining)
            setTrainingDescription(selectedTraining.trainingDescription)


        }

        },[selectedTraining])
        

    async function handleTrainingEdit(){
            if(selectedActivities && trainingGoal && trainingGoalValue && trainingHour && trainingWeekDay){
                try{
                    const docRef = doc(db, "TrainingPlanList", trainingPlan[0].id);
                    // await updateDoc(docRef, {
                    //     trainingPlanList[selectedTrainingIndex]: updatedTrainingPlanList
                    // });

                    

                }
                catch(error){
                    window.alert("Coś poszło nie tak")
                }
            }
        }



    return(
        <div className="AddPlanContainer">
            <h1 className="Heading">Edytuj trening</h1>
           <input className="planInput" value={selectedActivities} list='trainings' placeholder='Wybierz typ treningu' onChange={event=>setSelectedActivities(event.target.value)}/>
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
            <textarea  value={trainingDescription} className='planInput' placeholder='Dodaj dodatkowe notatki' name="" id=""></textarea>
            <button >Edytuj</button>
            <button onClick={()=>setSelectedTraining(null)}>Anuluj</button>



        </div>
    )
}
export default EditTraining
