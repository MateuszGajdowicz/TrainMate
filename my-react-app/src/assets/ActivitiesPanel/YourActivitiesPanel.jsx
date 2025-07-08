import { useState,useEffect,useRef, use } from 'react'

import AddNewActivity from "./AddNewActivity"
import ActivitiesList from "./ActivitiesList"  

function YourActivitiesPanel({trainingOptions,user,setActivitesList,activitesList,displayedActivitiesList,setDisplayedActivitiesList,fetchActivitiesList}){


    return(
        <>
        <ActivitiesList activitesList={activitesList} setActivitesList={setActivitesList} displayedActivitiesList={displayedActivitiesList} setDisplayedActivitiesList={setDisplayedActivitiesList}  />
        <AddNewActivity user={user} trainingOptions={trainingOptions}  fetchActivitiesList={fetchActivitiesList}/>
        </>
    )

}
export default YourActivitiesPanel