
import { calculatePoints } from "./PointsCalculator";
import { use, useEffect, useState, useRef } from "react"
import { defaultChallenges } from "./DefaultChallenges"
import { addDoc, collection, getDoc,getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { TrackChallenges } from "./TrackChallenges";
import './ChallengesList.css'
function StartedChallenges({setNotficationChallengeData,allChallengesList,activitesList,handleChallengeRemove,setStartedChallengesList,startedChallengesList,handleChallengesSort,trainingOptions,setNewChallengesList,FetchPersonalChallengesList,newChallengesList,user}){

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
                let canceledChallenge = {status:"new", startDate:null, progress:0,endingDate:null,timeLeft:null}
                
                try{
                    const docRef = doc(db, "PersonalChallenges", element.id)
                    await updateDoc(docRef, canceledChallenge)

                }
                catch(error){
                    window.alert("Coś poszło nie tak")
                    console.log(error)
                    console.log(element.id)

            }
            FetchPersonalChallengesList();
        }
    }
async function handleFinishChallenge(challengesToFinish) {
    const updatePromises = challengesToFinish.map(async ch => {
        let finishedChallenge = {status: "finished", finishDate:new Date(),timeLeft:null };
        try {
            const docRef = doc(db, "PersonalChallenges", ch.id);
            await updateDoc(docRef, finishedChallenge);
        } catch (error) {
            console.log(error);
        }
    });

    await Promise.all(updatePromises); 
}
async function trackFailed(startedChallenges) {
    for(let i=0;i<startedChallenges;i++){
        if(startedChallenges[i].timeLeft<=0){
            try{
                const docRef = doc(db, "PersonalChallenges", startedChallenges[i].id)
                await updateDoc(docRef, {status:"failed"})
            }
            catch(error){
                console.log(error)
            }
        }
    }
    
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
            }
                UploadChallengesProgress();
                trackFailed(startedChallengesList)
                FetchPersonalChallengesList();



                

        }, [activitesList, user])

useEffect(() => {
    const newlyFinished = startedChallengesList.filter(ch =>
        ch.status !== "finished" &&

        
        ch.progress >= ch.goalValue &&
        !prevFinishedIds.current.has(ch.id)
    );

    if (newlyFinished.length > 0) {

        setNotficationChallengeData(newlyFinished)
        newlyFinished.forEach(ch => prevFinishedIds.current.add(ch.id));
        handleFinishChallenge(newlyFinished).then(() => {
            FetchPersonalChallengesList(); //
            
        });
    }
}, [startedChallengesList]);


function setWarningColor(element){
    let color=''
    if(element.timeLeft/element.period>=0.5){
        color = 'hsl(118, 93%, 48%)'
    }
    else if(element.timeLeft/element.period>=0.2 &&element.timeLeft/element.period<0.5 ){
        color ='orange'

    }
    else{
        color='red'

    }
    return color


    

}


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
            {
                startedChallengesList.length===0?
                <h3>Nie masz żadnych obecnie trwających wyzwań. Klikij "Dodaj" w panelu obok i zdobywaj punkty!</h3>
                :
                startedChallengesList.map((element)=>(
                <div className="SingleChallengeContainer">
                    <div className="warningContainer">

                        <h3 style={{backgroundColor:setWarningColor(element)}} className="comunicate"> ! {element.timeLeft/element.period<0.2?'Twoje wyzwanie niedługo się zakończy!':`Pozostało już tylko ${element.timeLeft.toFixed(0)} dni`}</h3>

                        <h3 style={{backgroundColor:setWarningColor(element)}} className="exclamation">!</h3>

                    </div>

                    <h3>{element.title}</h3>
                    <h4>{element.description}</h4>
                    <p>Punkty do zdobycia: <strong>{element.points.toFixed(0)}</strong></p>
                    <p>Czas do: <strong>{element.endingDate.toDate().toLocaleDateString()} <strong>{element.endingDate.toDate().getHours()}:{String(element.endingDate.toDate().getMinutes()).padStart(2,'0')}</strong></strong></p>
                    <p>Pozostało <strong>{element.timeLeft.toFixed(0)}</strong> dni</p>
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
                            <button onClick={()=>cancelStartedChallenge(element)}>Przerwij</button>

                        <button onClick={()=>{expandedElement===element.id?setExpandedElement(null):setExpandedElement(element.id)} }>{expandedElement===element.id?"Zwiń":"Rozwiń"}</button>
                        <button onClick={()=>handleChallengeRemove(element.id,setStartedChallengesList, startedChallengesList)}>Usuń</button>



                    </div>
                </div>
            ))}

            


        </div>

        </div>
    )
}

export default StartedChallenges