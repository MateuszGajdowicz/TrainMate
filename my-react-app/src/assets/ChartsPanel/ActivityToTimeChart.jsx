import { useEffect, useState } from 'react';
import './ActivityToTimeChart.css'
import Select from 'react-select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ActivityToTimeChart({getUnit,getSortedByData,FormatActivities,setDisplayedChartData,displayedChartData,activitesList,trainingOptions}){
    let trainingOptionsForSelect = trainingOptions.map(element=>({value:element, label:element}))

    const [radioActivityValue, setRadioActivityValue] = useState('all')
    const [radioDataValue, setRadioDataValue] = useState('standard')

    const [chartData, setChartData]= useState([])

    const [selectedActivities, setSelectedActivities] = useState([])
    const [standardPeriod, setStandardPeriod] = useState('Ostatni miesiąc')
    const [periodStart, setPeriodStart] = useState(null)
    const [periodEnd, setPeriodEnd] = useState(null)
    const [activitiesPeriod, setActivitiesPeriod] = useState()
    const [activitiesAnalyzedGoal, setActivitiesAnalyzedGoal] = useState('Dystans')

    const [unit, setUnit] = useState('km')

    const [message, setMessage] = useState('Wygląda na to, że żadne aktywności nie spełniają podanych wymagań')

    const [isChecked, setIsChecked] = useState(false)

    const [summaryInfo, setSummaryInfo] = useState({
        summedDistance:0,
        summedCalories:0,
        summedTime:0,
        averageTime:0,
        LongestActivityTime:0,
        longestActivity:''


    })

    function getChartsStats(sortedActivityList){
        if(sortedActivityList.length!==0){
            let addedDistance = sortedActivityList.reduce((prev, next)=>{
            if(next.activityGoal==="Dystans"){
                return prev+ Number(next.activityGoalValue)
            }
            else if(next.activityGoal==="Czas"){
                return prev+Number(next.activitySecondGoalValue)
            }
        },0)
            
        

        let summedCalories = sortedActivityList.reduce((prev, next)=>prev+Number(next.estimatedCalories),0)


        let summedTime = sortedActivityList.reduce((prev, next)=>{
            if(next.activityGoal==="Czas"){
                return prev + Number(next.activityGoalValue)
            }
            else{
                return prev+Number(next.activitySecondGoalValue)
            }

        },0)

        let longestActivity;
        let LongestActivityTime = 0

        for(let i = 0;i<sortedActivityList.length;i++){
            if(sortedActivityList[i].activityGoal==="Czas"){
                if(sortedActivityList[i].activityGoalValue>LongestActivityTime){
                    longestActivity = sortedActivityList[i]
                    LongestActivityTime=sortedActivityList[i].activityGoalValue
                }
                
            }
             else{
                if(sortedActivityList[i].activitySecondGoalValue>LongestActivityTime){
                        longestActivity = sortedActivityList[i]
                        LongestActivityTime = sortedActivityList[i].activitySecondGoalValue
                    }
                }

        }

        let averageTime = summedTime/sortedActivityList.length
            setSummaryInfo({summedDistance:addedDistance,
                        summedCalories:summedCalories,
                        summedTime:summedTime,
                        averageTime:averageTime,
                        longestActivity:longestActivity,
                        LongestActivityTime:LongestActivityTime
        })
    }




    }


useEffect(()=>{
    console.log(standardPeriod)
}, [standardPeriod])




useEffect(() => {
    let analyzedActivitiesGoalValues = activitesList.sort((a,b)=>new Date(a.activityDate)-new Date(b.activityDate));

    if (radioActivityValue === 'one') {
        analyzedActivitiesGoalValues = activitesList.filter(element =>
            selectedActivities.some(activity => activity.value === element.activityType)
        );
    }





    analyzedActivitiesGoalValues = getSortedByData(analyzedActivitiesGoalValues,radioDataValue,standardPeriod,periodStart,periodEnd)


        console.log("loool"  +analyzedActivitiesGoalValues)

    getChartsStats(analyzedActivitiesGoalValues)
    // console.log(analyzedActivitiesGoalValues);

    let displayedChartData = FormatActivities(analyzedActivitiesGoalValues, activitiesAnalyzedGoal)

    console.log('gowno',displayedChartData)

    if(isChecked){
    let finalScaledChartData = []

    for(let i=0;i<displayedChartData.length;i++){
        if(displayedChartData[i].date !== displayedChartData[i+1]?.date){
            finalScaledChartData.push(displayedChartData[i])

            
        }
        else{
            let sumValue = Number(displayedChartData[i].value)
            let date = displayedChartData[i].date


            while(date===displayedChartData[i+1]?.date){
                sumValue+=Number(displayedChartData[i+1]?.value)    
                i++
            }
            let singleTemporaryChartData = {date:displayedChartData[i].date, value:sumValue}
            finalScaledChartData.push(singleTemporaryChartData)

    }



    }
        console.log({finalScaledChartData})
    setDisplayedChartData([finalScaledChartData])
}
    else{
    let groupedByType = {}

    for(let i=0; i<displayedChartData.length; i++){
        if(!groupedByType[displayedChartData[i].activityType]){
            groupedByType[displayedChartData[i].activityType]=[]
        }
        groupedByType[displayedChartData[i].activityType].push(displayedChartData[i])

    }
    console.log('wrrr',groupedByType)

    let finalGroupedByType =[]

for (let type in groupedByType) {
    let currentArray = groupedByType[type];
        let temporaryTypeArray = []
        for(let j =0;j<currentArray.length;j++){
            if(currentArray[j].date!==currentArray[j+1]?.date){
                temporaryTypeArray.push(currentArray[j])
            }
            else{
                let sumValue = Number(currentArray[j].value)
                let date = currentArray[j].date
                while(date===currentArray[j+1]?.date){
                    sumValue+=Number(currentArray[j+1]?.value)
                    j++
                }
                let singleTemporaryInfo = {date:currentArray[j].date, value:sumValue, activityType:currentArray[j].activityType}
                temporaryTypeArray.push(singleTemporaryInfo)
                

            }

        }
        finalGroupedByType.push(temporaryTypeArray)


    }
    console.log(finalGroupedByType)
    setDisplayedChartData(finalGroupedByType)

    }
    
    


    setUnit(getUnit(activitiesAnalyzedGoal));

    
}, [isChecked,selectedActivities, radioActivityValue, activitesList,activitiesAnalyzedGoal,periodStart,periodEnd, standardPeriod ]);

    return(
        <>
        <div className="ChartContainer">
            <div className='chartSettings'>
                <h2>Twoja aktywność w czasie</h2>
                <h4>Wybierz analizowane aktywności</h4>
                <div>
                <input value='all' checked={radioActivityValue==='all'} onChange={event=>setRadioActivityValue(event.target.value)} type="radio" id='all' name='radio' />
                <label htmlFor='all'>Wszystkie aktywności</label>


                </div>
                <div>
                <input value='one' checked={radioActivityValue==='one'} onChange={event=>setRadioActivityValue(event.target.value)} type="radio" id='one' name='radio'/>
                <label htmlFor='one'>Poszczególne aktywności</label>

                </div>

                {
                    radioActivityValue==="one" &&     
                <Select value={selectedActivities} onChange={setSelectedActivities} classNamePrefix='rs' isMulti options={trainingOptionsForSelect} type="text" placeholder='Wybierz analizowane aktywności'/>


                }
                <h4>Wybierz analizowaną jednostkę</h4>
                <select className='Inputs' style={{width:"40%"}}  onChange={event=>setActivitiesAnalyzedGoal(event.target.value)} name="" id="">
                    {/* <option value="Wszystkie">Wszystkie</option> */}
                    <option selected value="Dystans">Dystans</option>
                    <option value="Czas">Czas</option>
                    <option value="Kalorie">Kalorie</option>
                    <option value="Punkty">Punkty</option>
                </select>
                <h4>Wybierz przedział czasu</h4>
                <div>
                <input value='standard' checked={radioDataValue==='standard'} onChange={event=>setRadioDataValue(event.target.value)} type="radio" id='standard' name='radio2' />
                <label htmlFor='standard'>Standardowy przedział</label>


                </div>
                <div>
                <input value='not-standard' checked={radioDataValue==='not-standard'} onChange={event=>setRadioDataValue(event.target.value)} type="radio" id='not-standard' name='radio2'/>
                <label htmlFor='not-standard'>Niestandardowy przedział</label>

                </div>

                {
                    radioDataValue==="standard" ?     
                    <select className='Inputs' onChange = {(event)=>setStandardPeriod(event.target.value)}>
                        <option value="Wszystkie">Wszystkie</option>
                        <option value="Ostatni tydzień">Ostatni tydzień</option>
                        <option selected value="Ostatni miesiąc">Ostatni miesiąc</option>
                        <option value="Ostatni rok">Ostatni rok</option>

                    </select>:
                    <div>
                        <h4>Wybierz datę początkową</h4>
                        <input className='Inputs' onChange={event=>setPeriodStart(event.target.value)} type="date" />
                        <h4>Wybierz datę końcową</h4>
                        <input className='Inputs' onChange={event=>setPeriodEnd(event.target.value)} type="date" />
                    </div>


                }
                <div style={{marginTop:"20px"}}>
                <input checked={isChecked} type="checkbox" id='check' onChange={event=>setIsChecked(event.target.checked)}/>
                <label htmlFor="check">Scal wszystkie aktywności</label>

                </div>



            


            </div>
    <div className='LineChartContainer'> 
        {displayedChartData.length!==0?
          <ResponsiveContainer width="100%" >

            {
                isChecked?
                  <LineChart data={displayedChartData[0]} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis label={{ value: unit, angle: -90, position: "insideLeft", dx:-3}}/>
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={5} activeDot={{ r: 8 }} />
  </LineChart>
  :
      <LineChart
      data={
    [...new Set(displayedChartData.flat().map(item => item.date))]
      .sort()
      .map(date => {
        const point = { date };
        displayedChartData.forEach(activityArray => {
          const found = activityArray.find(item => item.date === date);
          point[activityArray[0]?.activityType] = found ? found.value : 0;
        });
        return point;
      })
  }
      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis 
  label={{ value: unit, angle: -90, position: "insideLeft", dx:-3}}/>
      <Tooltip />
      <Legend />
      {displayedChartData.map((activityArray, idx) => (
        <Line
          key={idx}
          type="monotone"
          dataKey={activityArray[0]?.activityType || "Wszystkie"}
          stroke={['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE'][idx % 5]}
          strokeWidth={5}
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>

                
            }

  </ResponsiveContainer>
  :
  <h1 className='message'>{message}</h1>
        }



            </div>
        </div>
        <div className='StatsContainer'>
            {displayedChartData.length===0?
            (<h2>Aby zobaczyć statystyki wybierz okres, w którym wykonałeś jakieś aktywności</h2>)
        :
        (<>
            <h1>W podanym okresie:</h1>
            <h3>Pokonałeś dystans {summaryInfo.summedDistance} km</h3>
            <h3>Spaliłeś {summaryInfo.summedCalories} kcal</h3>
            <h3>Ćwiczyłeś przez {summaryInfo.summedTime} min</h3>
            <h3>Średnio twój trening trwał {summaryInfo.averageTime.toFixed(2,0)} min</h3>
            <h3>Twój najdłuższy trening to {summaryInfo.longestActivity.activityType} - {summaryInfo.LongestActivityTime} min - {summaryInfo.longestActivity.activityDate} </h3>

        
        </>)}

        </div>

        </>
    )
}
export default ActivityToTimeChart
