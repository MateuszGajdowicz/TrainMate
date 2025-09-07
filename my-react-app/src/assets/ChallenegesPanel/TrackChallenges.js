function countTimeLeft(challenge){
    let today = new Date();
    let endingDate = new Date(challenge.endingDate.seconds * 1000 + Math.floor(challenge.endingDate.nanoseconds / 1e6));

    let timeLeft = (endingDate - today)
    console.log(challenge.endingDate)
    return timeLeft
}


export function TrackChallenges(activitiesArray, allChallenges){
    let startedChallenges = allChallenges.filter(element=>element.status==="started")
    let progressArray = []
    for(let i = 0;i<startedChallenges.length; i++){
        
let challenge = {
    challengeID: startedChallenges[i].id,
    data: {
        userID: startedChallenges[i].userID,
        title: startedChallenges[i].title,
        description: startedChallenges[i].description,
        type: startedChallenges[i].type,
        goalValue: startedChallenges[i].goalValue,
        unit: startedChallenges[i].unit,
        progress: 0,
        period: startedChallenges[i].period,
        status: startedChallenges[i].status,
        disciplines: startedChallenges[i].disciplines,
        points: startedChallenges[i].points,
        startDate: startedChallenges[i].startDate,
        addingDate: startedChallenges[i].addingDate,
        finishDate:startedChallenges[i].finishDate,
        endingDate:startedChallenges[i].endingDate,
        isDefault:startedChallenges[i].isDefault,
        timeLeft:countTimeLeft(startedChallenges[i])/ (1000 * 60 * 60 * 24)
    }
};

let activitiesAfterStartDate = activitiesArray.filter(element=>(element.addingDate)> (challenge.data.startDate))

        for(let j=0; j<activitiesAfterStartDate.length;j++){

            if((challenge.data.disciplines!==null  && activitiesAfterStartDate[j].activityType===challenge.data.disciplines) || challenge.data.disciplines===null){
                switch(challenge.data.type){
                    case "Dystans":
                        if(activitiesAfterStartDate[j].activityGoal==="Dystans"){
                            challenge.data.progress+=Number(activitiesAfterStartDate[j].activityGoalValue)
                        }
                        else if(activitiesAfterStartDate[j].activityGoal==="Czas"){
                            challenge.data.progress+=Number(activitiesAfterStartDate[j].activitySecondGoalValue)

                        }

                        break;
                    case "Czas":
                        if(activitiesAfterStartDate[j].activityGoal==="Czas"){
                            challenge.data.progress+=Number(activitiesAfterStartDate[j].activityGoalValue)

                        }
                        else if(activitiesAfterStartDate[j].activityGoal==="Dystans" || activitiesAfterStartDate[j].activityGoal==="Kalorie"){
                            challenge.data.progress+=Number(activitiesAfterStartDate[j].activitySecondGoalValue)

                        }

                    case "Treningi":
                        case "time-of-day":
                            case "Streak":
                                challenge.data.progress+=1
                                break;
                    case "Kalorie":
                        challenge.data.progress+=Number(activitiesAfterStartDate[j].estimatedCalories)



                }

            // if(challenge.data.unit==="treningi" || challenge.data.unit === "dni"){
            //     challenge.data.progress+=1;
            // }
            // else if(activitiesAfterStartDate[j].activityUnit===challenge.data.unit && challenge.data.unit!=="kcal"){
            //     challenge.data.progress+=Number(activitiesAfterStartDate[j].activityGoalValue);

            // }
            // else if(challenge.data.unit === 'kcal'){
            //     challenge.data.progress+= Number(activitiesAfterStartDate[j].estimatedCalories)

            // }
            // else if(activitiesAfterStartDate[j].activityUnit!== challenge.data.unit && challenge.data.unit!=='kcal'){
            //     challenge.data.progress+= Number(activitiesAfterStartDate[j].activitySecondGoalValue)
            // }

            

            }
        }

        progressArray.push(challenge)


        }
        return progressArray

}

