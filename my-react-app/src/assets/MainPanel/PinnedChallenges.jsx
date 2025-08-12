import { useEffect, useState } from 'react'
import './pinnedChallenges.css'
function PinnedChallenges({pinnedChallenges, allChallengesList}){
    const [displayedChallenge, setDispayedChallenge] = useState()

    useEffect(()=>{
        if(pinnedChallenges.length!==0){
            setDispayedChallenge(pinnedChallenges[0])
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
    return(
        <div className="pinnedChallengesContainer">
            <h2>Przypięte wyzwania</h2>
            {displayedChallenge?
                <div className="SingleChallengeContainer">
                    <div className="warningContainer">

                        <h3 style={{backgroundColor:setWarningColor(pinnedChallenges[0])}} className="comunicate"> ! {pinnedChallenges[0].timeLeft/pinnedChallenges[0].period<0.2?'Twoje wyzwanie niedługo się zakończy!':`Pozostało już tylko ${pinnedChallenges[0].timeLeft.toFixed(0)} dni`}</h3>

                        <h3 style={{backgroundColor:setWarningColor(pinnedChallenges[0])}} className="exclamation">!</h3>

                    </div>

                    <h3>{pinnedChallenges[0].title}</h3>
                    <h4>{pinnedChallenges[0].description}</h4>

                    <progress value={pinnedChallenges[0].progress/pinnedChallenges[0].goalValue}></progress>
                    <div className="buttonContainer">
                            <button onClick={()=>cancelStartedChallenge(pinnedChallenges[0])}>Przerwij</button>
                            <button>Usuń</button>
                        <h2 style={{color:pinnedChallenges[0].isPinned?"hsla(28, 95%, 40%, 1.00)":"black"}} onClick={()=>handlePinChallenge(pinnedChallenges[0])} title={pinnedChallenges[0].isPinned?"Odepnij wyzwanie":"Przypnij wyzwanie"}  className="Pin">⚲</h2>



                    </div>
                </div>
                    :
                <h3>Nie masz żadnych przypiętych wyzwań</h3>


            }

            
        </div>
    )
}
export default PinnedChallenges