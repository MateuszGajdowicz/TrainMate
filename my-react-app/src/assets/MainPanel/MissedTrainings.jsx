import { useEffect, useState } from 'react'
import './TodayTrainings.css'
function MissedTrainings({missedTrainings,setIsFailedDisplayed, trainingsList, setSelectedTraining,setIsConfirmDisplayed}){

    return(

        <div style={{left:"65%", height:"33%"}} className='TodayTrainingsContainer'> 
        <h2>Zaległe treningi {missedTrainings.length===0?'':`- ${missedTrainings.length}`}</h2>
        <div className='AllTrainingsContainer'>
            { missedTrainings.length!==0?
            missedTrainings.map(element=>(
            <div style={{background:'linear-gradient(135deg, hsl(26, 100%, 92%) 5%, hsl(12, 100%, 50%) 110%)'}} className='SingleTrainingContainer'>
                <div className='InfoContainer'>

                <h4>{element.trainingType}</h4>
                <div className='detailsContainer'>
                    <p>{element.trainingGoalValue} {element.trainingUnit}</p>
                    <p>{element.trainingDate}</p>


                </div>


                </div>

                <div className='buttonContainer'>
                        <button onClick={()=>{setSelectedTraining(element), setIsConfirmDisplayed(true)}} title='Zrobione' className='YesButton'>&#x2714;</button>
                        <button onClick={()=>{setIsFailedDisplayed(true), setSelectedTraining(element)}} title='Nie tym razem :(' className='NoButton'>&#x2716;</button>

                </div>

            </div>
        ))
        :
        <p className='warning'>Nie masz żadnych zaległych treningów! Oby tak dalej!</p>
            }


        </div>


        </div>
    )
}
export default MissedTrainings