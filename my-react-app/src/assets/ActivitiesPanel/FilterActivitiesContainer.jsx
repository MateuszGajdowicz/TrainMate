import { useEffect, useState } from 'react'
import '../TrainigsPanel/FilterTrainingsContainer.css'
function FilterActivitiesContainer({favouriteActivitiesList,trainingOptions,SeparateTrainings,displayedActivitiesList,setDisplayedActivitiesList,activitesList}){

    const [FilteredCategory, setFilteredCategory] = useState('')
    const [firstDateValue, setFirstDateValue] = useState('')
    const [secondDateValue, setSecondDateValue] = useState('')

    const [isFavsDisplayed, setIsFavsDisplayed] = useState(false)

    
    function handleFavsDisplay(){
        if(!isFavsDisplayed){
            setIsFavsDisplayed(true)
            setDisplayedActivitiesList(favouriteActivitiesList)
        }
        else{
            setIsFavsDisplayed(false)
            setDisplayedActivitiesList(activitesList)
    }
}
    

    function FilterTrainingsByCategory(event){
        const inputValue = event.target.value.toLowerCase();
        setFilteredCategory(inputValue)
        console.log(inputValue)
        setDisplayedActivitiesList(displayedActivitiesList.filter(element=>element.activityType.toLowerCase().includes(inputValue)))
        if(inputValue==='') {
            setDisplayedActivitiesList(activitesList)
        }

    }
    function FilterTrainingsByDate(){
        setDisplayedActivitiesList(activitesList.filter(element=>element.activityDate>firstDateValue&&element.activityDate<secondDateValue))

    }
    function ClearFilters(){
        setDisplayedActivitiesList(activitesList)

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
        <input value={FilteredCategory} type="text" list='trainings'placeholder='Wyszukaj po kategorii'onChange={FilterTrainingsByCategory}/>
        <datalist id='trainings'>
            {trainingOptions.map((element, index)=>(
                <option value={element} key={index}/>

            ))}
        </datalist>
        <input value={firstDateValue} type={firstDateValue ? 'date' : 'text'} placeholder="Wybierz datę" onFocus={e => e.target.type = 'date'} onBlur={e => !e.target.value && (e.target.type = 'text')} onChange={e => setFirstDateValue(e.target.value)} />
        <input value={secondDateValue} type={secondDateValue ? 'date' : 'text'} placeholder="Wybierz datę" onFocus={e => e.target.type = 'date'} onBlur={e => !e.target.value && (e.target.type = 'text')} onChange={e => setSecondDateValue(e.target.value)} />
        <button className='FavouritesButton' onClick={handleFavsDisplay}>❤︎</button>

        <button className='ClearFiltersButton' onClick={ClearFilters}>Wyczyść filtry</button>


    </div>
    </>)
}
export default FilterActivitiesContainer