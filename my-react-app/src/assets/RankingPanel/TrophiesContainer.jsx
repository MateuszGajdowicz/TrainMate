import './TrophiesContainer.css'
import  {TrophiesList}  from './TrophiesList'
import { TrackTrophies } from './TrackTrophies'
import { useEffect, useState } from 'react'
function TrophiesContainer({activitesList}){

    const [incompleteTrophiesList, setIncompleteTrophiesList] = useState(TrophiesList.filter(element=>!element.isFinished))
    const [completeTrophiesList, setCompleteTrophiesList]  = useState(TrophiesList.filter(element=>element.isFinished))

    useEffect(()=>{
        let temporaryTrophiesList = [...TrophiesList]

        let trophiesTrackingResult = TrackTrophies(incompleteTrophiesList,activitesList)
        console.log(trophiesTrackingResult)
        setIncompleteTrophiesList(trophiesTrackingResult.filter(element=>!element.isFinished))
        console.log(incompleteTrophiesList)
        setCompleteTrophiesList(trophiesTrackingResult.filter(element=>element.isFinished))


        }
            
    , [activitesList])

    useEffect(()=>{
        console.log(incompleteTrophiesList)
    },[incompleteTrophiesList])
    return(
        <>
        <div className='trophiesContainer'>
            <h1>Twoje osiągnięcia!</h1>
            <div style={{gridTemplateColumns:completeTrophiesList.length===0?'repeat(1, 1fr)':'repeat(3, 1fr)'}} className='CompleteTrophiesContainer'> 
        {completeTrophiesList.length===0?
            <h3>Nie poddawaj się a wkrótce zdobędziesz nowe osiągnięcia!</h3> :
        completeTrophiesList.map((element, index)=>(
                <div  key={index}    title={`${element.description}. Postęp: ${element.goalValue}/${element.goalValue}`}
        className='singleTrophyContainer'>

                    <div  className='trophyIcon'  style={{backgroundImage:`url(${element.icon})`}} ></div>
                                        <p>{element.title}</p>

                </div>


            ))}

            </div>
            <h1>Osiągnięcia w drodze</h1>
            <div className='CompleteTrophiesContainer'>
                    {incompleteTrophiesList.map((element, index)=>(
                <div key={index}    title={`${element.description}. Postęp: ${element.progress}/${element.goalValue}`}
        className='singleTrophyContainer'>

                    <div  className='trophyIcon'  style={{backgroundImage:`url(${element.icon})`}} ></div>
                    <p>{element.title}</p>

                    <progress value={element.progress/element.goalValue}></progress>
                </div>


            ))} 
            </div>


            

        </div>
        </>
    )
}
export default TrophiesContainer