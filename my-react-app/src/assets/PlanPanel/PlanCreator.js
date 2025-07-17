import { estimateCalories } from "../caloriesEstimator";
const weekDays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
const activityConfig = {
  "Bieganie": { name: "Bieganie", unit: "km", min: 5, max: 20, goals: ['Poprawa wytrzymałości (kondycji)', 'Utrata wagi / redukcja tkanki tłuszczowej', 'Poprawa zdrowia i samopoczucia'] },
  "Rower": { name: "Rower", unit: "km", min: 5, max: 60, goals: ['Poprawa wytrzymałości (kondycji)', 'Utrata wagi / redukcja tkanki tłuszczowej', 'Poprawa zdrowia i samopoczucia'] },
  "Pływanie": { name: "Pływanie", unit: "min", min: 20, max: 120, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa mobilności i elastyczności', 'Poprawa zdrowia i samopoczucia'] },
  "Siłownia": { name: "Siłownia", unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Utrata wagi / redukcja tkanki tłuszczowej'] },
  "Joga": { name: "Joga", unit: "min", min: 20, max: 120, goals: ['Poprawa mobilności i elastyczności', 'Poprawa zdrowia i samopoczucia'] },
  "Stretching": { name: "Stretching", unit: "min", min: 20, max: 120, goals: ['Poprawa mobilności i elastyczności', 'Poprawa zdrowia i samopoczucia'] },
  "HIIT": { name: "HIIT", unit: "min", min: 20, max: 120, goals: ['Utrata wagi / redukcja tkanki tłuszczowej', 'Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Pilates": { name: "Pilates", unit: "min", min: 20, max: 120, goals: ['Poprawa mobilności i elastyczności', 'Poprawa zdrowia i samopoczucia'] },
  "Wspinaczka": { name: "Wspinaczka", unit: "min", min: 20, max: 120, goals: ['Poprawa siły', 'Poprawa wytrzymałości (kondycji)', 'Poprawa szybkości i zwinności'] },
  "Nordic Walking": { name: "Nordic Walking", unit: "km", min:2 , max: 20, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa zdrowia i samopoczucia'] },
  "Rolki": { name: "Rolki", unit: "km", min:6, max: 20, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa szybkości i zwinności'] },
  "Deskorolka": { name: "Deskorolka", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa zdrowia i samopoczucia'] },
  "Kajakarstwo": { name: "Kajakarstwo", unit: "km", min:6, max: 30, goals: ['Poprawa wytrzymałości (kondycji)', 'Budowa masy mięśniowej (siła)'] },
  "Wioślarstwo": { name: "Wioślarstwo", unit: "km", min:6, max: 30, goals: ['Poprawa wytrzymałości (kondycji)', 'Budowa masy mięśniowej (siła)'] },
  "Snowboard": { name: "Snowboard", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa zdrowia i samopoczucia'] },
  "Narciarstwo": { name: "Narciarstwo", unit: "min", min: 20, max: 120, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa szybkości i zwinności'] },
  "Łyżwy": { name: "Łyżwy", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Boks": { name: "Boks", unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności'] },
  "Kickboxing": { name: "Kickboxing", unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności'] },
  "Sztuki walki": { name: "Sztuki walki", unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności'] },
  "Krav Maga": { name: "Krav Maga", unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności'] },
  "CrossFit": { name: "CrossFit", unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności', 'Utrata wagi / redukcja tkanki tłuszczowej'] },
  "Trening funkcjonalny": { name: "Trening funkcjonalny", unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności'] },
  "Spacer": { name: "Spacer", unit: "km", min:6, max: 20, goals: ['Poprawa zdrowia i samopoczucia', 'Poprawa wytrzymałości (kondycji)'] },
  "Marszobieg": { name: "Marszobieg", unit: "km", min:6, max: 20, goals: ['Poprawa wytrzymałości (kondycji)', 'Utrata wagi / redukcja tkanki tłuszczowej'] },
  "Taniec": { name: "Taniec", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa zdrowia i samopoczucia'] },
  "Zumba": { name: "Zumba", unit: "min", min: 20, max: 120, goals: ['Utrata wagi / redukcja tkanki tłuszczowej', 'Poprawa zdrowia i samopoczucia'] },
  "Aqua aerobic": { name: "Aqua aerobic", unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia', 'Poprawa mobilności i elastyczności'] },
  "Trening obwodowy": { name: "Trening obwodowy", unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Utrata wagi / redukcja tkanki tłuszczowej'] },
  "Calisthenics": { name: "Calisthenics", unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa mobilności i elastyczności'] },
  "Gimnastyka": { name: "Gimnastyka", unit: "min", min: 20, max: 120, goals: ['Poprawa mobilności i elastyczności', 'Poprawa zdrowia i samopoczucia'] },
  "Parkour": { name: "Parkour", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Triathlon": { name: "Triathlon", unit: "km", min:6, max: 50, goals: ['Poprawa wytrzymałości (kondycji)', 'Utrata wagi / redukcja tkanki tłuszczowej'] },
  "Piłka nożna": { name: "Piłka nożna", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Koszykówka": { name: "Koszykówka", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Siatkówka": { name: "Siatkówka", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Tenis": { name: "Tenis", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Tenis stołowy": { name: "Tenis stołowy", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności'] },
  "Badminton": { name: "Badminton", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności'] },
  "Squash": { name: "Squash", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności'] },
  "Golf": { name: "Golf", unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia', 'Poprawa mobilności i elastyczności'] },
  "Bouldering": { name: "Bouldering", unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności'] },
  "Surfing": { name: "Surfing", unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia', 'Poprawa mobilności i elastyczności'] },
  "Kitesurfing": { name: "Kitesurfing", unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia', 'Poprawa szybkości i zwinności'] },
  "Windsurfing": { name: "Windsurfing", unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia', 'Poprawa szybkości i zwinności'] },
  "SUP (Stand Up Paddle)": { name: "SUP (Stand Up Paddle)", unit: "min", min: 20, max: 120, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa zdrowia i samopoczucia'] },
  "Łucznictwo": { name: "Łucznictwo", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa zdrowia i samopoczucia'] },
  "Jeździectwo": { name: "Jeździectwo", unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia'] },
  "Paintball": { name: "Paintball", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Budowa masy mięśniowej (siła)'] },
  "Airsoft": { name: "Airsoft", unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności'] },
  "Żeglarstwo": { name: "Żeglarstwo", unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia'] },
  "Turystyka górska": { name: "Turystyka górska", unit: "min", min: 20, max: 120, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa zdrowia i samopoczucia'] },
  "Bieg na orientację": { name: "Bieg na orientację", unit: "km", min:6, max: 20, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa szybkości i zwinności'] }
};



function scaleGoal(min, max, intensity) {
  const scaleMap = {
    "Niska": 0.4,
    "Średnia": 0.6,
    "Wysoka": 0.8,
    "Bardzo wysoka": 1.0
  };
  const scale = scaleMap[intensity] || 1;
  const goal = Math.floor((Math.random() * (max - min + 1) + min) * scale);
  return goal;
}

function getTimeOfDay(time){
    let hours = []
    switch(time){
        case 'Rano (6:00–9:00)':
            hours.push(6,7,8)
            break;
        case "Przedpołudnie (9:00–13:00)":
            hours.push(9,10,11,12)
            break;
        case 'Popołudnie (13:00–17:00)':
            hours.push(13,14,15,16)
            break;
        case "Wieczór (17:00–21:00)":
            hours.push(17,18,19,20)
            break;
        case "Późny wieczór (21:00–00:00)":
            hours.push(21,22,23)
            break;
    }

    let randomHourIndex = Math.floor(Math.random()*hours.length);
    let randomHour = hours[randomHourIndex]

    return randomHour
}




export function GenerateTrainingPlan(goal, activitiesArray, intensity, number, time, length) {
    let trainingPlan = [];
    for(let i =0;i<number;i++) {
    let randomActivityIndex = Math.floor(Math.random() * activitiesArray.length);
    let randomActivityName = activitiesArray[randomActivityIndex];
    let config = activityConfig[randomActivityName];
    console.log(config)

    if (!config) continue;

     let randomDayIndex = Math.floor(Math.random() * weekDays.length);
     let dayName = weekDays[randomDayIndex]

    const trainingGoal = Math.round(scaleGoal(config.min, config.max, intensity)/5)*5;

    const hour  = getTimeOfDay(time)

    let estimatedCalories = 0;

    if(config.unit ==="min"){
      estimatedCalories = estimateCalories({type:config.name,durationMin:trainingGoal })
    }
    else if(config.unit === "km"){
        estimatedCalories = estimateCalories({type:config.name,distanceKm:trainingGoal })


    }

    // Zbuduj entry
    trainingPlan.push({
      activity: randomActivityName,
      dayOfTheWeek: randomDayIndex,
      trainingDays: dayName,
      trainingUnit: config.unit,
      timeOfDay: hour,
      trainingGoalValue: trainingGoal,
      estimatedCalories:estimatedCalories,
      trainingDescription: null,
    });
  }

  // Sortuj po dniach
  trainingPlan.sort((a, b) => a.dayOfTheWeek - b.dayOfTheWeek);

  return trainingPlan;
}
export function CheckIsGoal(activitiesArray,goal){

    let checkedIsMatched = activitiesArray.filter((element)=>{
        let currentActivityInfo = activityConfig[element]
        return currentActivityInfo.goals.includes(goal)
    })



    return (checkedIsMatched.length/activitiesArray.length)<0.5? false: true
    


}