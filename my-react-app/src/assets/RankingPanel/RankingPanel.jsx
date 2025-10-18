import CurrentUserRanking from "./CurrentUserRanking"
import AllUsersRanking from "./AllUsersRanking"
import TrophiesContainer from "./TrophiesContainer"
import { useEffect } from "react"

function RankingPanel({allUsersInfo,userInfo,activitesList,FetchAllUsers}){

    useEffect(()=>{
        FetchAllUsers()
    },[])
    return(
        <>
        <CurrentUserRanking allUsersInfo={allUsersInfo} userInfo={userInfo}/>
        <AllUsersRanking  allUsersInfo={allUsersInfo}/>
        <TrophiesContainer activitesList={activitesList}/>
        </>
    )
}
export default RankingPanel