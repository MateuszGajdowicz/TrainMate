import { useState } from 'react'
import './CategoryInformationContainer.css'
import { CheckIsGoal } from './PlanCreator'
function CategoryInformationContainer({setDontShowAgain,setIsActivityMatched,setSelectedAddActivity,isAcitivityMatched}){
    
    const [selectedIndex, setSelectedIndex] = useState(null)

    function handleUpdateActivityList(element, index){
        setSelectedAddActivity(element)
        setSelectedIndex(index)
        setIsActivityMatched({matchedActivities:isAcitivityMatched.matchedActivities.filter((_, index)=>index!==selectedIndex)})

    }
    
    return(<>
    <div className='CategoryInformationContainer'>
        <p>Zauważyliśmy, że ponad połowa wybranych przez Ciebie aktywności nie pasuje do twojego celu. Aktywności do niego pasujące to :</p>
            <div className='ListContainer'>
                <ul>
                {isAcitivityMatched.matchedActivities.map((element, index)=>(
                    <div key={index} className='OptionContainer'>
                    <li>{element}</li>
                    <button onClick={()=>handleUpdateActivityList(element, index)}>Dodaj</button>
                    </div>

                ))

                }

            </ul>

            </div>
        <p>
        Dodaj je za pomocą przycisku, lub nie wprowadzaj żadnych zmian
        </p>
        <div className='ButtonContainer'>
            <button style={{padding:"5px", marginRight:"10px"}} onClick={()=>setIsActivityMatched({isMatched:true})}>Zamknij</button>
            <button style={{padding:"5px"}} onClick={()=>setDontShowAgain(true)}>Nie wyświetlaj ponownie</button>
        </div>
    </div>
    </>)}
export default CategoryInformationContainer