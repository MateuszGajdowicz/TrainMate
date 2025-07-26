export function calculatePoints(challengeType, value, period){

    let challengeTypeWeights = 0;
    switch(challengeType){
        case 'sessions':
            challengeTypeWeights = 1;
            break;
        case 'time':
            challengeTypeWeights = 1.1;
            break;
        case 'calories':
            challengeTypeWeights = 1.1;
            break;
        case 'distance':
            challengeTypeWeights = 1.1;
            break;
        case 'streak':
            challengeTypeWeights = 1.5;
            break;
        case 'time-of-day':
            challengeTypeWeights = 1;
            break;

    }
    let periodWeight = 1+(7/period);

    let estimatedPoints = (challengeTypeWeights*value*periodWeight)*10

    return estimatedPoints
    

}