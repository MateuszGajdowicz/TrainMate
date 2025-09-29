import { useEffect, useState } from 'react';
import Select from 'react-select';

import './MonthBarChart'
function MonthBarChart({trainingOptions,activitesList,FormatActivities}){
let trainingOptionsForSelect = trainingOptions.map(element=>({value:element, label:element}))

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


        const [radioActivityValue, setRadioActivityValue] = useState('all')
        const [selectedActivities, setSelectedActivities] = useState([])
        const [activitiesAnalyzedGoal, setActivitiesAnalyzedGoal] = useState('Dystans')

    function handleActivitiesByMonths(activitesList, activitiesGoal){
        let formatedActivities = FormatActivities(activitesList,activitiesGoal)
        let finalArray=[]
        for(let i =0;i<months.length;i++){
            let monthArray = []
            for(let j=0;j<formatedActivities.length;j++){
                if(new Date(formatedActivities[j].date).getMonth()+1===months[i].id){
                    monthArray.push({month:months[i].name,activityType:formatedActivities[j].activityType, value:formatedActivities[j].value})
                }
            }
            finalArray.push(monthArray)

        }
        console.log(finalArray)


    }

    useEffect(()=>{
        handleActivitiesByMonths(activitesList, activitiesAnalyzedGoal)
    }, [activitiesAnalyzedGoal])
    
    return(
        <>
        <div className='AllChartContainer'>
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
                <select className='Inputs' style={{width:"40%"}}  onChange={event=>setActivitiesAnalyzedGoal(event.target.value)} name="" id="">
                    {/* <option value="Wszystkie">Wszystkie</option> */}
                    <option selected value="Dystans">Dystans</option>
                    <option value="Czas">Czas</option>
                    <option value="Kalorie">Kalorie</option>
                    <option value="Punkty">Punkty</option>
                </select>

            </div>

        </div>
        </>
    )
}
export default MonthBarChart