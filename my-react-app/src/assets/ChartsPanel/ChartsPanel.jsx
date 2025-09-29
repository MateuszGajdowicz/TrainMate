import { useEffect, useState } from 'react';
import ActivityToTimeChart from './ActivityToTimeChart';
import SpiderActivityChart from './SpiderActivityChart';
import BarActivityChart from './BarActivityChart';
import MonthBarChart from './MonthBarChart';
function ChartsPanel({activitesList,trainingOptions}){
        const [displayedChartData, setDisplayedChartData] = useState([]) //moze jeszcze przerzuce do jednego komponentu    
    
        function FormatActivities(activitiesList, activitiesGoal){
        let displayedChartData = activitiesList.map(element=>{
        let finalGoal;
        if(activitiesGoal==="Kalorie"){
            finalGoal = element.estimatedCalories
        }
        if(activitiesGoal==="Ilość treningów"){
            finalGoal=1
        }
        else if(activitiesGoal === "Punkty"){
            finalGoal = element.points
        }
        else{
            if(element.activityGoal===activitiesGoal){
                finalGoal = element.activityGoalValue
            }
            else if(element.activitySecondGoal===activitiesGoal) {
                finalGoal = element.activitySecondGoalValue
            }
        }

        return {date:element.activityDate, value:Number(finalGoal), activityType:element.activityType}

    })
        console.log("tablca:",displayedChartData)

    return displayedChartData

        }


    function getSortedByData(analyzedActivitesList,radioDataValue,standardPeriod,periodStart,periodEnd){
    // let onlyActivitiesNames = activitesList.map(element=>(
    //     element.activityType
    // ))
    let today = new Date();
    let timeFilteredActivities = analyzedActivitesList.filter(element=>{
        if(radioDataValue === 'standard'){
            let daysDiff = (today-new Date(element.activityDate))/(1000 * 60 * 60 * 24)
            switch(standardPeriod){
                case "Wszystkie":
                    return element
                    break;
                case "Ostatni tydzień":
                    return daysDiff<=7 && daysDiff>=0
                    break;
                case "Ostatni miesiąc":
                    return daysDiff<=30 && daysDiff>=0
                    break
                case "Ostatni rok":
                    return daysDiff<=365 && daysDiff>=0
                    break;

            }
        }
        else if(radioDataValue ==='not-standard' && periodStart!==null && periodEnd!==null){
            return new Date(element.activityDate)>=new Date(periodStart) && new Date(element.activityDate)<=new Date(periodEnd)

        }
    })
    return timeFilteredActivities
}
function getUnit(activitiesAnalyzedGoal){
    let unit=''
    switch(activitiesAnalyzedGoal){
        case "Dystans":
            unit= 'km'
            break
        case 'Czas':
            unit= 'min'
            break
        case 'Kalorie':
            unit= 'kcal'
            break
        case 'Punkty':
            unit='pkt' 
            break
        
        }
        return unit

}


    
        return(
        
        <>
        <h1>Analizuj Twoje postępy!</h1>
        <ActivityToTimeChart getUnit={getUnit} getSortedByData={getSortedByData} FormatActivities={FormatActivities} displayedChartData={displayedChartData} setDisplayedChartData={setDisplayedChartData} activitesList={activitesList} trainingOptions={trainingOptions}/>
        
        {/* <SpiderActivityChart getSortedByData={getSortedByData} activitesList={activitesList}/> */}
        <BarActivityChart getUnit={getUnit} FormatActivities={FormatActivities} getSortedByData={getSortedByData} activitesList={activitesList}/>
        <MonthBarChart FormatActivities={FormatActivities} activitesList={activitesList} trainingOptions={trainingOptions}/>
        </>
    )
}
export default ChartsPanel