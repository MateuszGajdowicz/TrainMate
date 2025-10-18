import { useEffect, useState } from 'react';
import './BarActivityChart.css'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";

function BarActivityChart({getUnit,activitesList, getSortedByData,FormatActivities}){
            const [radioDataValue, setRadioDataValue] = useState('standard')
            const [standardPeriod, setStandardPeriod] = useState('Wszystkie')
            const [periodEnd, setPeriodEnd] = useState(null)
            const [periodStart, setPeriodStart] = useState(null)
            const [activitiesGoal, setActivitiesGoal] = useState("Ilość treningów")

            const [displayedChartData, setDisplayedChartData] = useState([])
            const [unit, setUnit] = useState('')
            const [analyzedSportArray, setAnalyzedSportArray] = useState([])
            const [notAnalyzedSportArray, setNotAnalyzedSportArray] = useState([])

            const [finalAnalyzedSport, setFinalAnalyzedSport] = useState(null)

            const [statsInfo, setStatsInfo] = useState({
              biggestActivity:'',
              biggestValue:0,
              lowestActivity:'',
              lowestvalue:0,
            })

            const [analyzedSport, setAnalyzedSport] = useState(null)

            function getDataForBarChart(activitesList,activitiesGoal){
                let dataSortedActivities = getSortedByData(activitesList,radioDataValue,standardPeriod,periodStart,periodEnd)
                console.log(dataSortedActivities)

                const analyzedSportActivities = dataSortedActivities.filter(element=>element.activityType===analyzedSport)
                setAnalyzedSportArray(analyzedSportActivities)

                const notAnalyzedSportActivities = dataSortedActivities.filter(element=>element.activityType!==analyzedSport)
                setNotAnalyzedSportArray(notAnalyzedSportActivities)
                

               let formatedActivitiesData =FormatActivities(dataSortedActivities,activitiesGoal)

               console.log(formatedActivitiesData)


                let displayedActivitiesData = []
               for(let i=0;i<formatedActivitiesData.length;i++){
                if(!displayedActivitiesData.some(element=>element.activityType===formatedActivitiesData[i].activityType)){
                    displayedActivitiesData.push({activityType:formatedActivitiesData[i].activityType, value:formatedActivitiesData[i].value})

                }
                else{
                    let currentActivity = displayedActivitiesData.find(element=>element.activityType=== formatedActivitiesData[i].activityType)
                    currentActivity.value+=Number(formatedActivitiesData[i].value)

                }

               }
                              console.log(displayedActivitiesData)

              getBarChartStats(displayedActivitiesData)

               return displayedActivitiesData
            }

          

function getBarChartStats(sortedList){
  let biggestActivity;
  let biggestValue=0;
  let lowestActivity;
  let lowestvalue = Infinity
  for(let i = 0; i<sortedList.length;i++){
    if(sortedList[i].value>biggestValue){
      biggestActivity = sortedList[i].activityType
      biggestValue = sortedList[i].value
    }
    if(sortedList[i].value<lowestvalue){
      lowestActivity=sortedList[i].activityType
      lowestvalue = sortedList[i].value 
    }

  }
  setStatsInfo({
    biggestActivity:biggestActivity,
    biggestValue:biggestValue,
    lowestActivity:lowestActivity,
    lowestvalue:lowestvalue

  })

}


            useEffect(()=>{
                setDisplayedChartData(getDataForBarChart(activitesList,activitiesGoal))
                setUnit(getUnit(activitiesGoal))
            },[activitesList,radioDataValue,standardPeriod,periodStart,periodEnd, activitiesGoal, analyzedSport])

useEffect(()=>{
  const analyzed = displayedChartData.find(element=>element.activityType===analyzedSport)
  setFinalAnalyzedSport(analyzed)
  
},[displayedChartData, analyzedSport])

    return(
        <>
        <div className='BarStatsContainer'>
          <div>
                      <h1>Analiza dla aktywności:</h1>
          <h2>{finalAnalyzedSport? finalAnalyzedSport.activityType: 'Dotknij aby wybrać konkretny sport'}</h2>
          {
            finalAnalyzedSport && 
            <>
                    <h3>Łącznie - {finalAnalyzedSport?.value} {unit}</h3>
                      <h3>{finalAnalyzedSport?.activityType} to {(analyzedSportArray.length *100/(notAnalyzedSportArray.length+analyzedSportArray.length)).toFixed(1,0)} % wszystkich treningów</h3>

            </>
              
          }
          {activitiesGoal!=="Ilość treningów" &&
          <>
          <h3>Liczba treningów - {analyzedSportArray.length}</h3>
          <h3>Średnio na trening  - {finalAnalyzedSport?.value/analyzedSportArray.length} {unit}  </h3>

          </>
          
          }




          

          </div>
          <div>
                      <h1>Najwięcej: </h1>
                      {
                        displayedChartData.length===0?
                        <h2>Brak danych</h2>
                        :
                      <h2>{statsInfo.biggestActivity} - {statsInfo.biggestValue} {unit}</h2>

                      }
          <h1>Najmniej: </h1>
          {
            displayedChartData.length===0?
            <h2>Brak danych</h2>
            :
            <h2>{statsInfo.lowestActivity} - {statsInfo.lowestvalue} {unit}</h2>

          }

          </div>


        </div>
        <div className="BarChartContainer"> 
            <div className="ChartSettingContainer">
                <h2>Wyniki dla aktywności</h2>
                <h4>Wybierz analizowaną jednostkę</h4>
                <select className='Inputs' name="" id="" onChange={event=>setActivitiesGoal(event.target.value)}>
                    <option value="Ilość treningów">Ilość treningów</option>
                    <option value="Dystans">Dystans</option>
                    <option value="Czas">Czas</option>
                    <option value="Kalorie">Kalorie</option>
                    <option value="Punkty">Punkty</option>
                </select>

                                <h4>Wybierz przedział czasu</h4>
                <div>
                <input value='standard' checked={radioDataValue==='standard'} onChange={event=>setRadioDataValue(event.target.value)} type="radio" id='standard3' name='radio4' />
                <label htmlFor='standard3'>Standardowy przedział</label>


                </div>
                <div>
                <input value='not-standard' checked={radioDataValue==='not-standard'} onChange={event=>setRadioDataValue(event.target.value)} type="radio" id='not-standard3' name='radio4'/>
                <label htmlFor='not-standard3'>Niestandardowy przedział</label>

                </div>

                {
                    radioDataValue==="standard" ?     
                    <select className='Inputs' onChange = {(event)=>setStandardPeriod(event.target.value)}>
                        <option selected value="Wszystkie">Wszystkie</option>
                        <option value="Ostatni tydzień">Ostatni tydzień</option>
                        <option  value="Ostatni miesiąc">Ostatni miesiąc</option>
                        <option value="Ostatni rok">Ostatni rok</option>

                    </select>:
                    <div>
                        <h4>Wybierz datę początkową</h4>
                        <input className='Inputs' onChange={event=>setPeriodStart(event.target.value)} type="date" />
                        <h4>Wybierz datę końcową</h4>
                        <input className='Inputs' onChange={event=>setPeriodEnd(event.target.value)} type="date" />
                    </div>


                }
            </div>
            {displayedChartData.length===0?
            <h1 className='message'>Wygląda na to, że żadne aktywności nie spełniają podanych wymagań</h1>
            :
            <>
            <div className="BarChartContainer2">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
      data={displayedChartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        label={{
          value: unit,
          angle: -90,
          position: "insideLeft",
          dx: -80,
          dy: -160
        }}
        dataKey="activityType"
      />
      <YAxis />
      <Tooltip />
      <Legend />

      <Bar dataKey="value" radius={[10, 10, 0, 0]}>
        {displayedChartData.map((element, index) => (
          <Cell 
            key={`cell-${index}`}
            fill={[
              "#82ca9d",
              "#8884d8",
              "#ffc658",
              "#ff7f50",
              "#00c49f"
            ][index % 5]}
            onClick={()=>setAnalyzedSport(element.activityType)}
          />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>
            <div className="SpiderChartContainer">
            <RadarChart outerRadius={110} width={420} height={400} data={displayedChartData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="activityType" />
      <PolarRadiusAxis />
      <Radar 
        name="Student" 
        dataKey="value" 
        stroke="hsl(28, 100%, 60%)" 
        fill="orange" 
        fillOpacity={0.6} 
      />
    </RadarChart>
        </div>
            
            </>
            
            
            }
            

        </div>
        </>
    )


}
export default BarActivityChart