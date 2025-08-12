import { useEffect, useState } from 'react'
import './SummaryPanel.css'
function SummaryPanel({thisMonthActivities,activitesList, allChallengesList}){
    const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];


let currentMonth = new Date().getMonth()
let currentDay = new Date().getDate()
const [summaryInfo, setSummaryInfo] = useState({
  activitiesCount: 0,
  caloriesBurnt: 0,
  timeSpent: 0,
  totalDistance: 0,
  MaxActivity: '',
  finishedChallenges: 0,
  averageTime:0
});
function CalculateActivitiesSummary(){
    let activitiesCount = thisMonthActivities.length;
        let caloriesBurnt = thisMonthActivities.reduce((prev, next)=>prev+Number(next.estimatedCalories), 0)
        let timeSpent = thisMonthActivities.reduce((prev, next)=>{
            if(next.activityGoal==='Czas'){
                 return prev+Number(next.activityGoalValue)

            }
            else{
                return prev+Number(next.activitySecondGoalValue)
            }
        }, 0)
        let totalDistance = thisMonthActivities.reduce((prev, next)=>{
            if(next.activityGoal==="Dystans"){
                return prev+Number(next.activityGoalValue)
            }
            else if(next.activityGoal ==="Czas"){
                return prev+Number(next.activitySecondGoalValue)

            }
            else if(next.activityGoal==="Kalorie")
                return prev
        }, 0)
        let favouriteActivityCount= thisMonthActivities.reduce((prev, next)=>{
            prev[next.activityType] = (prev[next.activityType] || 0)+1;
            return prev
        }, {})

        let FavouriteActivityList = Object.entries(favouriteActivityCount).map(([title, value])=>(
            {
                Title:title,
                Value:Number(value)

            }   
            ))
        console.log(FavouriteActivityList)
        let MaxValue = 0;
        let MaxActivity;
        for(let i= 0;i<FavouriteActivityList.length;i++){
            if(FavouriteActivityList[i].Value>MaxValue){
                MaxValue = FavouriteActivityList[i].Value
                MaxActivity = FavouriteActivityList[i].Title
            }

        }
        console.log(MaxActivity)

        let finishedChallenges = allChallengesList.filter(element=>element.status==="finished" && element.finishDate.toDate().getMonth()===currentMonth).length

        let averageTime = timeSpent/Number(currentDay)

        setSummaryInfo({
            activitiesCount:activitiesCount,
            caloriesBurnt:caloriesBurnt,
            timeSpent:timeSpent,
            totalDistance:totalDistance,
            MaxActivity:MaxActivity,
            finishedChallenges:finishedChallenges,
            averageTime:averageTime,
        })
    }

    useEffect(()=>{
        CalculateActivitiesSummary();
        console.log(summaryInfo)
 

    }, [thisMonthActivities,allChallengesList, activitesList]
    )

    return(
        <div className='SummaryPanelContainer'>
            <h2>Podsumowanie miesiąca : {months[currentMonth]}</h2>
            <p>Liczba treningów w tym miesiącu: <strong>{summaryInfo.activitiesCount}</strong></p>
            <p>Spalone kalorie: <strong>{summaryInfo.caloriesBurnt} kcal</strong></p>
            <p>To aż <strong>{(summaryInfo.caloriesBurnt/7200).toFixed(2)}</strong> spalonych kilogramów</p>
            <p>Czas spędzony na treningach: <strong>{summaryInfo.timeSpent} min</strong></p>
            <p>Średni czas na treningach: <strong>{summaryInfo.averageTime.toFixed(2)} min</strong></p>
            <p>Pokonany dystans: <strong>{summaryInfo.totalDistance} km</strong></p>
            <p>Najczęściej wykonywana aktywność: <strong>{summaryInfo.MaxActivity}</strong></p>
            <p>Ukończone wyzwania w tym miesiącu: <strong>{summaryInfo.finishedChallenges}</strong></p>
            <div className='bottomContainer'>
                            <h2>Tak trzymaj!</h2>
                            <button>Udostępnij</button>


            </div>


        </div>
    )
}
export default SummaryPanel