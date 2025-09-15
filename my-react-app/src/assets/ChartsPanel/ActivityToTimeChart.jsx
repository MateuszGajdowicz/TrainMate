import { useEffect, useState } from 'react';
import './ActivityToTimeChart.css'
import Select from 'react-select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ActivityToTimeChart({activitesList,trainingOptions}){
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

    const [displayedChartData, setDisplayedChartData] = useState([])

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


    console.log("loool"  +analyzedActivitiesGoalValues)
    // if(activitiesAnalyzedGoal!=="Wszystkie" && activitiesAnalyzedGoal!=="Kalorie"){
    //     analyzedActivitiesGoalValues = analyzedActivitiesGoalValues.filter(element=>
    //         (element.activityGoal===activitiesAnalyzedGoal || element.activitySecondGoal===activitiesAnalyzedGoal))

    // }
    let today = new Date();
    if(radioDataValue === 'standard'){
        analyzedActivitiesGoalValues = analyzedActivitiesGoalValues.filter(element=>{
            let daysDiff = (today-new Date(element.activityDate))/(1000 * 60 * 60 * 24)

            switch(standardPeriod){
                case 'Ostatni tydzień':
                    return daysDiff<=7 && daysDiff>=0
                    break;
                case 'Ostatni miesiąc':
                    return daysDiff<=30 && daysDiff>=0
                    break;
                case 'Ostatni rok':
                    return daysDiff<=365 && daysDiff>=0
                    break;
            }

        })
    }
    else if(radioDataValue==='not-standard' && periodStart!==null && periodEnd!==null){
        analyzedActivitiesGoalValues = analyzedActivitiesGoalValues.filter(element=>new Date(element.activityDate)>=new Date(periodStart)&&new Date(element.activityDate)<=new Date(periodEnd))
    }


    // console.log(analyzedActivitiesGoalValues);

    let displayedChartData = analyzedActivitiesGoalValues.map(element=>{
        let finalGoal;
        if(activitiesAnalyzedGoal==="Kalorie"){
            finalGoal = element.estimatedCalories
        }
        else if(activitiesAnalyzedGoal === "Punkty"){
            finalGoal = element.points
        }
        else{
            if(element.activityGoal===activitiesAnalyzedGoal){
                finalGoal = element.activityGoalValue
            }
            else if(element.activitySecondGoal===activitiesAnalyzedGoal) {
                finalGoal = element.activitySecondGoalValue
            }
        }

        return {date:element.activityDate, value:Number(finalGoal), activityType:element.activityType}

    })

    console.log("tablca:",displayedChartData)

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
//     let finalDisplayedChartData = []

//     for(let i=0;i<displayedChartData.length;i++){
//         if(displayedChartData[i].date !== displayedChartData[i+1]?.date){
//             finalDisplayedChartData.push(displayedChartData[i])

            
//         }
//         else{
//             let sumValue = Number(displayedChartData[i].value)
//             let date = displayedChartData[i].date


//             while(date===displayedChartData[i+1]?.date){
//                 sumValue+=Number(displayedChartData[i+1]?.value)    
//                 i++
//             }
//             let singleTemporaryChartData = {date:displayedChartData[i].date, value:sumValue}
//             finalDisplayedChartData.push(singleTemporaryChartData)

//     }
//     console.log(finalDisplayedChartData)
//     setDisplayedChartData(finalDisplayedChartData)
// }
}, [selectedActivities, radioActivityValue, activitesList,activitiesAnalyzedGoal,periodStart,periodEnd, standardPeriod ]);

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
                <select onChange={event=>setActivitiesAnalyzedGoal(event.target.value)} name="" id="">
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
                    <select onChange = {(event)=>setStandardPeriod(event.target.value)}>
                        <option value="Ostatni tydzień">Ostatni tydzień</option>
                        <option selected value="Ostatni miesiąc">Ostatni miesiąc</option>
                        <option value="Ostatni rok">Ostatni rok</option>

                    </select>:
                    <div>
                        <p>Wybierz datę początkową</p>
                        <input onChange={event=>setPeriodStart(event.target.value)} type="date" />
                        <p>Wybierz datę końcową</p>
                        <input onChange={event=>setPeriodEnd(event.target.value)} type="date" />
                    </div>


                }


            


            </div>
    <div className='LineChartContainer'> 
        {displayedChartData.length > 0 && (
  <ResponsiveContainer width="100%" >
    <LineChart
      data={
    [...new Set(displayedChartData.flat().map(item => item.date))]
      .sort()
      .map(date => {
        const point = { date };
        displayedChartData.forEach(activityArray => {
          const found = activityArray.find(item => item.date === date);
          point[activityArray[0].activityType] = found ? found.value : 0;
        });
        return point;
      })
  }
      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      {displayedChartData.map((activityArray, idx) => (
        <Line
          key={idx}
          type="monotone"
          dataKey={activityArray[0]?.activityType}
          stroke={['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE'][idx % 5]}
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
)}

            </div>
        </div>

        </>
    )
}
export default ActivityToTimeChart
