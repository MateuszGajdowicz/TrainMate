import { useEffect, useState } from "react";
import SummaryPanel from "./SummaryPanel";
import TodayTrainings from "./TodayTrainings";
import ConfirmPanel from "./ConfiirmPanel";

function MainPanel({activitesList,allChallengesList,trainingsList,fetchTrainingsList}){

const [selectedTraining, setSelectedTraining] = useState(null)
const [isConfirmDisplayed, setIsConfirmDisplayed] = useState(false)



const [randomQuote, setRandomQuote] = useState()
const motivationalQuotes=["Cześć! Gotowy na kolejny trening?","Dawaj, dasz radę!","Nie zatrzymuj się teraz!","Każdy krok przybliża Cię do celu.","Pokaż na co Cię stać!","Jeszcze trochę – możesz to zrobić!","Właśnie teraz budujesz swoją siłę.","Zrób to, nawet jeśli Ci się nie chce.","Tylko Ty możesz to zrobić za siebie.","Dzisiaj jest dzień, w którym wygrywasz.","Nie odpuszczaj – jesteś bliżej niż myślisz.","Ruszaj! Nikt nie zrobi tego za Ciebie.","To Twój moment – wykorzystaj go!","Im trudniej teraz, tym łatwiej później.","Każdy wysiłek ma znaczenie.","Masz w sobie więcej niż myślisz.","Dawaj wszystko, co masz!","Małe zwycięstwa prowadzą do wielkich efektów.","Nie ma wymówek – jest działanie.","Zrób to teraz, później będziesz dumny.","Jeszcze jeden krok, jeszcze jeden ruch.","Każdy trening to inwestycja w lepszego siebie.","Właśnie robisz różnicę.","Twój cel jest bliżej niż myślisz.","Nigdy się nie poddawaj.","Działaj, nawet jeśli jest ciężko.","Twoja przyszłość zaczyna się dzisiaj.","Nie odkładaj – zacznij teraz.","Jesteś silniejszy, niż Ci się wydaje.","Każdy dzień to nowa szansa na progres."]; 

function GetRandomQuote(array){
    let randomIndex = Math.round(Math.random()*array.length)
    setRandomQuote(array[randomIndex])
}
useEffect(()=>{
    GetRandomQuote(motivationalQuotes)
},[])

const [thisMonthActivities, setThisMonthActivities] = useState([])
useEffect(()=>{
    let curentMonth = new Date().getMonth();
    let thisMonthActivities = activitesList.filter(element =>{
        let activityDateMonth = new Date(element.activityDate).getMonth();
        return activityDateMonth===curentMonth

    })
    setThisMonthActivities(thisMonthActivities)

}, [activitesList])


    return(
        <>
        <h1 style={{fontSize:"2.3em",margin:"40px 20px"}}>{randomQuote}</h1>
        <SummaryPanel thisMonthActivities={thisMonthActivities} allChallengesList={allChallengesList}  activitesList={activitesList}/>
        <TodayTrainings setIsConfirmDisplayed={setIsConfirmDisplayed} setSelectedTraining={setSelectedTraining} trainingsList={trainingsList}/>
        {isConfirmDisplayed &&
            <ConfirmPanel fetchTrainingsList={fetchTrainingsList} setSelectedTraining={setSelectedTraining} setIsConfirmDisplayed={setIsConfirmDisplayed} selectedTraining={selectedTraining}/>


        }
        </>
    )
}
export default MainPanel