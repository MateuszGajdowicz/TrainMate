import DisplayPlanContainer from './DisplayPlanContainer'
import GeneratePlanContainer from './GeneratePlanContainer'
import EditTraining from './EditTraining'
import { useState } from 'react'
import FillTrainingPlan from './FillTrainingPlan'
import { CheckIsGoal } from './PlanCreator'
import CategoryInformationContainer from './CategoryInformationContainer'
function PlanPanel({FetchTrainingPlanList,setTrainingPlanData,trainingPlanData,user,trainingOptions, setTrainingPlan,trainingPlan}){

    const [selectedTraining,setSelectedTraining ]= useState(null)
    const [selectedTrainingIndex, setSelectedTrainingIndex] = useState(null)

    const [planCreatingWay, setPlanCreatingWay] = useState("Wpisz")

    const [isAcitivityMatched, setIsActivityMatched] = useState({isMatched:true})

    
    
    return(<>
    {
        selectedTraining ?
        (
            <EditTraining FetchTrainingPlanList={FetchTrainingPlanList} selectedTrainingIndex={selectedTrainingIndex} trainingPlan={trainingPlan} selectedTraining={selectedTraining}  setSelectedTraining={setSelectedTraining} trainingOptions={trainingOptions}/>


        )
        :
        (
            planCreatingWay==="Wpisz"?
        ( 
        <FillTrainingPlan FetchTrainingPlanList={FetchTrainingPlanList} planCreatingWay={planCreatingWay} setPlanCreatingWay={setPlanCreatingWay} trainingOptions={trainingOptions}/>
        )
        :   
        (
            <>
            {
                !isAcitivityMatched.isMatched &&
                <CategoryInformationContainer isAcitivityMatched={isAcitivityMatched}/>

            }
            <GeneratePlanContainer setIsActivityMatched={setIsActivityMatched} planCreatingWay={planCreatingWay} setPlanCreatingWay={setPlanCreatingWay}  FetchTrainingPlanList={FetchTrainingPlanList} setTrainingPlanData={setTrainingPlanData} trainingPlanData={trainingPlanData} selectedTraining={selectedTraining}  trainingPlan={trainingPlan} setTrainingPlan={setTrainingPlan} user={user} trainingOptions={trainingOptions}/>
            </>
        )


        

            
        )


        

    }
    <DisplayPlanContainer FetchTrainingPlanList={FetchTrainingPlanList} setSelectedTrainingIndex={setSelectedTrainingIndex} setSelectedTraining={setSelectedTraining} trainingPlan={trainingPlan}/>
    </>)
}
export default PlanPanel