import { useEffect, useState } from 'react'
import './TodayTrainings.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function TodayTrainings({todayTrainings,setIsFailedDisplayed, trainingsList, setSelectedTraining,setIsConfirmDisplayed}){

    return(

        <div  className='TodayTrainingsContainer'> 
        <h2>Dzisiejsze treningi</h2>
        <div className='AllTrainingsContainer'>
            { todayTrainings.length!==0?
            todayTrainings.map(element=>(
            <div className='SingleTrainingContainer'>
                <div className='InfoContainer'>

                <h4>{element.trainingType}</h4>
                <div className='detailsContainer'>
                    <p>{element.trainingGoalValue} {element.trainingUnit}</p>
                    <p>{element.trainingHour}</p>
                    <p>{element.points} pkt</p>


                </div>


                </div>

                <div className='buttonContainer'>
                        <button onClick={()=>{setSelectedTraining(element), setIsConfirmDisplayed(true)}} title='Zrobione' className='YesButton'>&#x2714;</button>
                        <button onClick={()=>{setIsFailedDisplayed(true), setSelectedTraining(element)}} title='Nie tym razem :(' className='NoButton'>&#x2716;</button>

                </div>

            </div>
        ))
        :
        <>
            <h3 className='warning'>Nie masz zaplanownych dzisiaj żadnych treningów</h3>
            <p className='warning'>Może pora to zmienić?</p>
            <Link to='/trainingsPanel'> <button className='noDisplayButton'>Dodaj trening</button></Link>

        </>
            }


        </div>


        </div>
    )
}
export default TodayTrainings