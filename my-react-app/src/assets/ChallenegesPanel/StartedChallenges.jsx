
import { calculatePoints } from "./PointsCalculator";
import { use, useEffect, useState, useRef } from "react"
import { defaultChallenges } from "./DefaultChallenges"
import { addDoc, collection, getDoc,getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { TrackChallenges } from "./TrackChallenges";
import './ChallengesList.css'
function StartedChallenges({imaginaryArray,allChallengesList,activitesList,handleChallengeRemove,setStartedChallengesList,startedChallengesList,handleChallengesSort,trainingOptions,setNewChallengesList,FetchPersonalChallengesList,newChallengesList,user}){

        const [expandedElement, setExpandedElement] = useState(null)
const prevFinishedIds = useRef(new Set());


        function askAndRemove(element){
            let confirm = window.confirm("Czy na pewno chcesz usunąć to wyzwanie? Stracisz wtedy cały postęp.")
            if(confirm){
                handleChallengeRemove(element.id,setStartedChallengesList, startedChallengesList)
            }
        }   


        async function cancelStartedChallenge(element){
            let confirm = window.confirm("Czy na pewno chcesz przerwać to wyzwanie? Stracisz wtedy cały postęp. ")
            if(confirm){
                let canceledChallenge = {...element, status:"new", stardDate:null, progress:0}
                try{
                    const docRef = doc(db, "PersonalChallenges", element.id)
                    await updateDoc(docRef, canceledChallenge)

                }
                catch(error){
                    window.alert("Coś poszło nie tak")
            }
            FetchPersonalChallengesList();
        }
    }
async function handleFinishChallenge(challengesToFinish) {
    const updatePromises = challengesToFinish.map(async ch => {
        let finishedChallenge = { ...ch, status: "finished" };
        try {
            const docRef = doc(db, "PersonalChallenges", ch.id);
            await updateDoc(docRef, finishedChallenge);
        } catch (error) {
            console.log(error);
        }
    });

    await Promise.all(updatePromises); // poczekaj na wszystkie aktualizacje
}



        useEffect(()=>{
            let trackedChallenges = TrackChallenges(activitesList, allChallengesList)
            async function UploadChallengesProgress() {
                for(let i =0;i<trackedChallenges.length;i++){
                    let updatedChallenge = trackedChallenges[i]
                try{
                    const docRef = doc(db, "PersonalChallenges", updatedChallenge.challengeID)
                    await updateDoc(docRef,updatedChallenge.data)

                }
                catch(error){
                    console.log(error)

                }

                }     
                FetchPersonalChallengesList();           
            }
                UploadChallengesProgress();



                

        }, [activitesList])

useEffect(() => {
    const newlyFinished = startedChallengesList.filter(ch =>
        ch.status !== "finished" &&
        ch.progress >= ch.goalValue &&
        !prevFinishedIds.current.has(ch.id)
    );

    if (newlyFinished.length > 0) {
        newlyFinished.forEach(ch => prevFinishedIds.current.add(ch.id));
        handleFinishChallenge(newlyFinished).then(() => {
            FetchPersonalChallengesList(); //
            
        });
    }
}, [startedChallengesList]);


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
                    <h4>{element.status}</h4>
                    <p>Punkty do zdobycia: <strong>{element.points.toFixed(0)}</strong></p>
                    <p>Czas do: <strong>{element.endingDate.toDate().toLocaleDateString()} <strong>{element.endingDate.toDate().getHours()}:{element.endingDate.toDate().getMinutes()}</strong></strong></p>
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
                    <p>Progres: {element.progress}/{element.goalValue} {element.unit}</p>
                    <progress value={element.progress/element.goalValue}></progress>
                    <div className="buttonContainer">
                        <button onClick={()=>{expandedElement===element.id?setExpandedElement(null):setExpandedElement(element.id)} }>{expandedElement===element.id?"Zwiń":"Rozwiń"}</button>
                        <button onClick={()=>cancelStartedChallenge(element)}>Przerwij</button>
                        <button onClick={()=>askAndRemove(element)}>Usuń</button>



                    </div>
                </div>
            ))}

        </div>

        </div>
    )
}

export default StartedChallenges