import './TrophiesContainer.css'
import { TrophiesList } from './TrophiesList'
function TrophiesContainer(){
    return(
        <>
        <div className='trophiesContainer'>
            <h1>Twoje osiągnięcia!</h1>
            <div className='AllTrophiesContainer'> 

            {TrophiesList.filter(element=>!element.isFinished).map((element, index)=>(
                <div    title={`${element.description}. Postęp: ${element.progress}`}
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