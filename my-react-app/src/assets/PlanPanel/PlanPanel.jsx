import DisplayPlanContainer from './DisplayPlanContainer'
import AddPlanContainer from './AddPlanContainer'
function PlanPanel({user,trainingOptions, setTrainingPlan,trainingPlan}){
    return(<>
    <AddPlanContainer setTrainingPlan={setTrainingPlan} user={user} trainingOptions={trainingOptions}/>
    <DisplayPlanContainer trainingPlan={trainingPlan}/>
    </>)
}
export default PlanPanel