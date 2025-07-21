import './DisplayPlanContainer.css'
import '../TrainigsPanel/TrainingsList.css'
import { addDoc,query, collection, where,getDocs, deleteDoc } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useState } from 'react'
function DisplayPlanContainer({FetchTrainingPlanList,setSelectedTrainingIndex,setSelectedTraining,trainingPlan}){

    const [elementToExpand, setElementToExpand] = useState(null)


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

        </div>


        <div className='AllSingleTrainigsContainer'> 
            {
                trainingPlan.length===0?
                <h2>Wygląda na to, że nie masz jeszcze planu. Uzupełnij dane obok aby go stworzyć!!</h2>:
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
                    <>
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


