import { useEffect, useState } from 'react'
import './TrainingsList.css'
import { deleteDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { addDoc, collection,doc } from 'firebase/firestore';
import FilterTrainingsContainer from './FilterTrainingsContainer';


function TrainingsList({fetchTrainingsList,trainingOptions,displayedTrainingsList,setDisplayedTrainingList,trainingsList,setTrainingsList,setSelectedTraining}){

    const [elementToExpand, setElementToExpand] = useState(null)
    const [periodOFTrainings,setperiodOFTrainings] = useState('Nadchodzące treningi')

    const [favouritesTrainigsList, setFavouritesTrainingsList] = useState([])

    useEffect(()=>{
        if(trainingsList && displayedTrainingsList){
            setFavouritesTrainingsList(displayedTrainingsList.filter(element=>element.isFavourite===true))
        }
    },[trainingsList,displayedTrainingsList])




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

function toDateOnly(date) {
    return new Date(date).toLocaleDateString('sv-SE'); // => "2025-07-13"
}

function SeparateTrainings(){
    const today = toDateOnly(new Date());

  if (periodOFTrainings === "Nadchodzące treningi") {
    setDisplayedTrainingList(
      trainingsList.filter(element => toDateOnly(element.trainingDate) >= today)
    );
  } else if (periodOFTrainings === "Zaległe treningi") {
    setDisplayedTrainingList(
      trainingsList.filter(element => toDateOnly(element.trainingDate) < today)
    );
  } else {
    setDisplayedTrainingList(trainingsList);
  }
  console.log(today)
  console.log(new Date())

}
useEffect(() => {
    SeparateTrainings()

}, [trainingsList, periodOFTrainings]);

async function handleFavourite(element){
    try{
        const docRef = doc(db, "Trainings", element.id);
        if(element.isFavourite===false){
            await updateDoc(docRef, {
            isFavourite:true,

        })

        }
        else{
            await updateDoc(docRef,{
                isFavourite:false
            })
        }

        fetchTrainingsList();
    }
    catch(error){
        window.alert("Nie udało się dodać do ulubionych")
    }


}




    return(
        <>
        <div className='YourTrainingsContainer'>
            <div className='HeadingContainer'> 
                <h1 className='Heading'>TWOJE TRENINGI</h1>
                <select className='PeriodSelect'value={periodOFTrainings} name="" id="" onChange={(event)=>setperiodOFTrainings(event.target.value)} >
                <option  value="Nadchodzące treningi">Nadchodzące treningi</option>
                <option value="Zaległe treningi">Zaległe treningi</option>
            </select>

            </div>


        <FilterTrainingsContainer favouritesTrainigsList={favouritesTrainigsList} periodOFTrainings={periodOFTrainings} SeparateTrainings={SeparateTrainings} trainingsList={trainingsList} trainingOptions={trainingOptions} displayedTrainingsList={displayedTrainingsList} setDisplayedTrainingList={setDisplayedTrainingList}/>
        <div className='AllSingleTrainigsContainer'>
            {displayedTrainingsList.length!==0?
            displayedTrainingsList.map((element,index)=>(
            
            <div style={{height: elementToExpand === element ? "auto" : "20%", background: periodOFTrainings === 'Zaległe treningi' ? 'linear-gradient(135deg, hsl(26, 100%, 92%) 5%, hsl(12, 100%, 50%) 110%)' : (new Date(element.trainingDate).getDate() === new Date().getDate()) && (new Date(element.trainingDate).getMonth() === new Date().getMonth()) && (new Date(element.trainingDate).getFullYear() === new Date().getFullYear()) ? 'linear-gradient(135deg, hsl(26, 100%, 92%) 5%, hsl(200, 80%, 80%) 110%)' : 'linear-gradient(135deg, hsl(26, 100%, 92%) 5%, hsl(28, 100%, 60%) 170%)'}} className='SingleTrainigContainer' key={index}>
                <h1 className='ToggleFavourite'style={{color:element.isFavourite?"hsl(26, 100%, 50%)":"black"}} onClick={()=>handleFavourite(element)}>❤︎</h1>
                    <h3>{element.trainingType}</h3>
                        {elementToExpand === element && (
                            <>
                                <p>Szacunkowe spalone kalorie: <strong>{element.estimatedCalories}</strong></p>
                                {element.trainingDescription && element.trainingDescription.length !== 0 ? (
                                    <p className='TrainingDescription'>{element.trainingDescription}</p>
                                ) : (
                                    <p className='TrainingDescription'>Nie ma żadnych dodatkowych informacji</p>
                                )}
                            </>
                        )}

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