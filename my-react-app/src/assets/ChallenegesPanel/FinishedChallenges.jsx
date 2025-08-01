
import { calculatePoints } from "./PointsCalculator";
import { use, useEffect, useState, useRef } from "react"
import { defaultChallenges } from "./DefaultChallenges"
import { addDoc, collection, getDoc,getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { TrackChallenges } from "./TrackChallenges";
import './ChallengesList.css'
function FinishedChallenges({startedChallengesList,setFinishedChallengesList,handleChallengesSort,FetchPersonalChallengesList,user,finishedChallengesList}){

        const [expandedElement, setExpandedElement] = useState(null)

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
      // Usuń `id` z obiektu:
      const { id, ...challengeWithoutId } = element;

      const repeatedChallenge = {
        ...challengeWithoutId,
        status: "started",
        progress: 0,
        startDate: new Date(),
        endingDate: endDate,
        finishDate: null,
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



    return(
        <div style={{left:'67%'}} className="ChooseChallenge">
            <div className="header">
                <h1>Ukończone wyzwania!</h1>
                <select className="sortSelect" onClick={event=>handleChallengesSort(finishedChallengesList, event, setFinishedChallengesList)}    name="" id="">
                    <option value="Najwięcej puntków">Najwięcj puntków</option>
                    <option value="Najmniej punktów">Najmniej punktów</option>
                    <option value="Najkrótsze">Najkrótsze</option>
                    <option value="Najdłuższe">Najdłuższe</option>
                </select>
            </div>
    
        <div  className="AllChallengesContainer">
            {
                finishedChallengesList.length===0?
                <h3>Nie masz jeszcze żadnych ukończonych wyzwań. Trenuj dalej, by je ukończysz a zdobędziesz punkty!</h3>
                :
                finishedChallengesList.map((element)=>(
                <div className="SingleChallengeContainer">
                    <h3>{element.title}</h3>
                    <h3>{element.id}</h3>
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
                        <button >Usuń</button>



                    </div>
                </div>
            ))}

            


        </div>

        </div>
    )
}

export default FinishedChallenges