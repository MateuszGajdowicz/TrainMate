import { useEffect, useState } from 'react'
import './TodayTrainings.css'
function TodayTrainings({trainingsList}){
    const [todayTrainings, setTodayTrainings] = useState([])

    useEffect(()=>{
        let today = new Date();
        let todayTrainings = trainingsList.filter(element=>new Date(element.trainingDate).toDateString()===today.toDateString())
        setTodayTrainings(todayTrainings)
        console.log(todayTrainings)
    }, [trainingsList])
    return(

        <div className='TodayTrainingsContainer'> 
        <h2>Dzisiejsze treningi</h2>
        <div className='AllTrainingsContainer'>
                {todayTrainings.map(element=>(
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
                        <button  className='YesButton'>+</button>
                        <button className='NoButton'>-</button>

                </div>

            </div>
        ))}

        </div>


        </div>
    )
}
export default TodayTrainings