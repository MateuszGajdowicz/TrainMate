export function calculatePoints(challengeType, value, period){

    let challengeTypeWeights = 0;
    switch(challengeType){
        case 'sessions':
            challengeType = 1;
            break;
        case 'time':
            challengeType = 1.1;
            break;
        case 'calories':
            challengeType = 1.1;
            break;
        case 'distance':
            challengeType = 1.1;
            break;
        case 'streak':
            challengeType = 1.5;
            break;
        case 'time-of-day':
            challengeType = 1;
            break;

    }
    let periodWeight = 1+(7/period);

    let estimatedPoints = (challengeTypeWeights*value*periodWeight)*10

    return estimatedPoints
    

}