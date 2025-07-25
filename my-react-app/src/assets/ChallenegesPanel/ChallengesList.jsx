
import { calculatePoints } from "./PointsCalculator";
import { useEffect, useState } from "react"
import { defaultChallenges } from "./DefaultChallenges"
import { addDoc, collection, getDoc,getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import './ChallengesList.css'
function ChallengesList({trainingOptions,setAllChallengesList,FetchPersonalChallengesList,allChallengesList,user}){
    

    const [isFetched, setIsFetched] = useState(false)

    const [inputPlaceholder, setInputPlaceholder] = useState('')
    const [goalSelectValue,setGoalSelectValue] = useState("Dystans (km)")

    useEffect(()=>{
        switch(goalSelectValue){
            case "Dystans (km)":
                setInputPlaceholder("Ile kilometrów chcesz pokonać?")
                break;
            case "Czas (min)":
                setInputPlaceholder("Ile czasu chcesz spędzić na treningach (min)?")
                break;
            case "Kalorie (kcal)":
                setInputPlaceholder("Ile kalorii sumarycznie chcesz spalić?")
                break;
            case "Liczba treningów":
                setInputPlaceholder("Ile treningów chcesz wykonać")
                break;
            case "Treningi z rzędu":
                setInputPlaceholder('Ile treningów z rzędu chcesz wykonać?')
                break;
            }
    })

    useEffect(()=>{
        FetchPersonalChallengesList();
    }, [user])

    

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
                {/* <button>Dodaj </button> */}
            </div>
        <div className="AddChallengeContainer">
            <h3>Wprowadź informacje</h3>
            <input type="text" placeholder="Nazwa wyzwania" />
            <p>Czego dotyczy twoje wyzwanie?</p>
            <input list='trainings' type="text" placeholder="Której aktywności dotyczy "/>
            <datalist id='trainings'>
                <option value="Żadnej konkretnej" />
            {trainingOptions.map((element,index)=>(
                <option value={element} key={index}/>
            ))}

        </datalist>

            <select name="" id="">
                <option value="Dystans (km)">Dystans (km)</option>
                <option value="Czas (min)">Czas (min)</option>
                <option value="Kalorie (kcal)">Kalorie (kcal)</option>
                <option value="Liczba treningów">Liczba treningów</option>
                <option value="Treningi z rzędu">Treningi z rzędu</option>
            </select>
            <input type="number" placeholder={inputPlaceholder} />
            <input type="number" placeholder="Ile czasu chcesz na ukończenie wyzwania (dni)?" />

        </div>
        <div className="AllChallengesContainer">
            {allChallengesList.map((element)=>(
                <div className="SingleChallengeContainer">
                    <h3>{element.title}</h3>
                    <h4>{element.description}</h4>
                    <h4>{element.points}</h4>
                    <button>Dodaj</button>
                </div>
            ))}

        </div>

        </div>
    )
}
export default ChallengesList