import CurrentUserRanking from "./CurrentUserRanking"
import AllUsersRanking from "./AllUsersRanking"
function RankingPanel({allUsersInfo,userInfo}){
    return(
        <>
        <CurrentUserRanking allUsersInfo={allUsersInfo} userInfo={userInfo}/>
        <AllUsersRanking allUsersInfo={allUsersInfo}/>
        </>
    )
}
export default RankingPanel