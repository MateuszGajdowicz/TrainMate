export function calculatePoints(challengeType, value, period){

    let challengeTypeWeights = 0;
    switch(challengeType){
        case 'Treningi':
            challengeTypeWeights = 1;
            break;
        case 'Czas':
            challengeTypeWeights = 1.1;
            break;
        case 'Kalorie':
            challengeTypeWeights = 1.1;
            break;
        case 'Dystans':
            challengeTypeWeights = 1.1;
            break;
        case 'Streak':
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