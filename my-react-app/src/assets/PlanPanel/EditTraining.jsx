import { useEffect, useState } from 'react'
import Select from 'react-select';

function EditTraining({selectedTraining,setSelectedTraining,trainingOptions}){
    const weekDays = ['Poniedziałek', "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
    const [trainingOptionsArray, setTrainingOptionsArray] = useState(trainingOptions.map(element=>({value:element, label:element})))

    const [selectedActivities, setSelectedActivities] = useState([])
    const [trainingGoal, setTrainingGoal] = useState('')
    const [trainingGoalValue, setTrainingGoalValue] = useState(0)
    const [trainingHour, setTrainingHour] = useState('')
    const [trainingWeekDay, setTrainingWeekDay] = useState('')

    
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


        }

        },[selectedTraining])

    return(
        <div className="AddPlanContainer">
            <h1 className="Heading">Edytuj trening</h1>
        <Select value={selectedActivities} styles={{ control: (base) => ({ ...base, borderRadius: '20px', border: '3px solid hsl(28, 100%, 60%)', width: '400px', boxShadow: 'none' }), placeholder: (base) => ({ ...base, color: '#999' }), multiValue: (base) => ({ ...base, borderRadius: '10px', backgroundColor: 'hsl(28, 100%, 90%)' }) }}
            onChange={setSelectedActivities} classNamePrefix='rs' isMulti options={trainingOptionsArray} type="text" placeholder='Wybierz preferowane aktywności'/>
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
            <button >Edytuj</button>
            <button onClick={()=>setSelectedTraining(null)}>Anuluj</button>



        </div>
    )
}
export default EditTraining
