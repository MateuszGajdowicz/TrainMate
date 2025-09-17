import { useEffect, useState } from 'react';
import './BarActivityChart.css'
function BarActivityChart({activitesList, getSortedByData}){
            const [radioDataValue, setRadioDataValue] = useState('standard')
            const [standardPeriod, setStandardPeriod] = useState('Wszystkie')
            const [periodEnd, setPeriodEnd] = useState(null)
            const [periodStart, setPeriodStart] = useState(null)


            useEffect(()=>{
                let dataSortedActivities = getSortedByData(activitesList,radioDataValue,standardPeriod,periodStart,periodEnd)
                console.log(dataSortedActivities)


                let groupedActivities = {}
            },[activitesList,radioDataValue,standardPeriod,periodStart,periodEnd])
    return(
        <>
        <div className="BarChartContainer"> 
            <div className="ChartSettingContainer">
                <h2>Wyniki dla aktywności</h2>
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
        </div>
        </>
    )


}
export default BarActivityChart