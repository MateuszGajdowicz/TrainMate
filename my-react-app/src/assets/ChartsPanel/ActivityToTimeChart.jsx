import { useState } from 'react';
import './ActivityToTimeChart.css'
import Select from 'react-select';

function ActivityToTimeChart({trainingOptions}){
    let trainingOptionsForSelect = trainingOptions.map(element=>({value:element, label:element}))

    const [selectedActivities, setSelectedActivities] = useState([])
    const [radioValue, setRadioValue] = useState('one')
    return(
        <>
        <div className="ChartContainer">
            <div className='chartHeader'>
                <h2>Twoja aktywność w czasie</h2>
                <div>
                <input value='all' checked={radioValue==='all'} onChange={event=>setRadioValue(event.target.value)} type="radio" id='all' name='radio' />
                <label htmlFor='all'>Wszystkie aktywności</label>


                </div>
                <div>
                <input value='one' checked={radioValue==='one'} onChange={event=>setRadioValue(event.target.value)} type="radio" id='one' name='radio'/>
                <label htmlFor='one'>Poszczególne aktywności</label>

                </div>

                {
                    radioValue==="one" &&     
                <Select value={selectedActivities} onChange={setSelectedActivities} classNamePrefix='rs' isMulti options={trainingOptionsForSelect} type="text" placeholder='Wybierz preferowane aktywności'/>


                }

            


            </div>
        </div>

        </>
    )
}
export default ActivityToTimeChart