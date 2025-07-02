import { useState,useEffect } from 'react'
import './App.css'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from './firebase'
import LogIn from './assets/LogIn'
import SignUp from './assets/SignUp'
import ConfirmEmail from './assets/ConfirmEmail'
import NavBar from './assets/NavBar'
import YourTrainingsPanel from './assets/YourTrainingsPanel'
import { collection, getDocs, query,where,doc } from 'firebase/firestore'


function App() {
  const trainingOptions=["Bieganie","Rower","Pływanie","Siłownia","Joga","Stretching","HIIT","Pilates","Wspinaczka","Nordic Walking","Rolki","Deskorolka","Kajakarstwo","Wioślarstwo","Snowboard","Narciarstwo","Łyżwy","Boks","Kickboxing","Sztuki walki","Krav Maga","CrossFit","Trening funkcjonalny","Spacer","Marszobieg","Taniec","Zumba","Aqua aerobic","Trening obwodowy","Calisthenics","Gimnastyka","Parkour","Triathlon","Piłka nożna","Koszykówka","Siatkówka","Tenis","Tenis stołowy","Badminton","Squash","Golf","Bouldering","Surfing","Kitesurfing","Windsurfing","SUP (Stand Up Paddle)","Łucznictwo","Jeździectwo","Paintball","Airsoft","Żeglarstwo","Turystyka górska","Bieg na orientację"];

  const [trainingsList, setTrainingsList] = useState([])

  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isRegistered, setIsRegistered] = useState(true)
  const [isEmailConfirmDisplayed, setIsEmailConfirmDisplayed] = useState(false)
  

  const [isRunnerOpacityFull, setIsRunnerOpacityFull] = useState(false)


useEffect(()=>{
    onAuthStateChanged(auth, (u)=>{
      setUser(u)
    })
  }, [])

  function LogOut(){
    signOut(auth)
    setUser(null)
    setIsLoggedIn(false)
  }

  async function fetchTrainingsList() {
    const q = query(
      collection(db, "Trainings"),
      where("userID","==", user.uid));
      const querySnapshot = await getDocs(q);
      const trainings = querySnapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }));
    setTrainingsList(trainings)

  }
  useEffect(()=>{
    if(user){
          fetchTrainingsList();


    }
  }, [user])
  return (
    <>
    
      <div style={{opacity:isRunnerOpacityFull?"1":"0.55"}}className='BackgroundImage'></div>

      {!isLoggedIn ? (
        <>
          {!isRegistered ? (
            !isEmailConfirmDisplayed ? (
              <SignUp 
                setIsRegistered={setIsRegistered} 
                setIsEmailConfirmDisplayed={setIsEmailConfirmDisplayed} 
              />
            ) : (
              <ConfirmEmail 
                setIsEmailConfirmDisplayed={setIsEmailConfirmDisplayed} 
                setIsRegistered={setIsRegistered} 
              />
            )
          ) : (
            <LogIn user={user}setIsRegistered={setIsRegistered} setIsLoggedIn={setIsLoggedIn} />
          )}
        </>
      ) : (
        <>
          <NavBar LogOut={LogOut}/>
          <YourTrainingsPanel setTrainingsList={setTrainingsList} trainingsList={trainingsList} fetchTrainingsList={fetchTrainingsList} user={user} trainingOptions={trainingOptions}/>
 
        </>
      )}
    </>
  )
}

export default App
