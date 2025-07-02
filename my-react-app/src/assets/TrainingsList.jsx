import { useState } from 'react'
import './TrainingsList.css'
import { deleteDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { addDoc, collection,doc } from 'firebase/firestore';


function TrainingsList({trainingsList,setTrainingsList, setSelectedTraining}){


    async function DeleteTraining(trainingID) {
        const wantToDelete = window.confirm("Czy na pewno chcesz usunąć ten trening z listy?")
        if(wantToDelete){
            try{
                const trainingDocRef = doc(db,"Trainings", trainingID)
                await deleteDoc(trainingDocRef) 
                setTrainingsList(prev=>prev.filter(element=>element.id!==trainingID))


            }
            catch(error){
                window.alert("Nie udało się usunąć treningu z listy")
                console.log(error)
            }


        }


       

        
    }
    return(
        <>
        <h1>TWOJE TRENINGI</h1>
        <div className='YourTrainingsContainer'>
            {trainingsList.length!==0?
            trainingsList.map((element,index)=>(
                <div className='SingleTrainigContainer' key={index}>
                    <h3>{element.trainingType}</h3>
                    <div className='HorizontalContainer'>
                        <h4>{element.trainingGoalValue} {element.trainingUnit}</h4>
                        <h4>{element.trainingDate}</h4>
                        <h4>{element.trainingHour}</h4>
                        <button onClick={()=>setSelectedTraining(element)}>Edytuj</button>
                        <button onClick={()=>DeleteTraining(element.id)}>Usuń</button>
                        <button >Przełóż</button>
                    </div>

                </div>

            )):
            <h3>Nie masz zaplanowanych żadnych treningów.
                <br />
                 Może czas to zmienić?</h3>}
            

        </div>
        <div>
            
        </div>
        

        </>
    )
}
export default TrainingsList