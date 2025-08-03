import { useEffect, useState } from 'react';
import './NotificationContainer.css'

function NotificationContainer({ notificationChallengeData }) {
    const [summedPoints, setSummedPoints] = useState(0)
    useEffect(()=>{
        let summedPoints = notificationChallengeData.reduce((prev, next)=>prev+next.points, 0)
        setSummedPoints(summedPoints)
    }, [notificationChallengeData, summedPoints])

  return (

    <div className='NotificationContainer'>

          <div  className='singleContainer'>
            <h4>Gratulacje!</h4>
            <p>Udało ci się wykonać poniższe wyzwania: </p>
            {notificationChallengeData.map((element, index)=>(
                <p><strong>{element.title}</strong></p>

            ))}
            <p><strong></strong></p>
            <p>Zebrałeś dzięki temu <strong>{summedPoints}</strong> punktów!</p>
            <p>Dane wyzwania:</p>
          </div>
        
      
    </div>
  );
}

export default NotificationContainer;
