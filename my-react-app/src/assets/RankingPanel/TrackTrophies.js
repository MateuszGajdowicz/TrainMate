import { TrophiesList } from "./TrophiesList";

export function TrackTrophies(trophiesList, activitiesList){
    let trophiesProgressArray = []
    let inCompleteTrophies = trophiesList.filter(element=>!element.isFinished)
    for(let i =0; i<inCompleteTrophies.length;i++){
        for(let j =0;j<activitiesList.length;i++){
            switch(inCompleteTrophies[i].goalType){
                case "points":
                    inCompleteTrophies[i].progress+=activitiesList[j].points
                    break;
                case "sessions":
                    inCompleteTrophies[i].progress+=1
                    break;
                case "time":
                    if(activitiesList[j].activityGoal==="Dystans" || activitiesList[j].activityGoal==="Kalorie"){
                        inCompleteTrophies[i].progress+=activitiesList[j].activitySecondGoalValue
                    }
                    else if(){
                        
                    }

            }
        }

        

    }
}