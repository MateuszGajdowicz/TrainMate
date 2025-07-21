import { useEffect, useState } from 'react';
import './GeneratePlanContainer.css'
import Select from 'react-select';
import { GenerateTrainingPlan } from './PlanCreator';
import { addDoc,query, collection, where,getDocs, deleteDoc } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

import { CheckIsGoal } from './PlanCreator';
function GeneratePlanContainer({setIsActivityMatched,planCreatingWay,setPlanCreatingWay,FetchTrainingPlanList,setTrainingPlanData,trainingPlanData,selectedTraining,user,trainingOptions,setTrainingPlan,trainingPlan}){
    
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



    useEffect(() => {
  console.log("trainingPlanData changed:", trainingPlanData);
  if(trainingPlanData.length!==0){
        setTrainingPlanGoal(trainingPlanData[0].trainingPlanGoal)
        setSelectedActivites(trainingPlanData[0].selectedActivities.map(element=>({value:element, label:element})))
        setPlanIntensity(trainingPlanData[0].planIntensity)
        setTrainingsNumber(trainingPlanData[0].trainingsNumber)
        setTrainingTime(trainingPlanData[0].trainingTime)
        setTrainingLength(trainingPlanData[0].trainingLength)
        setTrainingDescription(trainingPlanData[0].trainingDescription)



  }
        

}, [trainingPlanData]);

    useEffect(()=>{
        FetchTrainingPlanList();

    },[user, selectedTraining])


    async function CreateTrainingPlan(){
        if(user){
            if(selectedActivities && trainingPlanGoal && planIntensity && trainingsNumber && trainingTime && trainingLength !==""){
                const generatedPlan = (GenerateTrainingPlan(trainingPlanGoal,  selectedActivities.map((activity) => activity.value),planIntensity,trainingsNumber, trainingTime,trainingLength))
                let isMatched = CheckIsGoal(selectedActivities.map((activity) => activity.label), trainingPlanGoal)
                console.log(isMatched)
                setIsActivityMatched(isMatched)
                let newTrainingPlanData = {
                    trainingPlanGoal:trainingPlanGoal,
                    selectedActivities:selectedActivities.map((activity) => activity.value),
                    planIntensity:planIntensity,
                    trainingsNumber:trainingsNumber,
                    trainingTime:trainingTime,
                    trainingLength:trainingLength,
                    trainingDescription:trainingDescription,
                    userID:auth.currentUser.uid
                }
                // let TrainingPlanList={
                //     userID:auth.currentUser.uid,
                //     trainingPlanList:generatedPlan,
                //     date: new Date(),                }

                
                try{
                    if(trainingPlanData.length!==0){
                        const docRef = doc(db, "TrainingPlanData", trainingPlanData[0].id );
                        await updateDoc(docRef, newTrainingPlanData)

                    }
                    else{
                        const docRef = await addDoc(collection(db, "TrainingPlanData"), newTrainingPlanData )

                        
                    }

                    for(let i = 0;i<trainingPlan.length;i++){
                        const docRef1 = doc(db, "TrainingPlanList", trainingPlan[i].id)
                        await deleteDoc(docRef1)
                    }

                    for(let i =0; i<generatedPlan.length;i++){
                        let trainingPlanDay = {...generatedPlan[i],
                                                    userID:auth.currentUser.uid,}
                        try{
                            const docRef = addDoc(collection(db, "TrainingPlanList"), trainingPlanDay)
                        }
                        catch(error){
                        }

                        
                        

                            
                    }



                    // if(trainingPlan.length!==0){
                    //     const docRef2 = doc(db, "TrainingPlanList", trainingPlan[0].id);
                    //     await updateDoc(docRef2, TrainingPlanList)

                    // }
                    // else{
                    //     const docRef2 = await addDoc(collection(db,"TrainingPlanList"), TrainingPlanList )
                        
                    // }


                }
                catch(error){
                    window.alert("Nie udało się wygenerować planu treningowego")
                }




        }
            else{
                window.alert("Uzupełnij wszystkie dane ")
        }

        }
        else{
            window.alert("Musisz być zalogowany żeby dodać plan")

        }
        FetchTrainingPlanList();



    }
useEffect(()=>{
    console.log(trainingPlan)
    console.log(trainingPlanData)
}, [trainingPlan, trainingPlanData])

    
    return(
        <>
        <div className='AddPlanContainer'>
            <h1 className='Heading'>Zbuduj swój własny
                 plan :)</h1>
                 <div className='SwitchContainer'>
                    <button style={{backgroundColor:planCreatingWay==="Wpisz"?"hsl(28, 100%, 60%":"white"}} onClick={()=>setPlanCreatingWay("Wpisz")}>Wpisz samodzielnie</button>

                    <button style={{backgroundColor:planCreatingWay==="Wygeneruj"?"hsl(28, 100%, 60%":"white"}} onClick={()=>setPlanCreatingWay("Wygeneruj")}>Wygeneruj automatycznie</button>
                 </div>
            <div className='GoalContainer'>
                <p>Wybierz główny cel: </p>

            <select value={trainingPlanGoal} onChange={event=>setTrainingPlanGoal(event.target.value)} className='planInput'  name="" id="">
                {goalOptions.map((element,index)=>(
                    <option key={index} value={element}>{element}</option>
                ))}
            </select>

            </div>

            <Select value={selectedActivities} styles={{ control: (base) => ({ ...base, borderRadius: '20px', border: '3px solid hsl(28, 100%, 60%)', width: '400px', boxShadow: 'none' }), placeholder: (base) => ({ ...base, color: '#999' }), multiValue: (base) => ({ ...base, borderRadius: '10px', backgroundColor: 'hsl(28, 100%, 90%)' }) }}
            onChange={setSelectedActivites} classNamePrefix='rs' isMulti options={trainingOptionsArray} type="text" placeholder='Wybierz preferowane aktywności'/>
            <div className='GoalContainer'>
                <p>Wybierz intensywność:</p>
            <select value={planIntensity} onChange={event=>setPlanIntensity(event.target.value)} className='planInput' name="" id="">
                {intensityOptions.map((element, index)=>(
                    <option key={index} value={element}>{element}</option>
                ))}

            </select>
            </div>

            <input value={trainingsNumber} onChange={event=>setTrainingsNumber(parseInt(event.target.value))} className='planInput' type="number" placeholder='Liczba treningów w tygodniu' />
            <div className='GoalContainer'>
                <p>Wybierz preferowaną porę dnia:</p>
            <select value={trainingTime} onChange={event=>setTrainingTime(event.target.value)} style={{width:'45%'}} className='planInput' name="" id="">\
                {timeOfDayOptions.map((element, index)=>(
                    <option key={index} value={element}>{element}</option>
                ))}

            </select>
            </div>
            <input value={trainingLength}  onChange={event=>setTrainingLength(parseInt(event.target.value))} className='planInput' type="number" placeholder='Wybierz długość treningu (min)' />
            <textarea value={trainingDescription} onChange={event=>setTrainingDescription(event.target.value)} className='planInput' placeholder='Dodatkowe notatki' name="" id=""></textarea>
            <button onClick={CreateTrainingPlan} className='createPlanButton'>{trainingPlan.length!==0?"Wygeneruj ponownie":"Wygeneruj plan"}</button>
        </div>
        </>
    )
}
export default GeneratePlanContainer