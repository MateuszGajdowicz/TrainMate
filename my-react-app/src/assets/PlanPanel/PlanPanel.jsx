import DisplayPlanContainer from './DisplayPlanContainer'
import AddPlanContainer from './AddPlanContainer'
import EditTraining from './EditTraining'
import { useState } from 'react'
function PlanPanel({user,trainingOptions, setTrainingPlan,trainingPlan}){

    const [selectedTraining,setSelectedTraining ]= useState(null)
    const [selectedTrainingIndex, setSelectedTrainingIndex] = useState(null)
    
    
    return(<>
    {
        selectedTraining?
        <EditTraining selectedTrainingIndex={selectedTrainingIndex} trainingPlan={trainingPlan} selectedTraining={selectedTraining}  setSelectedTraining={setSelectedTraining} trainingOptions={trainingOptions}/>
        :
        <AddPlanContainer selectedTraining={selectedTraining}  trainingPlan={trainingPlan} setTrainingPlan={setTrainingPlan} user={user} trainingOptions={trainingOptions}/>

        

    }
    <DisplayPlanContainer setSelectedTrainingIndex={setSelectedTrainingIndex} setSelectedTraining={setSelectedTraining} trainingPlan={trainingPlan}/>
    </>)
}
export default PlanPanel