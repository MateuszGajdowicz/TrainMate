import { useState,useEffect, act, use } from 'react'
import './App.css'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from './firebase'
import LogIn from './assets/LogIn'
import SignUp from './assets/SignUp'
import ConfirmEmail from './assets/ConfirmEmail'
import NavBar from './assets/NavBar'
import YourTrainingsPanel from './assets/TrainigsPanel/YourTrainingsPanel'
import YourActivitiesPanel from './assets/ActivitiesPanel/YourActivitiesPanel'
import PlanPanel from './assets/PlanPanel/PlanPanel'
import ChallengesPanel from './assets/ChallenegesPanel/ChallengesPanel'

import { collection, getDocs, query,where,doc } from 'firebase/firestore'
import { defaultChallenges } from './assets/ChallenegesPanel/DefaultChallenges'


function App() {
  const trainingOptions=["Bieganie","Rower","Pływanie","Siłownia","Joga","Stretching","HIIT","Pilates","Wspinaczka","Nordic Walking","Rolki","Deskorolka","Kajakarstwo","Wioślarstwo","Snowboard","Narciarstwo","Łyżwy","Boks","Kickboxing","Sztuki walki","Krav Maga","CrossFit","Trening funkcjonalny","Spacer","Marszobieg","Taniec","Zumba","Aqua aerobic","Trening obwodowy","Calisthenics","Gimnastyka","Parkour","Triathlon","Piłka nożna","Koszykówka","Siatkówka","Tenis","Tenis stołowy","Badminton","Squash","Golf","Bouldering","Surfing","Kitesurfing","Windsurfing","SUP (Stand Up Paddle)","Łucznictwo","Jeździectwo","Paintball","Airsoft","Żeglarstwo","Turystyka górska","Bieg na orientację"];

  const [displayedTrainingsList, setDisplayedTrainingList] = useState([])
  const [trainingsList, setTrainingsList] = useState([])

  const [activitesList, setActivitesList] = useState([])
  const [displayedActivitiesList, setDisplayedActivitiesList] = useState([])
  const [points, setPoints] = useState(0);

  const [trainingPlan, setTrainingPlan] = useState([])
  const [trainingPlanData, setTrainingPlanData] = useState([])


  const [favourites, setFavourites] = useState([])

  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isRegistered, setIsRegistered] = useState(true)
  const [isEmailConfirmDisplayed, setIsEmailConfirmDisplayed] = useState(false)

  const [allChallengesList, setAllChallengesList] = useState([])

  
  

  const [isRunnerOpacityFull, setIsRunnerOpacityFull] = useState(false)

// 



async function FetchPersonalChallengesList() {
    const qPersonal = query(
      collection(db,"PersonalChallenges"),
      where("userID", "==", user.uid));

      const querySnapshot = await getDocs(qPersonal)
      const personalChallengesList = querySnapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()

      }));
      let allChallenges = (personalChallengesList)
      setAllChallengesList(allChallenges)
      
    }
// useEffect(()=>{
//   console.log(allChallengesList)
// }, [allChallengesList])


  // useEffect(()=>{
  //   setAllChallengesList([...defaultChallenges, ...personalChallengesList])
  // }, [personalChallengesList])

    

  async function FetchTrainingPlanList(){
        const q= query(
            collection(db, "TrainingPlanList"),
            where("userID", "==", user.uid));
            const querySnapshot = await getDocs(q)
            const trainingPlanList = querySnapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            }));
            setTrainingPlan(trainingPlanList)

            const q2 = query(
            collection(db, "TrainingPlanData"),
            where("userID", "==", user.uid));
            const querySnapshot2 = await getDocs(q2)
            const trainingPlanData = querySnapshot2.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            }));
            setTrainingPlanData(trainingPlanData)
  
    }


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
    setDisplayedTrainingList(trainings.sort((a, b) => new Date(a.trainingDate) - new Date(b.trainingDate)))
    setTrainingsList(trainings.sort((a, b) => new Date(a.trainingDate) - new Date(b.trainingDate))
)

  }
  async function fetchActivitiesList() {
    const q = query(
      collection(db, "Activities"),
      where("userID","==", user.uid));
      const querySnapshot = await getDocs(q);
      const trainings = querySnapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }));
    setDisplayedActivitiesList(trainings.sort((a, b) => new Date(a.activityDate) - new Date(b.activityDate)))
    setActivitesList(trainings.sort((a, b) => new Date(a.activityDate) - new Date(b.activityDate))
)
  }
useEffect(()=>{
  if(activitesList.length!==0){
      let newPoints = (activitesList.reduce((prev, next)=>prev+Number(next.points),0))
      console.log(newPoints)
      setPoints(newPoints)

  }

}, [activitesList])

  useEffect(()=>{
    if(user){
          fetchTrainingsList();
          fetchActivitiesList();
          FetchPersonalChallengesList();


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
          {/* <YourTrainingsPanel  favourites={favourites} setFavourites={setFavourites} displayedTrainingsList={displayedTrainingsList} setDisplayedTrainingList={setDisplayedTrainingList} setTrainingsList={setTrainingsList} trainingsList={trainingsList} fetchTrainingsList={fetchTrainingsList} user={user} trainingOptions={trainingOptions}/> */}
          {/* <YourActivitiesPanel allChallengesList={allChallengesList} trainingOptions={trainingOptions} fetchActivitiesList={fetchActivitiesList}setActivitesList={setActivitesList} activitesList={activitesList} displayedActivitiesList={displayedActivitiesList} setDisplayedActivitiesList={setDisplayedActivitiesList} user={user}/> */}
          {/* <PlanPanel trainingsList={trainingsList} fetchTrainingsList={fetchTrainingsList} FetchTrainingPlanList={FetchTrainingPlanList} setTrainingPlanData={setTrainingPlanData} trainingPlanData={trainingPlanData} setTrainingPlan={setTrainingPlan} trainingPlan={trainingPlan} user={user} trainingOptions={trainingOptions}/> */}
          <ChallengesPanel  activitesList={activitesList} trainingOptions={trainingOptions} setAllChallengesList={setAllChallengesList} allChallengesList={allChallengesList} FetchPersonalChallengesList={FetchPersonalChallengesList} user={user}/>
        </>
      )}
    </>
  )
}

export default App
