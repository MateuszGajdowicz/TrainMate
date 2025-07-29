export function CalculatePointsForTrainings(trainingGoal, trainingGoalValue, estimatedCalories){
    let goalWeight = 0;
    switch(trainingGoal){
        case "Kalorie":
            goalWeight=0.05;
            break;
        case "Dystans":
            goalWeight=5;
            break;
        case "Czas":
            goalWeight=0.5;
            }
        let points = Math.round((goalWeight*trainingGoalValue)+(estimatedCalories*0.05))
        return points;

}