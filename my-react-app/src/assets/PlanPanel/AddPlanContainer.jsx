import { useEffect, useState } from 'react';
import './AddPlanContainer.css'
import Select from 'react-select';
function AddPlanContainer({trainingOptions}){
    
    const [trainingOptionsArray, setTrainingOptionsArray] = useState(trainingOptions.map(element=>({value:element, label:element})))
    
    const [selectedActivities, setSelectedActivites] = useState([])
    useEffect(()=>{
        console.log(selectedActivities)
    },[selectedActivities])
    
    return(
        <>
        <div className='AddPlanContainer'>
            <h1 className='Heading'>Zbuduj swój własny plan :)</h1>
            <div className='GoalContainer'>
                <p>Wybierz głowny cel: </p>

            <select className='planInput'  name="" id="">
                <option value="">Poprawa wytrzymałości (kondycji)</option>
                <option value="">Budowa masy mięśniowej (siła)</option>
                <option value="">Utrata wagi / redukcja tkanki tłuszczowej</option>
                <option value="">Poprawa mobilności i elastyczności</option>
                <option value="">Poprawa szybkości i zwinności</option>
                <option value="">Poprawa zdrowia i samopoczucia</option>
            </select>

            </div>

            <Select onChange={setSelectedActivites} classNamePrefix='rs' isMulti options={trainingOptionsArray} type="text" placeholder='Wybierz preferowane aktywności'/>
            <input className='planInput' type="text" placeholder='Wybierz intensywnosc'/>
            <input className='planInput' type="number" placeholder='Liczba treningów w tygodniu' />
            <input className='planInput' type="number" placeholder='Wybierz długość treningu' />
            <textarea className='planInput' placeholder='Dodatkowe notatki' name="" id=""></textarea>
            <button className='createPlanButton'>Stwórz plan</button>
        </div>
        </>
    )
}
export default AddPlanContainer