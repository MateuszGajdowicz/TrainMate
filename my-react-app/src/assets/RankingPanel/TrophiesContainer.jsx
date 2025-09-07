import './TrophiesContainer.css'
import  {TrophiesList}  from './TrophiesList'
import { TrackTrophies } from './TrackTrophies'
import { useEffect, useState } from 'react'
function TrophiesContainer({activitesList}){

    const [incompleteTrophiesList, setIncompleteTrophiesList] = useState(TrophiesList.filter(element=>!element.isFinished))

    useEffect(()=>{

        let trophiesTrackingResult = TrackTrophies(incompleteTrophiesList,activitesList)
        console.log(trophiesTrackingResult)
        setIncompleteTrophiesList(trophiesTrackingResult.filter(element=>!element.isFinished))


        }
            
    , [activitesList])
    return(
        <>
        <div className='trophiesContainer'>
            <h1>Twoje osiągnięcia!</h1>
            <div className='AllTrophiesContainer'> 

            {incompleteTrophiesList.map((element, index)=>(
                <div    title={`${element.description}. Postęp: ${element.progress}/${element.goalValue}`}
className='singleTrophyContainer'>
                    <p>{element.title}</p>

                    <div  className='trophyIcon'  style={{backgroundImage:`url(${element.icon})`}} ></div>
                    <progress value={element.progress/element.goalValue}></progress>
                </div>


            ))}

            </div>

        </div>
        </>
    )
}
export default TrophiesContainer