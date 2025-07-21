import { addDoc, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { estimateCalories } from '../caloriesEstimator'
import { db, auth } from "../../firebase";
import './GeneratePlanContainer.css'




function FillTrainingPlan({FetchTrainingPlanList,trainingOptions,planCreatingWay,setPlanCreatingWay}){
const weekDays = ['Poniedziałek', "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]


    const [selectedActivities, setSelectedActivities] = useState([])
    const [trainingGoal, setTrainingGoal] = useState('Czas')
    const [trainingGoalValue, setTrainingGoalValue] = useState(0)
    const [trainingHour, setTrainingHour] = useState('')
    const [trainingWeekDay, setTrainingWeekDay] = useState('Poniedziałek')
    const [trainingDescription, setTrainingDescription] = useState('')
    const [trainingUnit, setTrainingUnit] = useState('min')

    useEffect(()=>{
        if(FetchTrainingPlanList){
            FetchTrainingPlanList();


        }
    },[FetchTrainingPlanList])
    useEffect(()=>{
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
        setTrainingUnit(trainingUnit)

    },[trainingGoal] )

    async function handleTrainingAdd(){
        if(selectedActivities && trainingGoal && trainingGoalValue && trainingHour && trainingWeekDay!==''){

        let estimatedCalories = 0;
            if(trainingUnit ==="min"){
                 estimatedCalories = estimateCalories({type:selectedActivities,durationMin:Number(trainingGoalValue) })
            }
            else if(trainingUnit === "km"){
                estimatedCalories = estimateCalories({type:selectedActivities,distanceKm:Number(trainingGoalValue) })


    }
        let newSingleTrainingPlan = {
                userID:auth.currentUser.uid,
                activity: selectedActivities,
                trainingGoalValue: Number(trainingGoalValue),
                timeOfDay: trainingHour,
                trainingDays: trainingWeekDay,
                trainingDescription: trainingDescription,
                estimatedCalories:estimatedCalories,
                trainingUnit: trainingUnit,
                dayOfTheWeek: weekDays.indexOf(trainingWeekDay),
                
            };
            try{
                const docRef = await addDoc(collection(db, "TrainingPlanList"), newSingleTrainingPlan)
            }
            catch(error){
                window.alert('Coś poszło nie tak. Spróbuj ponownie.')

            }
            FetchTrainingPlanList();

        }
        else{
            window.alert("Uzupełnij wszystkie dane")
        }

        
     }
    
    
    
    return(
        <div className="AddPlanContainer">
            <h1 className="Heading">Ułóż swój własny plan :)</h1>
                <div className='SwitchContainer'>
                    <button style={{backgroundColor:planCreatingWay==="Wpisz"?"hsl(28, 100%, 60%":"white"}} onClick={()=>setPlanCreatingWay("Wpisz")}>Wpisz samodzielnie</button>

                    <button style={{backgroundColor:planCreatingWay==="Wygeneruj"?"hsl(28, 100%, 60%":"white"}} onClick={()=>setPlanCreatingWay("Wygeneruj")}>Wygeneruj automatycznie</button>
                 </div>
           <input className="planInput" 
 list='trainings' placeholder='Wybierz typ treningu' onChange={event=>setSelectedActivities(event.target.value)}/>
        <datalist id='trainings'>
            {trainingOptions.map((element,index)=>(
                <option value={element} key={index}/>
            ))}

        </datalist>
            <div className="GoalContainer">
            <p>Wybierz swój cel:</p>
            <select  onChange={event=>setTrainingGoal(event.target.value)} className="planInput">
                <option value="Czas">Czas</option>
                <option value="Dystans">Dystans</option>
                <option value="Kalorie">Kalorie</option>
            </select>

            </div>
            <input  onChange={event=>setTrainingGoalValue(event.target.value)} className="planInput" type="number" placeholder={`Wybierz ilość (${trainingUnit})`}/>

            <div className="GoalContainer">
                <p>Wybierz godzinę: </p>
                <input  onChange={event=>setTrainingHour(event.target.value)} type="time" className="planInput" />
            </div>
            <div className="GoalContainer">
                <p>Wybierz dzień tygodnia </p>
                <select  onChange={event=>setTrainingWeekDay(event.target.value)} className="planInput" name="" id="">
                    {weekDays.map(element=>(
                    <option value={element}>{element}</option>
                ))}


                </select>
                
            </div>
            <textarea  onChange={event=>setTrainingDescription(event.target.value)}  className='planInput' placeholder='Dodaj dodatkowe notatki' name="" id=""></textarea>
            <button className='createPlanButton' onClick={handleTrainingAdd}  >Dodaj trening</button>



        </div>

    )
}
export default FillTrainingPlan