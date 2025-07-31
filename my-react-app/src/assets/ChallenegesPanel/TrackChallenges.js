export function TrackChallenges(activitiesArray, allChallenges){
    let startedChallenges = allChallenges.filter(element=>element.status==="started")
    let progressArray = []
    for(let i = 0;i<startedChallenges.length; i++){
        let progress = {
            challengeID: startedChallenges[i].id,
            discipline:startedChallenges[i].disciplines,
            type:startedChallenges[i].type,
            progress:0,
            challengeUnit:startedChallenges[i].unit,
            maxProgress: startedChallenges[i].goalValue,
            maxPeriod:startedChallenges[i].period
        }
        for(let j=0; j<activitiesArray.length;j++){
            if(progress.discipline!==null  && activitiesArray[j].activityType===progress.discipline ){

            if(progress.challengeUnit==="treningi" || progress.challengeUnit === "dni"){
                progress.progress+=1;
            }
            else if(activitiesArray[j].activityUnit===progress.challengeUnit){
                progress.progress+=Number(activitiesArray[j].activityGoalValue);

            }
            else if(progress.challengeUnit === 'kcal'){
                progress.progress+= Number(activitiesArray[j].estimatedCalories)

            }
            else if(activitiesArray[j].activityUnit!== progress.challengeUnit && progress.challengeUnit!=='kcal'){
                progress.progress+= Number(activitiesArray[j].activitySecondGoalValue)
            }

            

            }
            else if(progress.discipline===null){
                if(progress.challengeUnit==="treningi" || progress.challengeUnit ==="dni"){
                    progress.progress+=1;
                }
                else if(activitiesArray[j].activityUnit===progress.challengeUnit){
                    progress.progress+=Number(activitiesArray[j].activityGoalValue)
                }
                else if(progress.challengeUnit==="kcal"){
                    progress.progress+=Number(activitiesArray[j].estimatedCalories)
                }
                else if(activitiesArray[j].activityUnit!==progress.challengeUnit && progress.challengeUnit!=='kcal'){
                    progress.progress+=Number(activitiesArray[j].activitySecondGoalValue)
                }
            }



        }

        progressArray.push(progress)


        }
        return progressArray

}

