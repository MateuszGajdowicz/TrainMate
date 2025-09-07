
import { calculatePoints } from "./PointsCalculator";
import { use, useEffect, useState } from "react"
import { defaultChallenges } from "./DefaultChallenges"
import { addDoc, collection, getDoc,getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import './ChallengesList.css'
function ChallengesList({startedChallengesList,handleChallengeRemove,allChallengesList,handleChallengesSort,trainingOptions,setNewChallengesList,FetchPersonalChallengesList,newChallengesList,user}){
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

    const [expandedElement, setExpandedElement] = useState(null)



    useEffect(()=>{
        switch(challengeGoal){
            case "Dystans (km)":
                setInputPlaceholder("Ile kilometrów chcesz pokonać?")
                setChallengeType("Dystans")
                setChallengeUnit("km")
                break;
            case "Czas (min)":
                setInputPlaceholder("Ile czasu chcesz spędzić na treningach (min)?")
                setChallengeType("Czas")
                 setChallengeUnit("min")

                break;
            case "Kalorie (kcal)":
                setInputPlaceholder("Ile kalorii sumarycznie chcesz spalić?")
                setChallengeType("Kalorie")
                setChallengeUnit("kcal")

                break;
            case "Liczba treningów":
                setInputPlaceholder("Ile treningów chcesz wykonać?")
                setChallengeType("Treningi")
                setChallengeUnit("treningi")

                break;
            case "Treningi z rzędu":
                setInputPlaceholder('Ile treningów z rzędu chcesz wykonać?')
                setChallengeType("Streak")
                setChallengeUnit("dni")

                break;
            }
    }, [challengeGoal])


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
                progress:0,
                period: Number(challengePeriod),
                status:"new",
                disciplines:challengeDiscipline,
                points:challengePoints,
                startDate:null,
                addingDate:new Date(),
                isOverTime:false,
                endingDate:null,
                isDefault:false,
                finishDate:null,
                timeLeft:null,


            }
        const docRef = await addDoc(collection(db, "PersonalChallenges"), newChallenge) 
        FetchPersonalChallengesList();
        setToggleAdd(false)
        setChallengeDiscipline(null)
        setChallengeGoal('Dystans (km)')

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
async function handleAddDefaultChallenges(){
        const querySnapshot = await getDocs(
        collection(db, "PersonalChallenges")
    );

    const defaultsExist = querySnapshot.docs.some((doc) =>
        defaultChallenges.some((def) => doc.data().title === def.title)
    );
    if(!defaultsExist){
    for(let i=0;i<defaultChallenges.length;i++){
        try{
            let newDefaultChallenge =              
            {userID:auth.currentUser.uid,
                 endingDate:null,
                 finishDate:null,
                 isOverTime:false,
                 addingDate:new Date(),
                 ...defaultChallenges[i]}
            if(!allChallengesList.includes(newDefaultChallenge)){
                const docRef = await addDoc(collection(db, "PersonalChallenges"),newDefaultChallenge)
            }

        }
        catch(error){
            console.log(error)

        
    }
    }
        FetchPersonalChallengesList();


    }


}
useEffect(() => {
    if (user) {
        handleAddDefaultChallenges();
    }
}, [user]);


function isRepeatingChallenges(startedChallenges, challengeElement){
    let matchedDisciplines=startedChallenges.filter(element=>element.disciplines===challengeElement.disciplines && element.disciplines!==null)
    let matchedType = startedChallenges.filter(element=>element.type===challengeElement.type && element.disciplines!==challengeElement.disciplines && (challengeElement.disciplines===null || element.disciplines===null))
    let nullDisciplines = startedChallenges.filter(element=>element.type===challengeElement.type && element.disciplines===null && challengeElement.disciplines===null)
    return matchedDisciplines.length!==0 || matchedType.length!==0 || nullDisciplines.length!==0? true:false
}

async function handleStartChallenge(element){
    const isRepeating = isRepeatingChallenges(startedChallengesList, element)
    if(!isRepeating){
    try{
        const endDate = new Date()
        endDate.setDate(endDate.getDate()+(element.period))
        let startedChallenge = {status:"started",
             startDate:new Date(),
            endingDate:endDate,
            timeLeft:(endDate- new Date())/ (1000 * 60 * 60 * 24)
        }


        const docRef = doc(db, "PersonalChallenges", element.id)
        await updateDoc(docRef, startedChallenge)
        FetchPersonalChallengesList();


    }    
    catch(error){
        window.alert("spróbuj ponownie")
        console.log(error)
    }

    }
    else{
        window.alert(`Już jedno z twoich zaczętych wyzwań ma cel ${element.type} lub dyscyplinę ${element.disciplines}`)
    }



} 



    return(
        <div className="ChooseChallenge">
            <div className="header">
                <h1>Twoje wyzwania!</h1>
                <button onClick={()=>setToggleAdd(true)}>Dodaj </button>
                <select  className="sortSelect" onChange={event=>handleChallengesSort(newChallengesList, event, setNewChallengesList)}  name="" id="">
                    <option  value="Najwięcej puntków">Najwięcej puntków</option>
                    <option value="Najmniej punktów">Najmniej punktów</option>
                    <option value="Najkrótsze">Najkrótsze</option>
                    <option value="Najdłuższe">Najdłuższe</option>
                </select>
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
            { newChallengesList.length===0?
            <h3>Wygląda na to, że nie masz żadnych wyzwań do dodania. Stwórz jakieś i zdobywaj punkty!</h3>
        :
            newChallengesList.map((element)=>(
                <div className="SingleChallengeContainer">
                    <p>{element.timeLeft}</p>
                    <h3>{element.title}</h3>
                    <h4>{element.description}</h4>
                    <p>Punkty do zdobycia: <strong>{element.points.toFixed(0)}</strong></p>
                    {
                        expandedElement===element &&
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
                    <button onClick={()=>handleStartChallenge(element)}>Dodaj</button>
                    <button onClick={()=>{expandedElement===element?setExpandedElement(null):setExpandedElement(element)} }>{expandedElement===element?"Zwiń":"Rozwiń"}</button>
                    <button onClick={()=>handleChallengeRemove(element.id, setNewChallengesList, newChallengesList)}>Usuń</button>

                    </div>

                </div>
            ))
        }


        </div>

        </div>
    )
}
export default ChallengesList