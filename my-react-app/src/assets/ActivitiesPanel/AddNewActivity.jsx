import '../TrainigsPanel/AddNewTraining.css'
import { estimateCalories } from '../caloriesEstimator';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore";
import { CalculatePointsForTrainings } from '../pointsCalculatorTrainings';
import { TrackChallenges } from '../ChallenegesPanel/TrackChallenges';

import { useState, useEffect } from 'react'
function AddNewActivity({activitesList,allChallengesList,trainingOptions,user,fetchActivitiesList}) {
    const [activityType, setActivityType] = useState('')
    const [activityGoal, setActivityGoal] = useState('Czas')
    const [activityGoalValue, setActivityTGoalValue] = useState('')
    const [activityHour, setActivityHour]  = useState('')
    const [activityDate, setActivityDate] = useState('')
    const [unit, setUnit] = useState('')
    const [activityDescription, setActivityDescription] = useState('')
    const [activitySecondGoal, setActivitySecondGoal] = useState('')
    const [activitySecondGoalValue, setActivitySecondGoalValue] = useState('')
    const [activitySecondUnit, setActivitySecondGoalUnit] = useState('')

    const [estimatedCalories, setEstimatedCalories] = useState()
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);

    // useEffect(()=>{
    //     let trackedChallenges = TrackChallenges(activitesList, allChallengesList)
    //     console.log(trackedChallenges)
    // }, [activitesList])

    useEffect(()=>{
        switch(activityGoal){
            case "Czas":
                setUnit("min")
                setActivitySecondGoal('Dystans')
                setActivitySecondGoalUnit('km')
                break;
            case "Dystans":
                setUnit("km")
                setActivitySecondGoal("Czas")
                setActivitySecondGoalUnit('min')
                break;
            case "Kalorie":
                setUnit("kcal")
                setActivitySecondGoal("Czas")
                setActivitySecondGoalUnit("min")
                break;
        }
    },[activityGoal])

function ClearInputs(){
            setActivityType('')
            setActivityGoal('Czas')
            setActivityTGoalValue('')
            setActivityHour('')
            setActivityDate('')
            setActivityDescription('')
            setActivitySecondGoalValue('')
            setRating(0)
    }

 async function handleActivityAdd(){
    let points = CalculatePointsForTrainings(activityGoal,activityGoalValue,estimatedCalories)
        if(user){
            if( activitySecondGoalValue&& activityType&&activityGoal&&activityGoalValue&&activityDate&&activityHour!==""){
                const newActivity = {
                    userID: auth.currentUser.uid,
                    activityType:activityType,
                    activityGoal:activityGoal,
                    activityGoalValue:activityGoalValue,
                    activityUnit:unit,
                    activitySecondGoal:activitySecondGoal,
                    activitySecondGoalValue:activitySecondGoalValue,
                    activitySecondUnit:activitySecondUnit,
                    activityDate:activityDate,
                    activityHour:activityHour,
                    activityDescription:activityDescription,
                    estimatedCalories:estimatedCalories,
                    acitivityRating:rating,
                    isFavourite:false,
                    addingDate:new Date(),
                    points:Number(points)


                }
                const docRef = await addDoc(collection(db, "Activities"), newActivity)

                window.alert("Dodano trening!");
                fetchActivitiesList()
                ClearInputs();

                
            }
            else{
                window.alert("Uzupełnij wszystkie dane")

            }

            


        }
        else{
            window.alert("Musisz byc zalogowany, żeby dodać trening")
        }

    }
    useEffect(() => {
        if(activityGoal==="Kalorie"){
            setEstimatedCalories(activityGoalValue)
        }
        else {
                let result = 0;

                if (activityGoal === "Czas") {
                    result = estimateCalories({
                        type: activityType,
                        durationMin: parseFloat(activityGoalValue)
                    });
                } else if (activityGoal === "Dystans") {
                    result = estimateCalories({
                        type: activityType,
                        distanceKm: parseFloat(activityGoalValue)
                    });
                }

                setEstimatedCalories(result);
        

        }

}, [activityType, activityGoal, activityGoalValue]);


  return (
    <>
      <div className='AddNewTrainingContainer'>
        <h2>Wykonałeś nieplanowany trening? Dodaj go tutaj!</h2>

        <input value={activityType} className="Inputs" list='trainings' placeholder='Wybierz typ treningu' onChange={event=>setActivityType(event.target.value)}/>
        <datalist id='trainings'>
            {trainingOptions.map(element=>(
                <option value={element}/>
            ))}

        </datalist>
        <div className='goalContainer'>
            <p>Jaki był twój cel?</p>
        <select  value={activityGoal} className="Inputs"  onChange={event=>setActivityGoal(event.target.value)}> 
          <option value="Czas">Czas</option>
          <option value="Dystans">Dystans</option>
          <option value="Kalorie">Kalorie</option>
        </select>

        </div>


        <input value={activityGoalValue} className="Inputs" type="number" placeholder={`Wybierz ilość: ${activityGoal}(${unit})`} onChange={event=>setActivityTGoalValue(event.target.value)} />
        <input value={activitySecondGoalValue} onChange={event=>setActivitySecondGoalValue(event.target.value)} type='number' className='Inputs' placeholder={activitySecondGoal==='Dystans'?"Ile kilometrów udało ci się pokonać?":"Ile czasu ci to zajęło?"} />
        <input value={activityDate}  max={new Date().toISOString().split("T")[0]} className="Inputs" type={activityDate ? 'date' : 'text'} onFocus={e => e.target.type = 'date'} onBlur={e => !e.target.value && (e.target.type = 'text')} placeholder="Wybierz datę treningu" onChange={event=>setActivityDate(event.target.value)} />

        <input value={activityHour} className="Inputs" type={activityHour ? 'time' : 'text'} onFocus={e => e.target.type = 'time'} onBlur={e => !e.target.value && (e.target.type = 'text')} placeholder="Wybierz godzinę" onChange={event=>setActivityHour(event.target.value)}  />

        <textarea value={activityDescription} className="Inputs" placeholder="Dodatkowe notatki (opcjonalnie)" onChange={event=>setActivityDescription(event.target.value)}></textarea>
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
     <div className='ButtonContainer'>
          <button onClick={handleActivityAdd}>Dodaj trening</button>
          <button>Anuluj</button>
        </div>
      </div>
    </>
  );
}

export default AddNewActivity;
