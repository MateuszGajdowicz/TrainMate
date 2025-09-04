import CurrentUserRanking from "./CurrentUserRanking"
import AllUsersRanking from "./AllUsersRanking"
import TrophiesContainer from "./TrophiesContainer"

function RankingPanel({allUsersInfo,userInfo}){
    return(
        <>
        <CurrentUserRanking allUsersInfo={allUsersInfo} userInfo={userInfo}/>
        <AllUsersRanking allUsersInfo={allUsersInfo}/>
        <TrophiesContainer/>
        </>
    )
}
export default RankingPanel