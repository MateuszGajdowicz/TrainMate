import './AllUsersRanking.css'
import { auth } from "../../firebase"
import { useEffect } from 'react';

function AllUsersRanking({allUsersInfo}){


    function setColor(index){


        switch(index){
            case 0: 
                return 'linear-gradient(135deg, hsl(0, 0%, 100%) 2%, hsla(51,100%, 50%, 1.00) 100%)';
                break;
            case 1:
                return 'linear-gradient(135deg, hsl(0, 0%, 100%) 2%, hsla(0,0%, 75%, 1.00) 100%)';
                break;
            case 2:
                return 'linear-gradient(135deg, hsl(0, 0%, 100%) 2%, hsla(30, 70%, 30%, 1.00) 100%)'
                break;
            default:
                return "linear-gradient(135deg, hsl(0, 0%, 100%) 2%, hsl(26, 100%, 50%) 100%)"
                break;


        }
    }
    return(
        <>
        
        <div className="usersRankingContainer">
            <h1>Ranking innych użytkowników</h1>
            <div className='usersContainer'>
                {
                    allUsersInfo?.map((element,index)=>(
                        <div  style={{background:setColor(index), border:index ===allUsersInfo.findIndex(user=>user.username===auth.currentUser.displayName)?"5px solid hsla(214, 72%, 76%, 1.00) ":"1em"}} className='singleUserContainer'>
                            <h2>{index+1}. {element.username}</h2>
                            <h3>{element.userPoints} pkt</h3>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}
export default AllUsersRanking 