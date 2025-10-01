import { useEffect, useState } from 'react';
import Select from 'react-select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

import './MonthBarChart.css'
function MonthBarChart({trainingOptions,activitesList,FormatActivities,getUnit}){
let trainingOptionsForSelect = trainingOptions.map(element=>({value:element, label:element}))
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const months = [
  { id: 1, name: "Styczeń" },
  { id: 2, name: "Luty" },
  { id: 3, name: "Marzec" },
  { id: 4, name: "Kwiecień" },
  { id: 5, name: "Maj" },
  { id: 6, name: "Czerwiec" },
  { id: 7, name: "Lipiec" },
  { id: 8, name: "Sierpień" },
  { id: 9, name: "Wrzesień" },
  { id: 10, name: "Październik" },
  { id: 11, name: "Listopad" },
  { id: 12, name: "Grudzień" }
];

            const [statsInfo, setStatsInfo] = useState({
              biggestMonth:'',
              biggestValue:0,
              lowestMonth:'',
              lowestvalue:0,
            })


        const [radioActivityValue, setRadioActivityValue] = useState('all')
        const [selectedActivities, setSelectedActivities] = useState([])
        const [activitiesAnalyzedGoal, setActivitiesAnalyzedGoal] = useState('Dystans')

        const [displayedChartData, setDisplayedChartData] = useState(activitesList)

        const [firstMonthSelect, setFirstMonthSelect] = useState(null)
        const [secondMonthSelect, setSecondMonthSelect] = useState(null)
        const [monthDiff, setMonthDiff] = useState(0)
        const [change, setChange] = useState('Progres')
        const [isWarningDisplayed, setIsWarningDisplayed] = useState(false)
        const [unit, setUnit] = useState('')

        const [selectedMonth, setSelectedMonth] = useState('Styczeń')

        function getBarChartStats(sortedList){
  let biggestMonth;
  let biggestValue=0;
  let lowestMonth;
  let lowestvalue = Infinity
  for(let i = 0; i<sortedList.length;i++){
    if(sortedList[i].value>biggestValue){
      biggestMonth = sortedList[i].month
      biggestValue = sortedList[i].value
    }
    if(sortedList[i].value<lowestvalue){
      lowestMonth=sortedList[i].month
      lowestvalue = sortedList[i].value 
    }

  }
  setStatsInfo({
    biggestMonth:biggestMonth,
    biggestValue:biggestValue,
    lowestMonth:lowestMonth,
    lowestvalue:lowestvalue

  })

}

    function handleActivitiesByMonths(activitesList, activitiesGoal){
        let typeFilteredActivities= activitesList
        if(radioActivityValue==='one'){
        typeFilteredActivities = activitesList.filter(element=>
            selectedActivities.some(activity=>activity.value===element.activityType)
        )

        }

        let formatedActivities = FormatActivities(typeFilteredActivities,activitiesGoal)
        let finalArray=[]
        for(let i =0;i<months.length;i++){
            let monthObject = {id:i,month:months[i].name, value:0}
            for(let j=0;j<formatedActivities.length;j++){
                if(new Date(formatedActivities[j].date).getMonth()+1===months[i].id){
                    monthObject.value+=formatedActivities[j].value
                }
            }
            finalArray.push(monthObject)

        }
        getBarChartStats(finalArray)
        console.log(finalArray)
        return finalArray


    }

    useEffect(()=>{
      setUnit(getUnit(activitiesAnalyzedGoal))
        setDisplayedChartData(handleActivitiesByMonths(activitesList, activitiesAnalyzedGoal))
    }, [activitiesAnalyzedGoal, radioActivityValue, selectedActivities, activitesList])

    function CompareMonths(){
      if(firstMonthSelect && secondMonthSelect){
        let FirstMonthInfo = displayedChartData.find(element=>element.month===firstMonthSelect)
        let SecondMonthInfo = displayedChartData.find(element=>element.month===secondMonthSelect)

        let diff = SecondMonthInfo.value-FirstMonthInfo.value
        let percentageDiff = diff/FirstMonthInfo.value *100
        let displayedPercentage = Math.abs(percentageDiff).toFixed(0)
        if(SecondMonthInfo.id>FirstMonthInfo.id){
          setIsWarningDisplayed(false)
        if(FirstMonthInfo.value===0){
          if(SecondMonthInfo.value===0){
            setMonthDiff(0)
          }
          else{
              setMonthDiff(100)


          }
        }
        else{
          setMonthDiff(displayedPercentage)


        }
        if(percentageDiff>0){
          setChange("Progres")
        }
        else if(percentageDiff<0){
          setChange("Regres")
        }

        }
        else{
          setIsWarningDisplayed(true)

        }
        


      }
    }

    useEffect(()=>{
      CompareMonths();
    },[firstMonthSelect, secondMonthSelect, activitiesAnalyzedGoal, selectedActivities,activitesList])

    function analyzeSelectedMonth(selectedMonth){
      let selectedMonthInfo = months.find(element=>element.name===selectedMonth)
      let monthFilteredActivities = activitesList.filter(element=>new Date(element.activityDate).getMonth()+1===selectedMonthInfo.id)

      console.log(monthFilteredActivities)

      let formatedActivities = FormatActivities(monthFilteredActivities, activitiesAnalyzedGoal)

      let sortedActivities = []
      for(let i=0;i<formatedActivities.length;i++){
        if(!sortedActivities?.some(element=>element.activityType===formatedActivities[i].activityType)){
          sortedActivities?.push({activityType:formatedActivities[i].activityType, count:1, value:formatedActivities[i].value})
        }
        else{
          let currentActivity = sortedActivities?.find(element=>element.activityType===monthFilteredActivities[i].activityType)
          currentActivity.count++
          currentActivity.value+=Number(formatedActivities[i].value)
        }

      }
      console.log(sortedActivities)

    }
    useEffect(()=>{
      analyzeSelectedMonth(selectedMonth)
    },[selectedMonth, activitiesAnalyzedGoal])
    
    return(
        <>
        <div className='BarChartContainer' style={{marginBottom:'0px'}}>
            <div className='ChartSettingContainer'>
                <h2>Twoja aktywność <br /> w ostatnich miesiącach</h2>
                <h4>Wybierz analizowane aktywności:</h4>
                <div>
                <input value='all' checked={radioActivityValue==='all'} onChange={event=>setRadioActivityValue(event.target.value)} type="radio" id='all6' name='radio6' />
                <label htmlFor='all6'>Wszystkie aktywności</label>


                </div>
                <div>
                <input value='one' checked={radioActivityValue==='one'} onChange={event=>setRadioActivityValue(event.target.value)} type="radio" id='one6' name='radio6'/>
                <label htmlFor='one6'>Poszczególne aktywności</label>

                </div>
                {
                    radioActivityValue==='one' &&
                                    <Select value={selectedActivities} onChange={setSelectedActivities} classNamePrefix='rs' isMulti options={trainingOptionsForSelect} type="text" placeholder='Wybierz analizowane aktywności'/>


                }
                <h4>Wybierz analizowaną jednostkę</h4>
                <select  className='Inputs' style={{width:"40%"}}  onChange={event=>setActivitiesAnalyzedGoal(event.target.value)} name="" id="">
                    {/* <option value="Wszystkie">Wszystkie</option> */}
                    <option selected value="Dystans">Dystans</option>
                    <option value="Czas">Czas</option>
                    <option value="Kalorie">Kalorie</option>
                    <option value="Punkty">Punkty</option>
                </select>

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
                    
                    dataKey="month"
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
                        onClick={()=>setSelectedMonth(element.month)}
               
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ width: "50%", height: '100%' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={displayedChartData?.filter(element=>element.value!==0)}
            dataKey="value"     
            nameKey="month"      
            cx="50%"            
            cy="50%"            
            outerRadius={120}   
                           
          >
            {displayedChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
            </>
}

        </div>
        <div className='MonthStatsContainer'>
          <div className='CompareDiv'> 
                      <h1>Zmierz swój progres!</h1>

                  <h3>Porównaj wybrane miesiące</h3>
          <div className='selectDiv'>
            <p>Od</p>

              <select value={firstMonthSelect || ''} onChange={event=>setFirstMonthSelect(event.target.value)} className='Inputs' name="" id="">
            {months.map(element=>(
              <option value={element.name}>{element.name}</option>

            ))}
          </select>

          </div>

          <div className='selectDiv'>
          <p>Do</p>
          <select value={secondMonthSelect || ''} onChange={event=>setSecondMonthSelect(event.target.value)} className='Inputs' name="" id="">
            {months.map(element=>(
              <option value={element.name}>{element.name}</option>

            ))}
          </select>

            
          </div>
            {isWarningDisplayed? "Podaj poprawną kolejność miesięcy":
                        <h1>{change} o {monthDiff} %</h1>

 }

          </div>
          <div className='biggestDiv'>
            <h1>Najlepszy miesiąc:</h1>
            <h2>{statsInfo.biggestMonth} - {statsInfo.biggestValue} {unit}</h2>
            <h1>Najgorszy miesiąc</h1>
            <h2>{statsInfo.lowestMonth} - {statsInfo.lowestvalue} {unit}</h2>
          </div>
          <div className='singleMonthContainer'>
            <h2>Kliknij na wykresie, by wybrać miesiąc</h2>
            <h2>Najchętniej wybierany przez ciebie sport sport:</h2>
            <h2>Najrzadziej wybierany przez ciebie sport:</h2>

          </div>


        </div>

        </>
    )
}
export default MonthBarChart