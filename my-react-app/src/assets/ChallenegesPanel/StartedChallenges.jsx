
import { calculatePoints } from "./PointsCalculator";
import { use, useEffect, useState } from "react"
import { defaultChallenges } from "./DefaultChallenges"
import { addDoc, collection, getDoc,getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { TrackChallenges } from "./TrackChallenges";
import './ChallengesList.css'
function StartedChallenges({allChallengesList,activitesList,handleChallengeRemove,setStartedChallengesList,startedChallengesList,handleChallengesSort,trainingOptions,setNewChallengesList,FetchPersonalChallengesList,newChallengesList,user}){


        const [expandedElement, setExpandedElement] = useState(null)

        function askAndRemove(element){
            let confirm = window.confirm("Czy na pewno chcesz usunąć to wyzwanie? Stracisz wtedy cały postęp.")
            if(confirm){
                handleChallengeRemove(element.id,setStartedChallengesList, startedChallengesList)
            }
        }   


        async function cancelStartedChallenge(element){
            let confirm = window.confirm("Czy na pewno chcesz przerwać to wyzwanie? Stracisz wtedy cały postęp. ")
            if(confirm){
                try{

                }
                catch(error){
                    window.alert("Coś poszło nie tak")
            }

        }
    }


        useEffect(()=>{
            let trackedChallenges = TrackChallenges(activitesList, allChallengesList)
            console.log(trackedChallenges)
            async function UploadChallengesProgress() {
                for(let i =0;i<trackedChallenges.length;i++){
                    let updatedChallenge = {
                        
                    }
                try{
                    const docRef = doc(db, "PersonalChallenges", trackedChallenges[i].id)
                    await updateDoc(docRef)

                }
                catch(error){

                }

                }

                
            }

        }, [activitesList])

    return(
        <div style={{left:'35%'}} className="ChooseChallenge">
            <div className="header">
                <h1>Zaczęte wyzwania!</h1>
                <select className="sortSelect" onChange={event=>handleChallengesSort(startedChallengesList, event,setStartedChallengesList )}   name="" id="">
                    <option value="Najwięcej puntków">Najwięcj puntków</option>
                    <option value="Najmniej punktów">Najmniej punktów</option>
                    <option value="Najkrótsze">Najkrótsze</option>
                    <option value="Najdłuższe">Najdłuższe</option>
                </select>
            </div>
    
        <div  className="AllChallengesContainer">
            {startedChallengesList.map((element)=>(
                <div className="SingleChallengeContainer">
                    <h3>{element.title}</h3>
                    <h4>{element.description}</h4>
                    <p>Punkty do zdobycia: <strong>{element.points.toFixed(0)}</strong></p>
                                        {
                        expandedElement===element.id &&
                        <>
                        {
                            element.disciplines!==null &&
                            <p>Aktywność: <strong>{element.disciplines}</strong></p>
                        }
                        <p></p>
                        <p>Liczba dni: <strong>{element.period}</strong></p>
                        <p>Cel: <strong>{element.goalValue} {element.unit}</strong></p>
                        </>
                    }
                    <progress value={5/10}></progress>
                    <div className="buttonContainer">
                        <button onClick={()=>{expandedElement===element.id?setExpandedElement(null):setExpandedElement(element.id)} }>{expandedElement===element.id?"Zwiń":"Rozwiń"}</button>
                        <button>Przerwij</button>
                        <button onClick={()=>askAndRemove(element)}>Usuń</button>



                    </div>
                </div>
            ))}

        </div>

        </div>
    )
}

export default StartedChallenges