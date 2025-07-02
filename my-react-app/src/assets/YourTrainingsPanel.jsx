import { useState,useEffect } from 'react'

import AddNewTraining from "./AddNewTraining"
import TrainingsList from "./TrainingsList"  

function YourTrainingsPanel({trainingsList,setTrainingsList,fetchTrainingsList,user,trainingOptions}){
    const [selectedTraining, setSelectedTraining] = useState(null)
    return(
        <>
        <TrainingsList setSelectedTraining={setSelectedTraining} setTrainingsList={setTrainingsList} trainingsList = {trainingsList}/>
        <AddNewTraining selectedTraining={selectedTraining} fetchTrainingsList={fetchTrainingsList} user={user} trainingOptions={trainingOptions}/>
        </>
    )

}
export default YourTrainingsPanel