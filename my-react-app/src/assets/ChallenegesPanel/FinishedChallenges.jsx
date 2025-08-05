
import { calculatePoints } from "./PointsCalculator";
import { use, useEffect, useState, useRef } from "react"
import { defaultChallenges } from "./DefaultChallenges"
import { addDoc, collection, getDoc,getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { TrackChallenges } from "./TrackChallenges";
import './ChallengesList.css'
function FinishedChallenges({handleChallengeRemove,activitesList,setNotficationChallengeData,failedChallengesList,startedChallengesList,setFinishedChallengesList,handleChallengesSort,FetchPersonalChallengesList,user,finishedChallengesList}){

        const [expandedElement, setExpandedElement] = useState(null)
        const [displayedList, setDisplayedList] = useState(finishedChallengesList)


    function isRepeatingChallenges(startedChallenges, challengeElement){
    let matchedDisciplines=startedChallenges.filter(element=>element.disciplines===challengeElement.disciplines && element.disciplines!==null)
    let matchedType = startedChallenges.filter(element=>element.type===challengeElement.type && element.disciplines===challengeElement.disciplines)
    return matchedDisciplines.length!==0 || matchedType.length!==0? true:false
}

async function handleRepeatChallenge(element) {
  let isRepeating = isRepeatingChallenges(startedChallengesList, element);

  if (!isRepeating) {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + Number(element.period));

    try {
          const endDate = new Date()
        endDate.setDate(endDate.getDate()+(element.period))
      // Usuń `id` z obiektu:
      const { id, ...challengeWithoutId } = element;

      const repeatedChallenge = {
        ...challengeWithoutId,
        status: "started",
        progress: 0,
        startDate: new Date(),
        endingDate: endDate,
        finishDate: null,
        timeLeft:(endDate- new Date())/ (1000 * 60 * 60 * 24),
      };

      await addDoc(collection(db, "PersonalChallenges"), repeatedChallenge);
      FetchPersonalChallengesList();
    } catch (error) {
      console.error("Nie udało się powtórzyć wyzwania:", error);
      window.alert("Coś poszło nie tak :(");
    }
  } else {
    window.alert("To wyzwanie (lub podobne) już trwa.");
  }
}

function handleChallengeType(event){
  let value = event.target.value;
  switch(value){
    case "Ukończone wyzwania":
      setDisplayedList(finishedChallengesList)
      break;
    case "Nieudane wyzwania":
      setDisplayedList(failedChallengesList)
      break;
  }

}
useEffect(() => {
    setDisplayedList(finishedChallengesList);
}, [finishedChallengesList]);

useEffect(() => {
  if (displayedList === failedChallengesList) {
    setDisplayedList(failedChallengesList);
  }
}, [failedChallengesList]);


    return(
        <div style={{left:'67%'}} className="ChooseChallenge">

            <div className="header">
                <h1>{displayedList===failedChallengesList?"Nieudane wyzwania :(":"Ukończone wyzwania!"}</h1>
                <select onChange={event=>handleChallengeType(event)} style={{width:"5%"}} className="sortSelect"  name="" id="">
                  <option value="Ukończone wyzwania">Ukończone wyzwania</option>
                  <option value="Nieudane wyzwania">Nieudane wyzwania</option>
                </select>
                <select className="sortSelect" onChange={event=>handleChallengesSort(displayedList, event, displayedList===finishedChallengesList?finishedChallengesList:failedChallengesList)}    name="" id="">
                    <option value="Najwięcej puntków">Najwięcj puntków</option>
                    <option value="Najmniej punktów">Najmniej punktów</option>
                    <option value="Najkrótsze">Najkrótsze</option>
                    <option value="Najdłuższe">Najdłuższe</option>
                </select>
            </div>
    
        <div  className="AllChallengesContainer">
            {
                displayedList.length===0?
                <h3>Nie masz jeszcze żadnych ukończonych wyzwań. Trenuj dalej, by je ukończysz a zdobędziesz punkty!</h3>
                :
                displayedList.map((element)=>(
                <div className="SingleChallengeContainer">
                    <h3>{element.title}</h3>
                    <h4>{element.description}</h4>
                    <p>Zdobyte punkty: <strong>{element.points.toFixed(0)}</strong></p>
                    <p>Ukończono: <strong>{element.finishDate.toDate().toLocaleDateString()} <strong>{element.finishDate.toDate().getHours()}:{String(element.finishDate.toDate().getMinutes()).padStart(2,'0')}</strong></strong></p>
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

                    <div className="buttonContainer">
                        <button onClick={()=>handleRepeatChallenge(element)} >Powtórz</button>

                        <button onClick={()=>{expandedElement===element.id?setExpandedElement(null):setExpandedElement(element.id)} }>{expandedElement===element.id?"Zwiń":"Rozwiń"}</button>
                        <button onClick={()=>handleChallengeRemove(element.id, setDisplayedList, displayedList)} >Usuń</button>
                        { displayedList===finishedChallengesList &&
                            <button style={{right:'20px', position:'absolute'}}>Udostępnij</button>
                          }



                    </div>
                </div>
            ))}

            


        </div>

        </div>
    )
}

export default FinishedChallenges