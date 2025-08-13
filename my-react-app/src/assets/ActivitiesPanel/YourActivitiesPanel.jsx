import { useState,useEffect,useRef, use } from 'react'

import AddNewActivity from "./AddNewActivity"
import ActivitiesList from "./ActivitiesList"  

function YourActivitiesPanel({userInfo,allChallengesList,trainingOptions,user,setActivitesList,activitesList,displayedActivitiesList,setDisplayedActivitiesList,fetchActivitiesList}){

    useEffect(()=>{
        fetchActivitiesList();
    },[])
    return(
        <>
        <ActivitiesList fetchActivitiesList={fetchActivitiesList} trainingOptions={trainingOptions} activitesList={activitesList} setActivitesList={setActivitesList} displayedActivitiesList={displayedActivitiesList} setDisplayedActivitiesList={setDisplayedActivitiesList}  />
        <AddNewActivity userInfo={userInfo} activitesList={activitesList} allChallengesList={allChallengesList} user={user} trainingOptions={trainingOptions}  fetchActivitiesList={fetchActivitiesList}/>
        </>
    )

}
export default YourActivitiesPanel