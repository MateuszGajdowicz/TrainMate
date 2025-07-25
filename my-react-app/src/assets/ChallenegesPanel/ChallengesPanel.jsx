import ChallengesList from "./ChallengesList"
function ChallengesPanel({trainingOptions,setAllChallengesList,allChallengesList,FetchPersonalChallengesList,user}){
    return(<>
    <ChallengesList trainingOptions={trainingOptions} setAllChallengesList={setAllChallengesList} allChallengesList={allChallengesList} FetchPersonalChallengesList={FetchPersonalChallengesList} user={user}/>
    </>)
}
export default ChallengesPanel