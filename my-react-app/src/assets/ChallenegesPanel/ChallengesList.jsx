
import { calculatePoints } from "./PointsCalculator";
import { use, useEffect, useState } from "react"
import { defaultChallenges } from "./DefaultChallenges"
import { addDoc, collection, getDoc,getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import './ChallengesList.css'
function ChallengesList({trainingOptions,setAllChallengesList,FetchPersonalChallengesList,allChallengesList,user}){
        const [selected, setSelected] = useState("nie");
        const [toggleAdd, setToggleAdd] = useState(false)


    const [challengeName, setChallengeName] = useState('')
    const [challengeDescription, setChallengeDescription] = useState('')
    const [challengeGoal, setChallengeGoal] = useState('Dystans (km)')
    const [challengePeriod, setChallengePeriod] = useState(0)
    const [challengeGoalValue, setChallengeGoalValue] = useState(0)
    const [challengeType, setChallengeType] = useState('')
    const [challengeUnit, setChallengeUnit] = useState('')
    const [challengeDiscipline, setChallengeDiscipline] = useState(null)

    const [inputPlaceholder, setInputPlaceholder] = useState('')

    useEffect(()=>{
        switch(challengeGoal){
            case "Dystans (km)":
                setInputPlaceholder("Ile kilometrów chcesz pokonać?")
                setChallengeType("distance")
                setChallengeUnit("km")
                break;
            case "Czas (min)":
                setInputPlaceholder("Ile czasu chcesz spędzić na treningach (min)?")
                setChallengeType("time")
                 setChallengeUnit("min")

                break;
            case "Kalorie (kcal)":
                setInputPlaceholder("Ile kalorii sumarycznie chcesz spalić?")
                setChallengeType("calories")
                setChallengeUnit("kcal")

                break;
            case "Liczba treningów":
                setInputPlaceholder("Ile treningów chcesz wykonać?")
                setChallengeType("sessions")
                setChallengeUnit("trainings")

                break;
            case "Treningi z rzędu":
                setInputPlaceholder('Ile treningów z rzędu chcesz wykonać?')
                setChallengeType("streak")
                setChallengeUnit("days")

                break;
            }
    }, [challengeGoal])

    useEffect(()=>{
        FetchPersonalChallengesList();
    }, [user])

async function handleCreateNewChallenge() {
    if(challengeName!==" " && challengeDescription!==" " && challengeGoal!=="" && challengePeriod!==0){
        let challengePoints = calculatePoints(challengeType,challengeGoalValue, challengePeriod)
        try{
            let newChallenge = {
                userID:auth.currentUser.uid,
                title: challengeName,
                description:challengeDescription,
                type:challengeType,
                goalValue: challengeGoalValue,
                unit: challengeUnit,
                period: challengePeriod,
                completed:false,
                disciplines:challengeDiscipline,
                points:challengePoints,


            }
        const docRef = await addDoc(collection(db, "PersonalChallenges"), newChallenge) 
        FetchPersonalChallengesList();
        setToggleAdd(false)

    }
        catch(error){
            window.alert("Nie udało się stworzyć nowego wyzwania :(")
            console.log(error)

    }

    }
    else{
        window.alert("Uzupełnij wszystkie dane ")
    }

    
}
    

    // async function handleAddChallengeToList(){
    //     try{
    //         const snapshot = await getDocs(collection(db, "DefaultChallenges"))
    //         if(snapshot.empty){
    //             for(let i =0;i<defaultChallenges.length;i++){
    //                 await addDoc(collection(db, "DefaultChallenges"), defaultChallenges[i])
    // }

    //         }
    //     }
    //     catch(error){

    //     }

    // }


    return(
        <div className="ChooseChallenge">
            <div className="header">
                <h1>Twoje wyzwania!</h1>
                <button onClick={()=>setToggleAdd(true)}>Dodaj </button>
            </div>
    { toggleAdd &&
        <div className="AddChallengeContainer">
            <h3>Wprowadź informacje</h3>
            <input className="input" type="text" placeholder="Nazwa wyzwania" onChange={event=>setChallengeName(event.target.value)} />
            <input className="input" type="text" placeholder="Opisz krótko swoje wyzwanie" onChange={event=>setChallengeDescription(event.target.value)} />

            <div className="goalContainer" >
            <p>Jaki masz cel?</p>
            <select className="input" name="" id="" onChange={event=>setChallengeGoal(event.target.value)}>
                <option value="Dystans (km)">Dystans (km)</option>
                <option value="Czas (min)">Czas (min)</option>
                <option value="Kalorie (kcal)">Kalorie (kcal)</option>
                <option value="Liczba treningów">Liczba treningów</option>
                <option value="Treningi z rzędu">Treningi z rzędu</option>
            </select>

            </div>

            <input className="input" type="number" onChange={event=>setChallengeGoalValue(event.target.value)} placeholder={inputPlaceholder} />

            <div className="radioContainer"> 
                <p>Czy dotyczy konkretnej aktywności?</p>
                <input onChange={event=>setSelected(event.target.value)} type="radio" name="check" value='tak' checked={selected ==="tak"} />
                <label htmlFor="check">Tak</label>
                <input onChange={event=>setSelected(event.target.value)} type="radio" name="check" value='nie' checked={selected ==="nie"}  />
                <label htmlFor="check">Nie</label>

            </div>

        {       selected==="tak" && 
        <>
                    <input className="input" onChange={event=>setChallengeDiscipline(event.target.value)} list='trainings' type="text" placeholder="Której aktywności dotyczy wyzwanie?"/>
            <datalist id='trainings'>
            {trainingOptions.map((element,index)=>(
                <option value={element} key={index}/>
            ))}

        </datalist>
        </>

        }
            <input className="input" type="number" onChange={event=>setChallengePeriod(event.target.value)} placeholder="Ile czasu chcesz na ukończenie wyzwania (dni)?" />
            <div className="buttonContainer">
                <button onClick={handleCreateNewChallenge}>Dodaj </button>
            <button onClick={()=>setToggleAdd(false)}>Anuluj</button>

            </div>

        </div>
        }
        <div style={{height:toggleAdd?"27%":"90%"}} className="AllChallengesContainer">
            {allChallengesList.map((element)=>(
                <div className="SingleChallengeContainer">
                    <h3>{element.title}</h3>
                    <h4>{element.description}</h4>
                    <p>Punkty do zdobycia: <strong>{element.points}</strong></p>
                    <button>Dodaj</button>
                </div>
            ))}

        </div>

        </div>
    )
}
export default ChallengesList