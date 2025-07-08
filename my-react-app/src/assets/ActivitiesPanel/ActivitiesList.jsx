import { useState } from 'react';
import '../TrainigsPanel/TrainingsList.css'

function ActivitiesList({activitesList,setActivitesList,displayedActivitiesList,setDisplayedActivitiesList}) {

    const [elementToExpand,setElementToExpand] = useState(null)
  return (
    <>
      <div className="YourTrainingsContainer">
        <div className="HeadingContainer">
          <h1 className="Heading">WYKONANE TRENINGI</h1>
          <select className="PeriodSelect">
            <option value="Nadchodzące treningi">Nadchodzące treningi</option>
            <option value="Zaległe treningi">Zaległe treningi</option>
          </select>
        </div>

        <div className="FilterTrainingsContainer">
          {/* Tutaj można dodać statyczne filtry */}
        </div>

<div className='AllSingleTrainigsContainer'>
            {displayedActivitiesList.length!==0?
            displayedActivitiesList.map((element,index)=>(
            <div  className='SingleTrainigContainer' key={index}>
                    <h3>{element.activityType}</h3>
                        {elementToExpand === element && (
                            <>
                                <p>Szacunkowe spalone kalorie: <strong>{element.estimatedCalories}</strong></p>
                                {element.activityDescription && element.activityDescription.length !== 0 ? (
                                    <p className='TrainingDescription'>{element.activityDescription}</p>
                                ) : (
                                    <p className='TrainingDescription'>Nie ma żadnych dodatkowych informacji</p>
                                )}
                            </>
                        )}

                    <div className='HorizontalContainer'>
                        <h4>{element.activityGoalValue} {element.activityUnit}</h4>
                        <h4>{element.activityDate}</h4>
                        <h4>{element.activityHour}</h4>
                        <div className='buttonContainer'>
                            <button onClick={()=>elementToExpand?setElementToExpand(null):setElementToExpand(element)} >{elementToExpand?"Zwiń":"Rozwiń"}</button>
                            <button >Edytuj</button>
                            <button >Usuń</button>

                        </div>

                    </div>

                </div>

            )):
            <h3>Nie masz zaplanowanych żadnych treningów.
                <br />
                 Może czas to zmienić?</h3>}

        </div>
      </div>
    </>
  );
}

export default ActivitiesList;