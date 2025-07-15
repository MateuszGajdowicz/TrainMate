import { useEffect, useState } from 'react';
import './AddPlanContainer.css'
import Select from 'react-select';
import { GenerateTrainingPlan } from './PlanCreator';
import { CheckIsGoal } from './PlanCreator';
function AddPlanContainer({user,trainingOptions,setTrainingPlan}){
    
    const [trainingOptionsArray, setTrainingOptionsArray] = useState(trainingOptions.map(element=>({value:element, label:element})))
    const goalOptions = ['Poprawa wytrzymałości (kondycji)', 'Budowa masy mięśniowej (siła)', 'Utrata wagi / redukcja tkanki tłuszczowej', 'Poprawa mobilności i elastyczności', 'Poprawa szybkości i zwinności', 'Poprawa zdrowia i samopoczucia'];
    const intensityOptions = ['Niska', 'Średnia', 'Wysoka', 'Bardzo wysoka'];
    const timeOfDayOptions = ['Rano (6:00–9:00)', 'Przedpołudnie (9:00–13:00)', 'Popołudnie (13:00–17:00)', 'Wieczór (17:00–21:00)', 'Późny wieczór (21:00–00:00)'];

    const [trainingPlanGoal, setTrainingPlanGoal] = useState ('Budowa masy mięśniowej (siła)')
    const [selectedActivities, setSelectedActivites] = useState([])
    const [planIntensity, setPlanIntensity] = useState('Niska')
    const [trainingsNumber, setTrainingsNumber] = useState('')
    const [trainingTime, setTrainingTime] = useState('Rano (6:00–9:00)')
    const [trainingLength, setTrainingLength] = useState('')
    const [trainingDescription, setTrainingDescription] = useState('')


    let newTrainingPlanData = {}
    function CreateTrainingPlan(){
        if(user){
            if(selectedActivities && trainingPlanGoal && planIntensity && trainingsNumber && trainingTime && trainingLength !==""){
                newTrainingPlanData = {
                    trainingPlanGoal:trainingPlanGoal,
                    selectedActivities:selectedActivities,
                    planIntensity:planIntensity,
                    trainingsNumber:trainingsNumber,
                    trainingTime:trainingTime,
                    trainingLength:trainingLength,
                    trainingDescription:trainingDescription,
                }
                setTrainingPlan(GenerateTrainingPlan(trainingPlanGoal,  selectedActivities.map((activity) => activity.value),planIntensity,trainingsNumber, trainingTime,trainingLength))
                let isMatched = CheckIsGoal(selectedActivities.map((activity) => activity.label), trainingPlanGoal)
                console.log(isMatched)



        }
            else{
                window.alert("Uzupełnij wszystkie dane ")
        }

        }
        else{
            window.alert("Musisz być zalogowany żeby dodać plan")

        }


    }

    
    return(
        <>
        <div className='AddPlanContainer'>
            <h1 className='Heading'>Zbuduj swój własny plan :)</h1>
            <div className='GoalContainer'>
                <p>Wybierz główny cel: </p>

            <select onChange={event=>setTrainingPlanGoal(event.target.value)} className='planInput'  name="" id="">
                {goalOptions.map((element,index)=>(
                    <option key={index} value={element}>{element}</option>
                ))}
            </select>

            </div>

            <Select styles={{ control: (base) => ({ ...base, borderRadius: '20px', border: '3px solid hsl(28, 100%, 60%)', width: '400px', boxShadow: 'none' }), placeholder: (base) => ({ ...base, color: '#999' }), multiValue: (base) => ({ ...base, borderRadius: '10px', backgroundColor: 'hsl(28, 100%, 90%)' }) }}
            onChange={setSelectedActivites} classNamePrefix='rs' isMulti options={trainingOptionsArray} type="text" placeholder='Wybierz preferowane aktywności'/>
            <div className='GoalContainer'>
                <p>Wybierz intensywność:</p>
            <select onChange={event=>setPlanIntensity(event.target.value)} className='planInput' name="" id="">
                {intensityOptions.map((element, index)=>(
                    <option key={index} value={element}>{element}</option>
                ))}

            </select>
            </div>

            <input onChange={event=>setTrainingsNumber(parseInt(event.target.value))} className='planInput' type="number" placeholder='Liczba treningów w tygodniu' />
            <div className='GoalContainer'>
                <p>Wybierz preferowaną porę dnia:</p>
            <select onChange={event=>setTrainingTime(event.target.value)} style={{width:'45%'}} className='planInput' name="" id="">\
                {timeOfDayOptions.map((element, index)=>(
                    <option key={index} value={element}>{element}</option>
                ))}

            </select>
            </div>
            <input onChange={event=>setTrainingLength(parseInt(event.target.value))} className='planInput' type="number" placeholder='Wybierz długość treningu (min)' />
            <textarea onChange={event=>setTrainingDescription(event.target.value)} className='planInput' placeholder='Dodatkowe notatki' name="" id=""></textarea>
            <button onClick={CreateTrainingPlan} className='createPlanButton'>Stwórz plan</button>
        </div>
        </>
    )
}
export default AddPlanContainer