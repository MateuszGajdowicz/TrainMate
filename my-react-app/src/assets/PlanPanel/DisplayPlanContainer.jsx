import './DisplayPlanContainer.css'
import '../TrainigsPanel/TrainingsList.css'
function DisplayPlanContainer({trainingPlan}){
    return(<>
    <div style={{left:'50%'}} className="YourTrainingsContainer">
        <h1>Twój nowy plan</h1>
        <div className='AllSingleTrainigsContainer'> 
            {
                trainingPlan.length===0?
                <h2>Wygląda na to, że nie masz jeszcze planu. Uzupełnij dane obok aby go stworzyć!!</h2>:
            trainingPlan.map((element, index)=>(
            <div key={index} className='SingleTrainigContainer'>
                <h3>{element.activity.label}</h3>
                    <div className='HorizontalContainer'>
                        <h4>{element.trainingGoalValue} {element.trainingUnit}</h4>
                        <h4>{element.timeOfDay}:00</h4>
                        <h4>{element.trainingDays}</h4>
                        <div className='buttonContainer'>
                            <button >Przełóż</button>
                            <button >Edytuj</button>
                            <button >Usuń</button>

                        </div>
 
                    </div>
            </div>

        ))}

              



        </div>
 

         </div>
    </>)
}
export default DisplayPlanContainer