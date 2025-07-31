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
        addingDate: startedChallenges[i].addingDate
    }
};
let activitiesAfterStartDate = activitiesArray.filter(element=>(element.addingDate)> (challenge.data.startDate))

        for(let j=0; j<activitiesAfterStartDate.length;j++){

            if(challenge.data.disciplines!==null  && activitiesAfterStartDate[j].activityType===challenge.data.disciplines ){

            if(challenge.data.unit==="treningi" || challenge.data.unit === "dni"){
                challenge.data.progress+=1;
            }
            else if(activitiesAfterStartDate[j].activityUnit===challenge.data.unit && challenge.data.unit!=="kcal"){
                challenge.data.progress+=Number(activitiesAfterStartDate[j].activityGoalValue);

            }
            else if(challenge.data.unit === 'kcal'){
                challenge.data.progress+= Number(activitiesAfterStartDate[j].estimatedCalories)

            }
            else if(activitiesAfterStartDate[j].activityUnit!== challenge.data.unit && challenge.data.unit!=='kcal'){
                challenge.data.progress+= Number(activitiesAfterStartDate[j].activitySecondGoalValue)
            }

            

            }
            else if(challenge.data.disciplines===null){
                if(challenge.data.unit==="treningi" || challenge.data.unit ==="dni"){
                    challenge.data.progress+=1;
                }
                else if(activitiesAfterStartDate[j].activityUnit===challenge.data.unit && challenge.data.unit!=='kcal'){
                    challenge.data.progress+=Number(activitiesAfterStartDate[j].activityGoalValue)
                }
                else if(challenge.data.unit==="kcal"){
                    challenge.data.progress+=Number(activitiesAfterStartDate[j].estimatedCalories)
                }
                else if(activitiesAfterStartDate[j].activityUnit!==challenge.data.unit && challenge.data.unit!=='kcal'){
                    challenge.data.progress+=Number(activitiesAfterStartDate[j].activitySecondGoalValue)
                }
            }



        }

        progressArray.push(challenge)


        }
        return progressArray

}

export function CheckIsTooLate(challenge){
    let today = new Date();
    if(today-challenge.addingDate<0){}

}