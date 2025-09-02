import { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, getDoc,getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore";
import './pinnedChallenges.css'
import { TrackChallenges } from '../ChallenegesPanel/TrackChallenges';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function PinnedChallenges({activitesList,FetchPersonalChallengesList,pinnedChallenges, allChallengesList}){
    const [displayedChallengeIndex, setDispayedChallengeIndex] = useState(0)
        // useEffect(()=>{
        //     let trackedChallenges = TrackChallenges(activitesList, pinnedChallenges)
        //     async function UploadChallengesProgress() {
        //         for(let i =0;i<trackedChallenges.length;i++){
        //             let updatedChallenge = trackedChallenges[i]
        //         try{
        //             const docRef = doc(db, "PersonalChallenges", updatedChallenge.challengeID)
        //             await updateDoc(docRef,updatedChallenge.data)

        //         }
        //         catch(error){
        //             console.log(error)

        //         }

        //         }     
        //     }
        //     async function UpdateAll() {
        //         await UploadChallengesProgress();
        //         await FetchPersonalChallengesList();
                
        //     }

        // UpdateAll();


        // }, [activitesList])
async function cancelStartedChallenge(element){
            let confirm = window.confirm("Czy na pewno chcesz przerwać to wyzwanie? Stracisz wtedy cały postęp. ")
            if(confirm){
                let canceledChallenge = {status:"new",isPinned:false ,startDate:null, progress:0,endingDate:null,timeLeft:null}
                
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

async function handleChallengeRemove(element){
    let confirm  = window.confirm("Czy na pewno chcesz usunąć to wyzwanie? Stracisz wtedy cały postęp.")
    if(confirm){
        try{
            const docRef = doc(db, "PersonalChallenges", element.id)
            await deleteDoc(docRef)
            FetchPersonalChallengesList();

        }
        catch(error){
            console.log(error)
            window.alert("Coś poszło nie tak")
        }
    }
}

    useEffect(()=>{
        if(pinnedChallenges.length!==0){
            setDispayedChallengeIndex(0)
        }
        console.log(pinnedChallenges)

    }, [pinnedChallenges])

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
    async function handlePinChallenge(element) {
    try{
        const docRef = doc(db, "PersonalChallenges", element.id)
        if(element.isPinned){
            await updateDoc(docRef, {isPinned:false})

        }
        else{
            await updateDoc(docRef, {isPinned:true})


        }

    }
    catch(error){
        console.log(error)
        window.alert("Nie udało się przypiąć wyzwania. Spróbuj ponownie")

    }
    FetchPersonalChallengesList();
    
}

    function handleSwipeNext(){
        if(displayedChallengeIndex!==pinnedChallenges.length-1){
            setDispayedChallengeIndex(prev=>prev+1)
        }
        else{
            setDispayedChallengeIndex(0)
        }

    }

    function handleSwipePrev(){
        if(displayedChallengeIndex!==0){
            setDispayedChallengeIndex(prev=>prev-1)

        }
        else{
            setDispayedChallengeIndex(pinnedChallenges.length-1)


        }
    }
    return(
        <div className="pinnedChallengesContainer">
            <div className='Header'>
                    <h2>Przypięte wyzwania</h2>
                    
                    <p style={{opacity:pinnedChallenges.length!==0?"1":"0"}}>{displayedChallengeIndex+1}/{pinnedChallenges.length}</p>
                    <div className='navbuttons'>
                            <button onClick={handleSwipePrev}>&lt;</button>
                            <button onClick={handleSwipeNext}>&gt;</button>

                    </div>




            </div>
            {pinnedChallenges[displayedChallengeIndex]?
                <div className="SingleChallengeContainer">
                    <div className="warningContainer">

                        <h3 style={{backgroundColor:setWarningColor(pinnedChallenges[displayedChallengeIndex])}} className="comunicate"> ! {pinnedChallenges[displayedChallengeIndex].timeLeft/pinnedChallenges[displayedChallengeIndex].period<0.2?'Twoje wyzwanie niedługo się zakończy!':`Pozostało już tylko ${pinnedChallenges[displayedChallengeIndex].timeLeft.toFixed(0)} dni`}</h3>

                        <h3 style={{backgroundColor:setWarningColor(pinnedChallenges[displayedChallengeIndex])}} className="exclamation">!</h3>

                    </div>

                    <h3>{pinnedChallenges[displayedChallengeIndex].title}</h3>
                    <h4>{pinnedChallenges[displayedChallengeIndex].description}</h4>

                    <progress value={pinnedChallenges[displayedChallengeIndex].progress/pinnedChallenges[displayedChallengeIndex].goalValue}></progress>
                    <div className="buttonContainer">
                            <button onClick={()=>cancelStartedChallenge(pinnedChallenges[displayedChallengeIndex])}>Przerwij</button>
                            <button onClick={()=>handleChallengeRemove(pinnedChallenges[displayedChallengeIndex])}>Usuń</button>
                        <h2 style={{color:pinnedChallenges[displayedChallengeIndex].isPinned?"hsla(28, 95%, 40%, 1.00)":"black"}} onClick={()=>handlePinChallenge(pinnedChallenges[displayedChallengeIndex])} title={pinnedChallenges[displayedChallengeIndex].isPinned?"Odepnij wyzwanie":"Przypnij wyzwanie"}  className="Pin">⚲</h2>



                    </div>
                </div>
                    :
                    <>
                <h3 className='noChallengesDiplay'>Nie masz żadnych 
                 przypiętych wyzwań</h3>

                <p className='noChallengesDiplay'>Nie zwlekaj i zacznij nowe wyzwanie już teraz! </p>
                <Link to='/challengesPanel'><button className='noChallengeButton' >Dodaj wyzwanie</button></Link>

                    </>

            }

            
        </div>
    )
}
export default PinnedChallenges