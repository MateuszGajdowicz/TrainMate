import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { useEffect, useState } from 'react';

import './SpiderActivityChart.css'
function SpiderActivityChart({getSortedByData,activitesList,getDataForSpiderChart}){
        const [radioDataValue, setRadioDataValue] = useState('standard')
        const [standardPeriod, setStandardPeriod] = useState('Wszystkie')
        const [periodEnd, setPeriodEnd] = useState(null)
        const [periodStart, setPeriodStart] = useState(null)
                
        const [chartData, setChartData] = useState([])
        
    const data = [
  { subject: 'Matma', A: 120},
  { subject: 'Fizyka', A: 98 },
  { subject: 'Programowanie', A: 86},
  { subject: 'Mechanika', A: 99},
  { subject: 'Elektronika', A: 85},
  { subject: 'Sen', A: 65},
];

function getDataForSpiderChart(){
    // let onlyActivitiesNames = activitesList.map(element=>(
    //     element.activityType
    // ))
     let  timeFilteredActivities = getSortedByData(activitesList,radioDataValue,standardPeriod,periodStart,periodEnd)     



    let countedActivites = []
    for(let i=0;i<timeFilteredActivities.length;i++){
        if(!countedActivites.some(element=>element.activity===timeFilteredActivities[i].activityType)){
            countedActivites.push({activity:timeFilteredActivities[i].activityType, count:1})
        }
        else{
            let currentActivity = countedActivites.find(element=>element.activity===timeFilteredActivities[i].activityType)
            currentActivity.count++
        }
    }
    console.log(countedActivites)
    return countedActivites


}
useEffect(()=>{
    setChartData(getDataForSpiderChart)
},[radioDataValue, standardPeriod, periodStart, periodEnd])
    return(
        <>
        <div className='AllChartContainer'>
            <div className='ChartSettingContainer'>
                                <h4>Wybierz przedział czasu</h4>
                <div>
                <input value='standard' checked={radioDataValue==='standard'} onChange={event=>setRadioDataValue(event.target.value)} type="radio" id='standard2' name='radio3' />
                <label htmlFor='standard2'>Standardowy przedział</label>


                </div>
                <div>
                <input value='not-standard' checked={radioDataValue==='not-standard'} onChange={event=>setRadioDataValue(event.target.value)} type="radio" id='not-standard2' name='radio3'/>
                <label htmlFor='not-standard2'>Niestandardowy przedział</label>

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
                    <div className="SpiderChartContainer">
            <RadarChart outerRadius={90} width={500} height={400} data={chartData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="activity" />
      <PolarRadiusAxis />
      <Radar 
        name="Student" 
        dataKey="count" 
        stroke="#8884d8" 
        fill="#8884d8" 
        fillOpacity={0.6} 
      />
    </RadarChart>
        </div>


        </div>

        </>
    )
}
export default SpiderActivityChart