import { useEffect, useState } from 'react'
import './ConfirmPanel.css'
import { deleteDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { addDoc, collection,doc } from 'firebase/firestore';
function ConfirmPanel({fetchActivitiesList,fetchTrainingsList,selectedTraining,setIsConfirmDisplayed,setSelectedTraining}){
    

    const distanceFocusedActivities = ["Bieganie","Rower","Pływanie","Nordic Walking","Rolki","Deskorolka","Kajakarstwo","Wioślarstwo","Narciarstwo","Łyżwy","Spacer","Marszobieg","Turystyka górska","Bieg na orientację","SUP (Stand Up Paddle)","Windsurfing","Kitesurfing","Surfing","Żeglarstwo","Triathlon"];

    const [unitMessage, setUnitMessage] = useState('')
    const [secondGoal, setSecondGoal] = useState('')
    const [secondGoalValue, setSecondGoalValue] = useState(0)
    const [secondGoalUnit, setSecondGoalUnit] = useState('')

    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0)
    useEffect(()=>{
        switch(selectedTraining.trainingGoal){
            case "Dystans" : case "Kalorie":
                setUnitMessage('Ile czasu zajął Ci Twój trening (min)')
                setSecondGoal("Czas")
                setSecondGoalUnit("min")
                break;
            case "Czas":
                setUnitMessage("Ile kilometrów pokonałeś?")
                setSecondGoal("Dystans")
                setSecondGoalUnit("km")

        }
    }, [selectedTraining])

    async function handleFinishTraining(){
            try{
            const docRef = doc(db, "Trainings", selectedTraining.id)
            await deleteDoc(docRef)

            const newActivity = {
                    userID: auth.currentUser.uid,
                    activityType:selectedTraining.trainingType,
                    activityGoal:selectedTraining.trainingGoal,
                    activityGoalValue:selectedTraining.trainingGoalValue,
                    activityUnit:selectedTraining.trainingUnit,
                    activitySecondGoal:secondGoal,
                    activitySecondGoalValue:secondGoalValue,
                    activitySecondUnit:secondGoalUnit,
                    activityDate:selectedTraining.trainingDate,
                    activityHour:selectedTraining.trainingHour,
                    activityDescription:selectedTraining.trainingDescription,
                    estimatedCalories:selectedTraining.estimatedCalories,
                    acitivityRating:rating,
                    isFavourite:selectedTraining.isFavourite,
                    addingDate:new Date(),
                    points:Number(selectedTraining.points)
            }
            const docRef2 = await addDoc(collection(db, "Activities"), newActivity)
            fetchTrainingsList();
            setIsConfirmDisplayed(false)
            fetchActivitiesList();


        }
        catch(error){
            console.log(error)
            window.alert("Coś poszło nie tak")
        }

    

    }
    
    return(
        <div className='Container'>
            <div className="confirmContainer">
            <h1>Gratulacje! Udało Ci się ukończyć trening {selectedTraining.trainingType} </h1>
            <h2>Zdobyłeś dzięki temu {selectedTraining.points} punktów oraz spaliłeś {selectedTraining.estimatedCalories} kalorii</h2>
            <p>Jesteśmy z ciebie dumni, lecz zanim oddasz się całkowicie celebracji prosimy Cię o jeszcze kilka informacji</p>

            {(selectedTraining.trainingGoal==="Dystans" || distanceFocusedActivities.includes(selectedTraining.trainingType)) &&
                <input className='inputs' placeholder={unitMessage} onChange={event=>setSecondGoalValue(event.target.value)} type="number" />
 }
            <div style={{ display: 'flex', alignItems:'center', gap: 5, fontSize: 28, cursor: 'pointer', padding:'0px'}}>
            <p style={{fontSize:'0.7em'}}>Oceń swój trening:</p>

            {[1, 2, 3, 4, 5].map((star) => (
                <span
                key={star}
                style={{ color: star <= (hoveredStar || rating) ? 'gold' : 'lightgray', transition: 'color 0.2s'}}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setRating(star)}
                >
                ★
                </span>
            ))}
            </div>
            <p>Dzięki tej informacji będziemy w stanie dokładniej śledzić Twoje postępy oraz analizować Twoje treningi.</p>
            <p>Po podaniu informacji kilknij <strong>"Zakończ"</strong>  i ciesz się swoim nowym sukcesem!</p>
            <div className='buttonContainer'>
                <button onClick={handleFinishTraining}>Zakończ</button>
                <button>Udostępnij</button>
                <button onClick={()=>{setIsConfirmDisplayed(false), setSelectedTraining(null)}}>Anuluj</button>


            </div>
            

        </div>



        </div>
        
    )
}
export default ConfirmPanel