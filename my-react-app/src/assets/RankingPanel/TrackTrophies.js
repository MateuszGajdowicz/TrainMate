import { TrophiesList } from "./TrophiesList";

export function TrackTrophies(trophiesList, activitiesList){
    let trophiesProgressArray = []
    for(let i =0; i<trophiesList.length;i++){
        let temporaryTrophy = {...trophiesList[i]}
        for(let j =0;j<activitiesList.length;j++){
            switch(temporaryTrophy.goalType){
                case "Punkty":
                    temporaryTrophy.progress+=Number(activitiesList[j].points)
                    break;
                case "Treningi":
                    temporaryTrophy.progress+=1
                    break;
                case "Kalorie":
                    temporaryTrophy.progress+=Number(activitiesList[j].estimatedCalories)
                    break;
                    case "Czas":
                    if(activitiesList[j].activityGoal === "Czas"){
                        temporaryTrophy.progress+=Number(activitiesList[j].activityGoalValue)
                    }
                    else if(activitiesList[j].activityGoal==="Dystans" || activitiesList[j].activityGoal==="Kalorie"){
                        temporaryTrophy.progress+=Number(activitiesList[j].activitySecondGoalValue)
                    }
                    break
                case "Dystans":
                    if(activitiesList[j].activityGoal==="Dystans"){
                        temporaryTrophy.progress+=Number(activitiesList[j].activityGoalValue)
                    }
                    else if(activitiesList[j].activityGoal==="Czas"){
                        temporaryTrophy.progress+=Number(activitiesList[j].activitySecondGoalValue) 
                   }

                   break



            }
        }
        if(temporaryTrophy.progress/temporaryTrophy.goalValue>=1){
            temporaryTrophy.isFinished=true
        }
        trophiesProgressArray.push(temporaryTrophy)

        

    }
    return trophiesProgressArray
}