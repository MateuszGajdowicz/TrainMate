const weekDays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
const activityConfig = {
  "Bieganie": { unit: "km", min: 2, max: 20, goals: ['Poprawa wytrzymałości (kondycji)', 'Utrata wagi / redukcja tkanki tłuszczowej', 'Poprawa zdrowia i samopoczucia'] },
  "Rower": { unit: "km", min: 2, max: 60, goals: ['Poprawa wytrzymałości (kondycji)', 'Utrata wagi / redukcja tkanki tłuszczowej', 'Poprawa zdrowia i samopoczucia'] },
  "Pływanie": { unit: "min", min: 20, max: 120, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa mobilności i elastyczności', 'Poprawa zdrowia i samopoczucia'] },
  "Siłownia": { unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Utrata wagi / redukcja tkanki tłuszczowej'] },
  "Joga": { unit: "min", min: 20, max: 120, goals: ['Poprawa mobilności i elastyczności', 'Poprawa zdrowia i samopoczucia'] },
  "Stretching": { unit: "min", min: 20, max: 120, goals: ['Poprawa mobilności i elastyczności', 'Poprawa zdrowia i samopoczucia'] },
  "HIIT": { unit: "min", min: 20, max: 120, goals: ['Utrata wagi / redukcja tkanki tłuszczowej', 'Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Pilates": { unit: "min", min: 20, max: 120, goals: ['Poprawa mobilności i elastyczności', 'Poprawa zdrowia i samopoczucia'] },
  "Wspinaczka": { unit: "min", min: 20, max: 120, goals: ['Poprawa siły', 'Poprawa wytrzymałości (kondycji)', 'Poprawa szybkości i zwinności'] },
  "Nordic Walking": { unit: "km", min: 2, max: 20, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa zdrowia i samopoczucia'] },
  "Rolki": { unit: "km", min: 2, max: 20, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa szybkości i zwinności'] },
  "Deskorolka": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa zdrowia i samopoczucia'] },
  "Kajakarstwo": { unit: "km", min: 2, max: 30, goals: ['Poprawa wytrzymałości (kondycji)', 'Budowa masy mięśniowej (siła)'] },
  "Wioślarstwo": { unit: "km", min: 2, max: 30, goals: ['Poprawa wytrzymałości (kondycji)', 'Budowa masy mięśniowej (siła)'] },
  "Snowboard": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa zdrowia i samopoczucia'] },
  "Narciarstwo": { unit: "min", min: 20, max: 120, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa szybkości i zwinności'] },
  "Łyżwy": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Boks": { unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności'] },
  "Kickboxing": { unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności'] },
  "Sztuki walki": { unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności'] },
  "Krav Maga": { unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności'] },
  "CrossFit": { unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności', 'Utrata wagi / redukcja tkanki tłuszczowej'] },
  "Trening funkcjonalny": { unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności'] },
  "Spacer": { unit: "km", min: 2, max: 20, goals: ['Poprawa zdrowia i samopoczucia', 'Poprawa wytrzymałości (kondycji)'] },
  "Marszobieg": { unit: "km", min: 2, max: 20, goals: ['Poprawa wytrzymałości (kondycji)', 'Utrata wagi / redukcja tkanki tłuszczowej'] },
  "Taniec": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa zdrowia i samopoczucia'] },
  "Zumba": { unit: "min", min: 20, max: 120, goals: ['Utrata wagi / redukcja tkanki tłuszczowej', 'Poprawa zdrowia i samopoczucia'] },
  "Aqua aerobic": { unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia', 'Poprawa mobilności i elastyczności'] },
  "Trening obwodowy": { unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Utrata wagi / redukcja tkanki tłuszczowej'] },
  "Calisthenics": { unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa mobilności i elastyczności'] },
  "Gimnastyka": { unit: "min", min: 20, max: 120, goals: ['Poprawa mobilności i elastyczności', 'Poprawa zdrowia i samopoczucia'] },
  "Parkour": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Triathlon": { unit: "km", min: 2, max: 50, goals: ['Poprawa wytrzymałości (kondycji)', 'Utrata wagi / redukcja tkanki tłuszczowej'] },
  "Piłka nożna": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Koszykówka": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Siatkówka": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Tenis": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa wytrzymałości (kondycji)'] },
  "Tenis stołowy": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności'] },
  "Badminton": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności'] },
  "Squash": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności'] },
  "Golf": { unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia', 'Poprawa mobilności i elastyczności'] },
  "Bouldering": { unit: "min", min: 20, max: 120, goals: ['Budowa masy mięśniowej (siła)', 'Poprawa szybkości i zwinności'] },
  "Surfing": { unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia', 'Poprawa mobilności i elastyczności'] },
  "Kitesurfing": { unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia', 'Poprawa szybkości i zwinności'] },
  "Windsurfing": { unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia', 'Poprawa szybkości i zwinności'] },
  "SUP (Stand Up Paddle)": { unit: "min", min: 20, max: 120, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa zdrowia i samopoczucia'] },
  "Łucznictwo": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Poprawa zdrowia i samopoczucia'] },
  "Jeździectwo": { unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia'] },
  "Paintball": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności', 'Budowa masy mięśniowej (siła)'] },
  "Airsoft": { unit: "min", min: 20, max: 120, goals: ['Poprawa szybkości i zwinności'] },
  "Żeglarstwo": { unit: "min", min: 20, max: 120, goals: ['Poprawa zdrowia i samopoczucia'] },
  "Turystyka górska": { unit: "min", min: 20, max: 120, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa zdrowia i samopoczucia'] },
  "Bieg na orientację": { unit: "km", min: 2, max: 20, goals: ['Poprawa wytrzymałości (kondycji)', 'Poprawa szybkości i zwinności'] }
};



function scaleGoal(min, max, intensity) {
  const scaleMap = {
    "Niska": 0.6,
    "Średnia": 0.8,
    "Wysoka": 1.0,
    "Bardzo wysoka": 1.2
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

    // Jeżeli nie mamy danych o tej aktywności – pomiń
    if (!config) continue;

     let randomDayIndex = Math.floor(Math.random() * weekDays.length);
     let dayName = weekDays[randomDayIndex]


    // Wygeneruj sensowny cel
    const trainingGoal = Math.round(scaleGoal(config.min, config.max, intensity)/5)*5;

    const hour  = getTimeOfDay(time)



    // Wyrównaj do długości treningu użytkownika


    // Zbuduj entry
    trainingPlan.push({
      activity: { label: randomActivityName },
      dayOfTheWeek: randomDayIndex,
      trainingDays: dayName,
      trainingUnit: config.unit,
      timeOfDay: hour,
      trainingGoalValue: trainingGoal
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