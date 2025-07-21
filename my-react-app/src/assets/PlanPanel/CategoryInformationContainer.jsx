import './CategoryInformationContainer.css'
import { CheckIsGoal } from './PlanCreator'
function CategoryInformationContainer({isAcitivityMatched}){
    return(<>
    <div className='CategoryInformationContainer'>
        <p>Zauważyliśmy, że ponad połowa wybranych przez Ciebie aktywności nie pasuje do twojego celu. Aktywności do niego pasujące to :
            <ul>
                {isAcitivityMatched.matchedActivities.map((element, index)=>(
                    <li>{element}</li>
                ))

                }

            </ul>
        Dodaj je za pomocą przycisku, lub nie wprowadzaj żadnych zmian
        </p>
        <div className='ButtonContainer'>
            <button>Dodaj</button>
            <button>Zamknij</button>
        </div>
    </div>
    </>)}
export default CategoryInformationContainer