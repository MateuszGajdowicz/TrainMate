import ChallengesList from "./ChallengesList"
import StartedChallenges from "./StartedChallenges"
import { useState,useEffect, act, use } from 'react'
import { deleteDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { addDoc, collection,doc } from 'firebase/firestore';
import { TrackChallenges } from "./TrackChallenges"

function ChallengesPanel({activitesList,trainingOptions,setAllChallengesList,allChallengesList,FetchPersonalChallengesList,user}){

      const [newChallengesList, setNewChallengesList] = useState([])
      const [startedChallengesList, setStartedChallengesList] = useState(allChallengesList.filter(element=>element.status==="started"))
      const [finishedChallenges, setFinishedChallegnges] = useState(allChallengesList.filter(element=>element.status==="finished"))

    const [challengesProgressInfo, setChallengesProgressInfo] = useState(null)
       
      useEffect(()=>{
        let newchallenges = allChallengesList.filter(element=>element.status === "new").sort((a, b) => b.addingDate.toDate() - a.addingDate.toDate())
        setNewChallengesList(newchallenges)

        let startedChallenges = allChallengesList.filter(element=>element.status === "started").sort((a,b)=>b.addingDate.toDate() - a.addingDate.toDate())
        setStartedChallengesList(startedChallenges)
      },[allChallengesList, user])


    function handleChallengesSort(array, event, setArray){
            let value = event.target.value;
            let sortedArray = [...array]
            switch(value){
                case 'Najwięcej puntków':
                    sortedArray.sort((a,b)=>b.points-a.points)
                    break;
                case "Najmniej punktów":
                    sortedArray.sort((a,b)=>a.points-b.points)
                    break;
                case "Najkrótsze":
                    sortedArray.sort((a,b)=>a.period-b.period)
                    break;
                case "Najdłuższe":
                    sortedArray.sort((a,b)=>b.period-a.period)
                    break;

            }
            setArray(sortedArray)
        }

    async function handleChallengeRemove(challengeID, setList, List){
        try{
            const docRef = doc(db, "PersonalChallenges", challengeID)
            await deleteDoc(docRef) 
            setList(List.filter(element=>element.id!==challengeID))
        }
        catch(error){
            window.alert("Coś poszło nie tak")
        }

    }


    return(<>
    <ChallengesList setAllChallengesList={setAllChallengesList} allChallengesList={allChallengesList} handleChallengesSort={handleChallengesSort} trainingOptions={trainingOptions} setNewChallengesList={setNewChallengesList} newChallengesList={newChallengesList} FetchPersonalChallengesList={FetchPersonalChallengesList} user={user}/>
   <StartedChallenges allChallengesList={allChallengesList} activitesList={activitesList} handleChallengeRemove={handleChallengeRemove} setStartedChallengesList={setStartedChallengesList} handleChallengesSort={handleChallengesSort} startedChallengesList={startedChallengesList}/> 
    </>)
}
export default ChallengesPanel