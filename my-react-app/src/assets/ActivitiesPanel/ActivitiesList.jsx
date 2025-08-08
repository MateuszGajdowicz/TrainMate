import { useState,useEffect } from 'react';
import { deleteDoc,updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { addDoc, collection,doc } from 'firebase/firestore';
import '../TrainigsPanel/TrainingsList.css'
import FilterActivitiesContainer from './FilterActivitiesContainer';

function ActivitiesList({fetchActivitiesList,trainingOptions,activitesList,setActivitesList,displayedActivitiesList,setDisplayedActivitiesList}) {

    const [elementToExpand,setElementToExpand] = useState(null)

    const [favouriteActivitiesList, setFavouritesActivitiesList] = useState([])

    useEffect(()=>{
        if(activitesList && displayedActivitiesList){
            setFavouritesActivitiesList(activitesList.filter(element=>element.isFavourite===true))
        }
    },[activitesList,displayedActivitiesList])




        async function DeleteActivity(activityID) {
        const wantToDelete = window.confirm("Czy na pewno chcesz usunąć ten trening z listy?")
        if(wantToDelete){
            try{
                const activityDocRef = doc(db,"Activities", activityID)
                await deleteDoc(activityDocRef) 
                setDisplayedActivitiesList(displayedActivitiesList.filter(element=>element.id!==activityID))
                fetchActivitiesList();
                


            }
            catch(error){
                window.alert("Nie udało się usunąć treningu z listy")
                console.log(error)
            }


        }


        
    }
async function handleFavourite(element){
    try{
        const docRef = doc(db, "Activities", element.id);
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
        fetchActivitiesList();

    }
    catch(error){
        window.alert("Nie udało się dodać do ulubionych")
        console.log(error)
    }


}


  return (
    <>
      <div className="YourTrainingsContainer">
        <div className="HeadingContainer">
          <h1 className="Heading">WYKONANE TRENINGI</h1>

        </div>

<FilterActivitiesContainer favouriteActivitiesList={favouriteActivitiesList} trainingOptions={trainingOptions}  displayedActivitiesList={displayedActivitiesList} setDisplayedActivitiesList={setDisplayedActivitiesList} activitesList={activitesList}/>

<div className='AllSingleTrainigsContainer'>
            {displayedActivitiesList.length!==0?
            displayedActivitiesList.map((element,index)=>(
            <div  className='SingleTrainigContainer' key={index}>
            <h1 className='ToggleFavourite'style={{color:element.isFavourite?"hsl(26, 100%, 50%)":"black"}} onClick={()=>handleFavourite(element)}>❤︎</h1>


                    <h3>{element.activityType}</h3>
                        {elementToExpand === element && (
                            <>
                                <p>Zdobyte punkty: <strong>{element.points}</strong></p>
                                <p>Szacunkowe spalone kalorie: <strong>{element.estimatedCalories}</strong></p>
                                <p>Ocena treningu : {element.acitivityRating}/5</p>
                                {element.activityDescription && element.activityDescription.length !== 0 ? (
                                    <p className='TrainingDescription'>{element.activityDescription}</p>
                                ) : (
                                    <p className='TrainingDescription'>Nie ma żadnych dodatkowych informacji</p>
                                )}
                            </>
                        )}

                    <div className='HorizontalContainer'>
                        <h4>{element.activityGoalValue} {element.activityUnit}</h4>
                        <h4>{element.activityDate}</h4>
                        <h4>{element.activityHour}</h4>
                        <div className='buttonContainer' style={{width:"25%"}}>
                            <button onClick={()=>elementToExpand?setElementToExpand(null):setElementToExpand(element)} >{elementToExpand===element?"Zwiń":"Rozwiń"}</button>
                            <button onClick={()=>DeleteActivity(element.id)} >Usuń</button>

                        </div>

                    </div>

                </div>

            )):
            <h3>Nie masz zaplanowanych żadnych treningów.
                <br />
                 Może czas to zmienić?</h3>}

        </div>
      </div>
    </>
  );
}

export default ActivitiesList;