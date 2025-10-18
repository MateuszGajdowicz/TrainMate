const admin = require('firebase-admin');
const cron = require('node-cron');
const sgMail = require('@sendgrid/mail');

admin.initializeApp({
  credential: admin.credential.cert(require(process.env.FIREBASE_SERVICE_ACCOUNT))
});

const db = admin.firestore();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendReminder(email, activity) {
  const msg = {
    to: email,
    from: 'trainmateapp@gmail.com',
    subject: `Przypomnienie o treningu: ${activity.activityType}`,
    text: `Hej! Twój trening "${activity.activityType}" zaczyna się ${activity.activityDate} o ${activity.activityHour}.`,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Wysłano mail do ${email} o treningu "${activity.activityType}"`);
  } catch (err) {
    console.error('❌ Błąd przy wysyłce maila:', err);
  }
}

cron.schedule('* * * * *', async () => {
  const now = new Date();
  console.log(`\n⏱ Sprawdzanie aktywności o ${now.toLocaleTimeString()}`);

  const activitiesSnap = await db.collection('Activities').get();
  console.log(`📋 Znaleziono ${activitiesSnap.size} aktywności w bazie`);

  if (activitiesSnap.empty) return;

  for (const doc of activitiesSnap.docs) {
    const activity = doc.data();
    const activityId = doc.id;
    const activityDateTime = new Date(`${activity.activityDate}T${activity.activityHour}:00`);
    const diff = (activityDateTime - now) / 1000 / 60; // różnica w minutach

    const userQuery = await db.collection('UserInformation')
      .where('userID', '==', activity.userID)
      .limit(1)
      .get();

    if (userQuery.empty) {
      console.log(`⚠️ Brak danych użytkownika dla userID ${activity.userID}`);
      continue;
    }

    const userData = userQuery.docs[0].data();
    const email = userData.email;

    if (!userData.areNotificationSent) {
      console.log(`🔕 Użytkownik ${email} ma WYŁĄCZONE powiadomienia — pomijam.`);
      continue;
    }

    if (activity.reminderSent) {
      console.log(`ℹ️ Przypomnienie dla "${activity.activityType}" już wysłane, pomijam.`);
      continue;
    }

    if (!email) {
      console.log(`⚠️ Brak adresu email dla userID ${activity.userID}`);
      continue;
    }

    if (diff > 0 && diff <= 30) {
      console.log(`✉️ Wysyłam mail do ${email} o treningu "${activity.activityType}" (za ${Math.round(diff)} min)`);
      await sendReminder(email, activity);

      await db.collection('Activities').doc(activityId).update({ reminderSent: true });
    } else {
      console.log(`⏳ Trening "${activity.activityType}" użytkownika ${email} nie jest w ciągu 30 minut (różnica: ${Math.round(diff)} min)`);
    }
  }

  console.log('✅ Sprawdzenie zakończone');
});
