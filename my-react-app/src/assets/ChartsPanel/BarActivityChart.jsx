import { useEffect, useState } from 'react';
import './BarActivityChart.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";

function BarActivityChart({activitesList, getSortedByData,FormatActivities}){
            const [radioDataValue, setRadioDataValue] = useState('standard')
            const [standardPeriod, setStandardPeriod] = useState('Wszystkie')
            const [periodEnd, setPeriodEnd] = useState(null)
            const [periodStart, setPeriodStart] = useState(null)
            const [activitiesGoal, setActivitiesGoal] = useState("Ilość treningów")

            const [displayedChartData, setDisplayedChartData] = useState([])
            const [unit, setUnit] = useState('')

            function getDataForBarChart(activitesList,activitiesGoal){
                let dataSortedActivities = getSortedByData(activitesList,radioDataValue,standardPeriod,periodStart,periodEnd)
                console.log(dataSortedActivities)

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

               return displayedActivitiesData
            }

            function getUnit(){
                switch(activitiesGoal){
        case "Dystans":
            setUnit('km')
            break
        case 'Czas':
            setUnit('min')
            break
        case 'Kalorie':
            setUnit('kcal')
            break
        case 'Punkty':
            setUnit('pkt')
            break
        case("Ilość treningów"):
            setUnit("Treningi")
        
        }

}


            useEffect(()=>{
                setDisplayedChartData(getDataForBarChart(activitesList,activitiesGoal))
                getUnit();
            },[activitesList,radioDataValue,standardPeriod,periodStart,periodEnd, activitiesGoal])
    return(
        <>
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
        {displayedChartData.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={[
              "#82ca9d",
              "#8884d8",
              "#ffc658",
              "#ff7f50",
              "#00c49f"
            ][index % 5]}
          />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>
            
            }
            

        </div>
        </>
    )


}
export default BarActivityChart