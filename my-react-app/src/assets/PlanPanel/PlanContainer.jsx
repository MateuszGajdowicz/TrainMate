import DisplayPlanContainer from './DisplayPlanContainer'
import AddPlanContainer from './AddPlanContainer'
function PlanContainer({trainingOptions}){
    return(<>
    <AddPlanContainer trainingOptions={trainingOptions}/>
    </>)
}
export default PlanContainer