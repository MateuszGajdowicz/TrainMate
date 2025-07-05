import { useState,useEffect,useRef, use } from 'react'

import AddNewTraining from "./AddNewTraining"
import TrainingsList from "./TrainingsList"  

function YourTrainingsPanel({displayedTrainingsList,setDisplayedTrainingList,trainingsList,setTrainingsList,fetchTrainingsList,user,trainingOptions}){
    const [selectedTraining, setSelectedTraining] = useState(null)


    return(
        <>
        <TrainingsList trainingOptions={trainingOptions} displayedTrainingsList={displayedTrainingsList} setDisplayedTrainingList={setDisplayedTrainingList} setSelectedTraining={setSelectedTraining}  setTrainingsList={setTrainingsList} trainingsList = {trainingsList}/>
        <AddNewTraining trainingsList={trainingsList} selectedTraining={selectedTraining} setSelectedTraining={setSelectedTraining}   fetchTrainingsList={fetchTrainingsList} user={user} trainingOptions={trainingOptions}/>
        </>
    )

}
export default YourTrainingsPanel