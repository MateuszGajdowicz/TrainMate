import { useEffect, useState } from 'react';
import './NotificationContainer.css'

function NotificationContainer({ notificationChallengeData,setNotficationChallengeData,setIsNotificationDisplayed  }) {
    const [summedPoints, setSummedPoints] = useState(0)
    useEffect(()=>{
        let summedPoints = notificationChallengeData.reduce((prev, next)=>prev+next.points, 0)
        setSummedPoints(summedPoints)
    }, [notificationChallengeData, summedPoints])

  return (
    <div className='background'>
          <div className='NotificationContainer'>


            <h1>Gratulacje!</h1>
            <button onClick={()=>{setIsNotificationDisplayed(false);setNotficationChallengeData([])}} className='close'>Zamknij</button>
            
            <h2>Udało ci się wykonać poniższe wyzwania: </h2>
            <div className='allChallengesFinished'>
            {notificationChallengeData.map((element, index)=>(
              <div key={index} className='SingleContainer'>
                <h3>{element.title}</h3>
                <h4>{element.description}</h4>
                { element.disciplines!==null &&
                    <p>Aktywność: {element.disciplines}</p>}
                <p>Osiągnięty cel: {element.goalValue} {element.unit}</p>
                <p>Zdobyte punkty: {element.points.toFixed(0)}</p>
                <button>Udostępnij</button>

              </div>

            ))}
            </div>
            <p><strong></strong></p>
            <h3>Zebrałeś dzięki temu <strong>{summedPoints.toFixed(0)}</strong> punktów!</h3>
            <h4>Nie zatrzymuj się! Dodaj kolejne wyzwania i zdobądź więcej punktów!</h4>
        
      
    </div>



    </div>


  );
}

export default NotificationContainer;
