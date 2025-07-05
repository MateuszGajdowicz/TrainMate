import { useEffect, useState } from 'react'
import './FilterTrainingsContainer.css'
function FilterTrainingsContainer({trainingsList,trainingOptions,setDisplayedTrainingList,displayedTrainingsList}){

    const [FilteredCategory, setFilteredCategory] = useState('')
    const [firstDateValue, setFirstDateValue] = useState('')
    const [secondDateValue, setSecondDateValue] = useState('')
    


    function FilterTrainingsByCategory(event){
        const inputValue = event.target.value.toLowerCase();
        setFilteredCategory(inputValue)
        console.log(inputValue)
        setDisplayedTrainingList(trainingsList.filter(element=>element.trainingType.toLowerCase().includes(inputValue)))
        if(inputValue==='') setDisplayedTrainingList(trainingsList)

    }
    function FilterTrainingsByDate(){
        setDisplayedTrainingList(trainingsList.filter(element=>element.trainingDate>firstDateValue&&element.trainingDate<secondDateValue))

    }
    function ClearFilters(){
        setDisplayedTrainingList(trainingsList);
        setFilteredCategory('')
        setFirstDateValue('')
        setSecondDateValue('')
    }
    useEffect(()=>{
        if(firstDateValue!==''&&secondDateValue!==''){
            FilterTrainingsByDate()
        }
    },[firstDateValue,secondDateValue])



    return(<>
    <div className='FilterTrainingsContainer'>
        <input style={{width:'35%'}}value={FilteredCategory} type="text" list='trainings'placeholder='Wyszukaj po kategorii'onChange={FilterTrainingsByCategory}/>
        <datalist id='trainings'>
            {trainingOptions.map((element, index)=>(
                <option value={element} key={index}/>

            ))}
        </datalist>
        <input value={firstDateValue} type={firstDateValue ? 'date' : 'text'} placeholder="Wybierz datę" onFocus={e => e.target.type = 'date'} onBlur={e => !e.target.value && (e.target.type = 'text')} onChange={e => setFirstDateValue(e.target.value)} />
        <input value={secondDateValue} type={secondDateValue ? 'date' : 'text'} placeholder="Wybierz datę" onFocus={e => e.target.type = 'date'} onBlur={e => !e.target.value && (e.target.type = 'text')} onChange={e => setSecondDateValue(e.target.value)} />
        <button className='ClearFiltersButton' onClick={ClearFilters}>Wyczyść filtry</button>


    </div>
    </>)
}
export default FilterTrainingsContainer