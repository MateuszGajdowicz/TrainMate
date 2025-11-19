import { useState,useEffect,useRef, use } from 'react'
import './YourTrainingsPanel.css'

import AddNewTraining from "./AddNewTraining"
import TrainingsList from "./TrainingsList"  

function YourTrainingsPanel({setTodayTrainings,favourites,setFavourites,displayedTrainingsList,setDisplayedTrainingList,trainingsList,setTrainingsList,fetchTrainingsList,user,trainingOptions}){
    const [selectedTraining, setSelectedTraining] = useState(null)

    useEffect(()=>{
        fetchTrainingsList()
    },[]
    )
  const bottomRef = useRef(null);

    return(
        <>
        <div className='twoContainer'>
                    <TrainingsList   setTodayTrainings={setTodayTrainings} fetchTrainingsList={fetchTrainingsList} favourites={favourites} setFavourites={setFavourites} trainingOptions={trainingOptions} displayedTrainingsList={displayedTrainingsList} setDisplayedTrainingList={setDisplayedTrainingList} setSelectedTraining={setSelectedTraining}  setTrainingsList={setTrainingsList} trainingsList = {trainingsList}/>
                    
            <AddNewTraining  setTrainingsList={setTrainingsList} trainingsList={trainingsList} selectedTraining={selectedTraining} setSelectedTraining={setSelectedTraining}   fetchTrainingsList={fetchTrainingsList} user={user} trainingOptions={trainingOptions}/>

                    
        </div>

        </>
    )

}
export default YourTrainingsPanel