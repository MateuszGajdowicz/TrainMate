// Przykładowe współczynniki spalania kalorii (średnie wartości MET)
// Dla uproszczenia przyjmujemy masę ciała 70 kg
// kalorie = MET × waga (kg) × czas (h)

const activityMET = {
  "Bieganie": 9.8,
  "Rower": 7.5,
  "Pływanie": 8.0,
  "Siłownia": 6.0,
  "Joga": 3.0,
  "Stretching": 2.3,
  "HIIT": 9.0,
  "Pilates": 3.5,
  "Wspinaczka": 8.0,
  "Nordic Walking": 5.5,
  "Rolki": 6.5,
  "Deskorolka": 5.0,
  "Kajakarstwo": 5.0,
  "Wioślarstwo": 7.0,
  "Snowboard": 5.3,
  "Narciarstwo": 6.8,
  "Łyżwy": 6.0,
  "Boks": 8.0,
  "Kickboxing": 9.0,
  "Sztuki walki": 8.5,
  "Krav Maga": 9.0,
  "CrossFit": 9.5,
  "Trening funkcjonalny": 6.5,
  "Spacer": 3.0,
  "Marszobieg": 6.0,
  "Taniec": 5.0,
  "Zumba": 6.5,
  "Aqua aerobic": 4.0,
  "Trening obwodowy": 7.0,
  "Calisthenics": 5.5,
  "Gimnastyka": 4.0,
  "Parkour": 9.5,
  "Triathlon": 10.0,
  "Piłka nożna": 7.0,
  "Koszykówka": 6.5,
  "Siatkówka": 3.5,
  "Tenis": 7.3,
  "Tenis stołowy": 4.0,
  "Badminton": 5.5,
  "Squash": 7.0,
  "Golf": 4.0,
  "Bouldering": 7.5,
  "Surfing": 3.0,
  "Kitesurfing": 5.0,
  "Windsurfing": 4.5,
  "SUP (Stand Up Paddle)": 6.0,
  "Łucznictwo": 2.5,
  "Jeździectwo": 4.3,
  "Paintball": 5.0,
  "Airsoft": 4.8,
  "Żeglarstwo": 3.0,
  "Turystyka górska": 6.0,
  "Bieg na orientację": 8.0
};

// Główna funkcja licząca kalorie
export function estimateCalories({ type, distanceKm = null, durationMin = null, weightKg = 70 }) {
  const MET = activityMET[type];
  if (!MET) {
    return null; // nieznana aktywność
  }

  if (durationMin) {
    const hours = durationMin / 60;
    const kcal = MET * weightKg * hours;
    return Math.round(kcal);
  }

  if (distanceKm) {
    // Średnie tempo: km/h (dla uproszczenia różne dla sportów)
    const averageSpeed = {
      "Bieganie": 9,
      "Rower": 18,
      "Spacer": 5,
      "Nordic Walking": 6,
      "Rolki": 15,
      "Pływanie": 3,
      "Kajakarstwo": 6,
      "Wioślarstwo": 7
    };

    const speed = averageSpeed[type] || 6; // domyślna prędkość
    const hours = distanceKm / speed;
    const kcal = MET * weightKg * hours;
    return Math.round(kcal);
  }

  return null; // brak wystarczających danych
}
