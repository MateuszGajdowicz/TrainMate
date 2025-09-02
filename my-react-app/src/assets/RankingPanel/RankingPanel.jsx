import CurrentUserRanking from "./CurrentUserRanking"
function RankingPanel({allUsersInfo,userInfo}){
    return(
        <>
        <CurrentUserRanking allUsersInfo={allUsersInfo} userInfo={userInfo}/>
        </>
    )
}
export default RankingPanel