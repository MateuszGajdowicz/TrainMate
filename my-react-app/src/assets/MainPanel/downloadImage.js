export function generateImage(selectedTraining) {
  const canvas = document.createElement("canvas");
  canvas.width = 700;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  // Gradient tła
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "hsl(28, 100%, 90%)");
  gradient.addColorStop(1, "hsl(28, 100%, 60%)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dekoracyjne gwiazdki / kropki
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 3 + 1;
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Tekst ustawienia
  ctx.fillStyle = "#000";
  ctx.font = "bold 29px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Cień tekstu
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // Linie tekstu
  const lines = [
    "TrainMate",
    "🎉 Gratulacje! 🎉",
    "Udało Ci się ukończyć trening!",
    `${selectedTraining.trainingType}`,
        `${selectedTraining.trainingGoalValue} ${selectedTraining.trainingUnit}`,

    `${selectedTraining.trainingDate}`,
    'Jesteśmy z ciebie dumni. Oby tak dalej!'
  ];

  // Wyśrodkowanie pionowe całego bloku
  const lineHeight = 55;
  const totalHeight = lines.length * lineHeight;
  const startY = canvas.height / 2 - totalHeight / 2 + lineHeight / 2; 
  // + lineHeight/2 bo textBaseline = "middle"

  lines.forEach((line, index) => {
    ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
  });

  // Pobranie obrazka
  const link = document.createElement("a");
  link.download = "obrazek.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
