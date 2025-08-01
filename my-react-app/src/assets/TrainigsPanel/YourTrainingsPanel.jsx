import { useState,useEffect,useRef, use } from 'react'

import AddNewTraining from "./AddNewTraining"
import TrainingsList from "./TrainingsList"  

function YourTrainingsPanel({favourites,setFavourites,displayedTrainingsList,setDisplayedTrainingList,trainingsList,setTrainingsList,fetchTrainingsList,user,trainingOptions}){
    const [selectedTraining, setSelectedTraining] = useState(null)


    return(
        <>
        <TrainingsList fetchTrainingsList={fetchTrainingsList} favourites={favourites} setFavourites={setFavourites} trainingOptions={trainingOptions} displayedTrainingsList={displayedTrainingsList} setDisplayedTrainingList={setDisplayedTrainingList} setSelectedTraining={setSelectedTraining}  setTrainingsList={setTrainingsList} trainingsList = {trainingsList}/>
        <AddNewTraining  setTrainingsList={setTrainingsList} trainingsList={trainingsList} selectedTraining={selectedTraining} setSelectedTraining={setSelectedTraining}   fetchTrainingsList={fetchTrainingsList} user={user} trainingOptions={trainingOptions}/>
        </>
    )

}
export default YourTrainingsPanel