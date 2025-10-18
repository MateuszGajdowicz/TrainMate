import './DisplayPlanContainer.css'
import '../TrainigsPanel/TrainingsList.css'
import { addDoc,query, collection, where,getDocs, deleteDoc } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useState , useRef, useEffect, use} from 'react'
import React from 'react';
import generatePDF from './generatePDFplan';
import download from '../../download.png'

function DisplayPlanContainer({isLoaderDisplayed,trainingsList,fetchTrainingsList,FetchTrainingPlanList,setSelectedTrainingIndex,setSelectedTraining,trainingPlan}){


    const [elementToExpand, setElementToExpand] = useState(null)

    const [planRepeatValue, setPlanRepeatValue] = useState(null)

    const [totalCalories, setTotalCalories] = useState(null)
    const [planLength, setPlanLength] = useState(null)
    const [trainingPlanPoints, setTrainingPlanPoints] = useState(0)
    const [added, setAdded] = useState(()=>{
        return 
    })

    function CalculatePlanInfo(planAray){
        const summedCalories = planAray.reduce((prev, next)=>prev+next.estimatedCalories, 0)
        setTotalCalories(summedCalories)
        setPlanLength(planAray.length)
        let points = planAray.reduce((prev, next)=>prev+next.points, 0)
        setTrainingPlanPoints(points)
        localStorage.setItem("isAdded", "false")

    }
useEffect(()=>{
    CalculatePlanInfo(trainingPlan)   

}, [trainingPlan])


    async function MovePlanToTrainings(array){
        const added = localStorage.getItem("isAdded")==="true"

        if(!added){
        let trainingsFromPlan = trainingsList.filter(element=>element.isFromTrainingPlan)
        for(let i=0;i<trainingsFromPlan.length;i++){
            try{
                const docRefDelete = doc(db,"Trainings", trainingsFromPlan[i].id )
                await deleteDoc(docRefDelete)
            }
            catch(error){
                console.log(error)
                window.alert("Coś poszło nie tak")
            }

        }
        if(planRepeatValue!==null && planRepeatValue>=1){
            for(let i=0;i<planRepeatValue;i++){
                for(let j=0; j<array.length;j++){
                    
                    let today = new Date();
                    let jsDay = today.getDay();
                    let todayDay = jsDay === 0 ? 6 : jsDay - 1;

                    let dayOfTheWeek = array[j].dayOfTheWeek;

                    const diff = (dayOfTheWeek-todayDay +7)%7
                    
                    const resultDate = new Date(today)
                    resultDate.setDate((today.getDate()+diff)+7*i)
                    const year = resultDate.getFullYear()
                    const month = String(resultDate.getMonth() + 1).padStart(2, '0')
                    const day = String(resultDate.getDate()).padStart(2, '0')

                    const inputReadyDate = `${year}-${month}-${day}`

                    let convertedTrainingPlanElement = {
                        isFromTrainingPlan:true,
                        addingDate: new Date(),
                        estimatedCalories: array[j].estimatedCalories,
                        isFavourite:false,
                        trainingDate: inputReadyDate,
                        trainingDescription:array[j].trainingDescription,
                        trainingGoal: array[j].trainingGoal,
                        trainingGoalValue: array[j].trainingGoalValue,
                        trainingHour:array[j].timeOfDay,
                        trainingType:array[j].activity,
                        trainingUnit:array[j].trainingUnit,
                        points: array[j].points,
                        userID:array[j].userID,
                    }
                    try{
                        const docRef = await addDoc(collection(db, "Trainings"), convertedTrainingPlanElement)


                    }
                    catch(error){
                        console.log(error)
                    }

                }


            }
            fetchTrainingsList();
            localStorage.setItem("isAdded", "true")
            

        }
        else{
            window.alert("Wprowadź poprawną liczbę tygodni treningowych ")
        }

    }
    else{
    window.alert("Ten trening został już dodany :)")
}
}


// function handleMovePlanToTrainings(){
//     const added = localStorage.getItem("isAdded")==="true"
//     if(!added){
//         MovePlanToTrainings(trainingPlan)
//     }

//     else{
//         let confirm = window.confirm("Ten plan jest już dodany do treningów, czy chcesz go dodać jeszcze raz? ")
//         if(confirm){
//             MovePlanToTrainings(trainingPlan)
//         }
//     }
// }


    async function DeleteTraining(element){
        try{
            const docRef = doc(db, "TrainingPlanList", element.id)
            await deleteDoc(docRef)
            FetchTrainingPlanList();

            
        }
        catch(error){
            window.alert("Nie udało się usunąć treningu")
        }


    }
    return(<>
    
    <div style={{left:'50%'}} className="YourTrainingsContainer" id="DisplayPlanContainer">
        <div className='headingContainer'>
            <h1>Twój nowy plan</h1>
            <input min="1" onChange={event=>setPlanRepeatValue(Number(event.target.value))} type="number" placeholder='Na ile tygodni?' className='planInput' />
            <button onClick={()=>MovePlanToTrainings(trainingPlan)}>Dodaj do treningów</button>
            <button onClick={()=>generatePDF(trainingPlan)} className='downloadButton'></button>


        </div>
            <div className='InfoContainer'>
                {
                    trainingPlan.length===0?
                    <p></p>
                    :
                <p>Z twoim planem w tydzień spalisz <strong>{totalCalories}</strong> kcal i zdobędziesz <strong>{trainingPlanPoints}</strong> pkt</p>

                }

            </div>


        <div   className='AllSingleTrainigsContainer'> 

            {
                isLoaderDisplayed?
                (<h3>Czekaj, twój plan właśnie się generuje...</h3>  ):

                trainingPlan.length===0?
                <h2 style={{marginLeft:"25px"}}>Wygląda na to, że nie masz jeszcze planu. Uzupełnij dane obok aby go stworzyć!!</h2>:
            trainingPlan.sort((a,b)=>a.dayOfTheWeek-b.dayOfTheWeek).map((element, index)=>(
            <div key={index} style={{height:elementToExpand===element && "auto"}} className='SingleTrainigContainer'>
                <h3>{element.activity}</h3>
                    <div className='HorizontalContainer'>
                        <h4>{element.trainingGoalValue} {element.trainingUnit}</h4>
                        <h4>{element.timeOfDay}</h4>
                        <h4>{element.trainingDays}</h4>
                        <div className='buttonContainer'>
                            <button onClick={()=>{elementToExpand===element?setElementToExpand(null):setElementToExpand(element)}} >{elementToExpand===element?"Zwiń":"Rozwiń"}</button>
                            <button onClick={()=>{setSelectedTrainingIndex(index);setSelectedTraining(element)}}>Edytuj</button>
                            <button onClick={()=>DeleteTraining(element)} >Usuń</button>

                        </div>
 
                    </div>
                    {elementToExpand===element &&
                    <>  <p>Punkty do zdobycia: <strong>{element.points}</strong> </p>
                        <p>Szacunkowe spalone kalorie: <strong>{element.estimatedCalories}</strong>  kcal</p>
                        {
                            element.trainingDescription==='' || element.trainingDescription===null?
                            <p>Nie ma żadnych dodatkowych informacji</p>
                            :
                            <p>{element.trainingDescription}</p>


                        }

                    </>
                        

                    
                    }
            </div>

        ))}
        </div>
        
 

         </div>
    </>)
}
export default DisplayPlanContainer


