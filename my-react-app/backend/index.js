require('dotenv').config();

const admin = require('firebase-admin');
const cron = require('node-cron');
const sgMail = require('@sendgrid/mail');

admin.initializeApp({
  credential: admin.credential.cert(require(process.env.FIREBASE_SERVICE_ACCOUNT))
});

const db = admin.firestore();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendReminder(email, training) {
  const msg = {
    to: email,
    from: 'trainmateapp@gmail.com',
    subject: `Przypomnienie o treningu: ${training.trainingType}`,
    text: `Hej! Twój trening "${training.trainingType}" zaczyna się ${training.trainingDate} o ${training.trainingHour}.`,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Wysłano mail do ${email} o treningu "${training.trainingType}"`);
  } catch (err) {
    console.error('❌ Błąd przy wysyłce maila:', err);
  }
}

cron.schedule('* * * * *', async () => {
  const now = new Date();
  console.log(`\n⏱ Sprawdzanie treningów o ${now.toLocaleTimeString()}`);

  const trainingsSnap = await db.collection('Trainings').get();
  console.log(`📋 Znaleziono ${trainingsSnap.size} treningów w bazie`);

  if (trainingsSnap.empty) return;

  for (const doc of trainingsSnap.docs) {
    const training = doc.data();
    const trainingId = doc.id;
    const trainingDateTime = new Date(`${training.trainingDate}T${training.trainingHour}:00`);
    const diff = (trainingDateTime - now) / 1000 / 60; // różnica w minutach

    const userQuery = await db.collection('UserInformation')
      .where('userID', '==', training.userID)
      .limit(1)
      .get();

    if (userQuery.empty) {
      console.log(`⚠️ Brak danych użytkownika dla userID ${training.userID}`);
      continue;
    }

    const userData = userQuery.docs[0].data();
    const email = userData.email;

    if (!userData.areNotificationSent) {
      console.log(`🔕 Użytkownik ${email} ma WYŁĄCZONE powiadomienia — pomijam.`);
      continue;
    }

    if (training.reminderSent) {
      console.log(`ℹ️ Przypomnienie dla "${training.trainingType}" już wysłane, pomijam.`);
      continue;
    }

    if (!email) {
      console.log(`⚠️ Brak adresu email dla userID ${training.userID}`);
      continue;
    }

    if (diff > 0 && diff <= 30) {
      console.log(`✉️ Wysyłam mail do ${email} o treningu "${training.trainingType}" (za ${Math.round(diff)} min)`);
      await sendReminder(email, training);

      await db.collection('Trainings').doc(trainingId).update({ reminderSent: true });
    } else {
      console.log(`⏳ Trening "${training.trainingType}" użytkownika ${email} nie jest w ciągu 30 minut (różnica: ${Math.round(diff)} min)`);
    }
  }

  console.log('✅ Sprawdzenie zakończone');
});
