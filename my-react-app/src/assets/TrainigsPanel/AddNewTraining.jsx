import { use, useEffect, useState } from 'react'
import { db, auth } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { estimateCalories } from '../caloriesEstimator';
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

    const [estimatedCalories, setEstimatedCalories] = useState()

    const [isEditRunning, setIsEditRunning] = useState(false)


    const [isRepeating, setIsRepeating] = useState(false)
    const [daysRepeat, setDaysRepeat] = useState(0)
    const [repeatCount, setRepeatCount] = useState(1)
    

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
            setTrainingGoal('Czas')
            setTrainingGoalValue('')
            setTrainingDate('')
            setTrainingHour('')
            setTrainingDescription('')
            setIsRepeating(false)
            setRepeatCount(1)
            setDaysRepeat(0)

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

        useEffect(()=>{
            console.log(isRepeating)
        },[isRepeating])

    async function handleTrainingAdd(){
        if(user){
            if(trainingType&&trainingGoal&&trainingGoalValue&&trainingDate&&trainingHour!==""){
            for(let i=0;i<repeatCount;i++){
                const baseDate = new Date(trainingDate);
                const newDate = !isRepeating? baseDate: new Date(baseDate.getTime() + i * daysRepeat * 24 * 60 * 60 * 1000);
                        const newTraining={
                            userID: auth.currentUser.uid,
                            trainingType:trainingType,
                            trainingGoal:trainingGoal,
                            trainingGoalValue:trainingGoalValue,
                            trainingUnit:unit,
                            trainingDate: new Date(newDate).toLocaleDateString('sv-SE'),

                            trainingHour:trainingHour,
                            trainingDescription:trainingDescription,
                            estimatedCalories:estimatedCalories,
                            isFavourite:false,
                            addingDate:new Date(),

                        }
                    const docRef = await addDoc(collection(db, "Trainings"), newTraining)



                    

                }


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
    useEffect(() => {
        if(trainingGoal==="Kalorie"){
            setEstimatedCalories(trainingGoalValue)
        }
        else {
                let result = 0;

                if (trainingGoal === "Czas") {
                    result = estimateCalories({
                        type: trainingType,
                        durationMin: parseFloat(trainingGoalValue)
                    });
                } else if (trainingGoal === "Dystans") {
                    result = estimateCalories({
                        type: trainingType,
                        distanceKm: parseFloat(trainingGoalValue) / 1000
                    });
                }

                setEstimatedCalories(result);
        

        }

}, [trainingType, trainingGoal, trainingGoalValue]);


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



    function handleChecked(event){
        setIsRepeating(event.target.value === 'yes')


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
        <div className='goalContainer'>
            <p>Wybierz swój cel: </p>
        <select className="Inputs" value={trainingGoal} name="" id="" onChange={event=>setTrainingGoal(event.target.value)}>
            <option  value="Czas">Czas</option>
            <option value='Dystans'>Dystans</option>
            <option value="Kalorie">Kalorie</option>
        </select>

        </div>

        <input className="Inputs" value={trainingGoalValue}type="number" placeholder= {`Wybierz ilość: ${trainingGoal}(${unit})`} onChange={event=>setTrainingGoalValue(event.target.value)}/>
        <input min={new Date().toISOString().split("T")[0]} placeholder="Wybierz datę treningu" type={trainingDate ? 'date' : 'text'} onFocus={e => e.target.type = 'date'} onBlur={e => !e.target.value && (e.target.type = 'text')}  className="Inputs" value={trainingDate}  onChange={event=>setTrainingDate(event.target.value)}/>
        <input className="Inputs" type={trainingHour ? 'time' : 'text'} onFocus={e => e.target.type = 'time'} onBlur={e => !e.target.value && (e.target.type = 'text')}value={trainingHour}  placeholder='Wybierz godzinę' onChange={event=>setTrainingHour(event.target.value)}/>
        <textarea className="Inputs" value={trainingDescription} name="" id="" placeholder='Dodatkowe notatki (opcjonalnie)' onChange={event=>setTrainingDescription(event.target.value)}></textarea>
        <p>Czy chcesz powtarzać ten trening?</p>
        <div className='checkContainer'>
            <input onChange={event=>handleChecked(event)} checked={isRepeating === true} type="radio" id="yes" name="repeat" value="yes" />
            <label htmlFor="yes">Tak</label>

            <input onChange={event=>handleChecked(event)} onClick={()=>{setRepeatCount(1), setDaysRepeat(0)}} checked={isRepeating===false} type="radio" id="no" name="repeat" value="no" />
            <label htmlFor="no">Nie</label>
                    {isRepeating&&
                    (
                        <>
                    <input style={{width:"20%"}} onChange={event=>setDaysRepeat(parseInt(event.target.value))}  className='DaysInput' type='number' min={0} placeholder='Co ile dni?'/>
                    <input style={{width:"40%"}} onChange={event=>setRepeatCount(parseInt(event.target.value))} className='DaysInput' type="number"  min={0}  placeholder='Ile razy chcesz powtórzyć?'/>
                        </>


                    )

        
        }


        </div>



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