import { useEffect, useState } from 'react'
import './TrainingsList.css'
import { deleteDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { addDoc, collection,doc } from 'firebase/firestore';
import FilterTrainingsContainer from './FilterTrainingsContainer';


function TrainingsList({trainingOptions,displayedTrainingsList,setDisplayedTrainingList,trainingsList,setTrainingsList,setSelectedTraining}){

    const [elementToExpand, setElementToExpand] = useState(null)



    async function DeleteTraining(trainingID) {
        const wantToDelete = window.confirm("Czy na pewno chcesz usunąć ten trening z listy?")
        if(wantToDelete){
            try{
                const trainingDocRef = doc(db,"Trainings", trainingID)
                await deleteDoc(trainingDocRef) 
                setDisplayedTrainingList(displayedTrainingsList.filter(element=>element.id!==trainingID))
                


            }
            catch(error){
                window.alert("Nie udało się usunąć treningu z listy")
                console.log(error)
            }


        }


       

        
    }
    return(
        <>
        <div className='YourTrainingsContainer'>
        <h1 className='Heading'>TWOJE TRENINGI</h1>

        <FilterTrainingsContainer  trainingsList={trainingsList} trainingOptions={trainingOptions} displayedTrainingsList={displayedTrainingsList} setDisplayedTrainingList={setDisplayedTrainingList}/>
        <div className='AllSingleTrainigsContainer'>
            {displayedTrainingsList.length!==0?
            displayedTrainingsList.map((element,index)=>(
                <div style={{height:elementToExpand===element?"auto":"20%"}}className='SingleTrainigContainer' key={index}>
                    <h3>{element.trainingType}</h3>
                    {elementToExpand ===element&&
                    (element.trainingDescription.length!==0?
                        <p  className='TrainingDescription'>{element.trainingDescription}</p>
                        :
                        <p className='TrainingDescription'>Nie ma żadnych dodatkowych informacji</p>


                    )
                    }
                    <div className='HorizontalContainer'>
                        <h4>{element.trainingGoalValue} {element.trainingUnit}</h4>
                        <h4>{element.trainingDate}</h4>
                        <h4>{element.trainingHour}</h4>
                        <div className='buttonContainer'>
                            <button onClick={()=>elementToExpand ===element?setElementToExpand(null):setElementToExpand(element)}>{elementToExpand ===element?"Zwiń":"Rozwiń"}</button>
                            <button onClick={()=>setSelectedTraining(element)}>Edytuj</button>
                            <button onClick={()=>DeleteTraining(element.id)}>Usuń</button>

                        </div>

                    </div>

                </div>

            )):
            <h3>Nie masz zaplanowanych żadnych treningów.
                <br />
                 Może czas to zmienić?</h3>}

        </div>

            

        </div>
        <div>
            
        </div>
        

        </>
    )
}
export default TrainingsList