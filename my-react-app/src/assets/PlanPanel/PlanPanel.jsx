import DisplayPlanContainer from './DisplayPlanContainer'
import AddPlanContainer from './AddPlanContainer'
import EditTraining from './EditTraining'
import { useState } from 'react'
function PlanPanel({user,trainingOptions, setTrainingPlan,trainingPlan}){

    const [selectedTraining,setSelectedTraining ]= useState(null)
    return(<>
    {
        selectedTraining?
        <EditTraining selectedTraining={selectedTraining}  setSelectedTraining={setSelectedTraining} trainingOptions={trainingOptions}/>
        :
        <AddPlanContainer setTrainingPlan={setTrainingPlan} user={user} trainingOptions={trainingOptions}/>

        

    }
    <DisplayPlanContainer setSelectedTraining={setSelectedTraining} trainingPlan={trainingPlan}/>
    </>)
}
export default PlanPanel