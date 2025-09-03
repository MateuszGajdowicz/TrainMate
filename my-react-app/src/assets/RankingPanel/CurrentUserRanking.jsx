import { use, useEffect, useState } from "react"
import "./CurrentUserRanking.css"
import { auth } from "../../firebase"

function CurrentUserRanking({userInfo,allUsersInfo}){

    const [defaultUserInfoPoints, setDefaultUserInfoPoints] = useState({
        username:'',
        points:0
    })
useEffect(() => {
  if (auth.currentUser && userInfo.length > 0) {
    setDefaultUserInfoPoints({
      username: auth.currentUser.displayName,
      points: userInfo[0].userPoints,
    });
  }
}, [userInfo]);

    return(<>
    <h1 className="heading">RANKING </h1>
    <div className="userScoreContainer">
        <h1>Dobra robota {defaultUserInfoPoints.username}!</h1>
        <h2>Od czasu dołączenia do nas zdobyłeś łącznie</h2>
        <h1 style={{fontSize:'3em'}}>{defaultUserInfoPoints.points} </h1>
        <h1>puntków</h1>
        <h2>W rakingu użytkowników zajmujesz </h2>
        <h2 style={{fontSize:'2.4em'}}>{allUsersInfo.findIndex(user=>user.username===defaultUserInfoPoints.username)+1} miejsce</h2>
        <h2>na {allUsersInfo.length} użytkowników</h2>
        <h1></h1>
        <h1></h1>

    </div>
    </>)
}
export default CurrentUserRanking