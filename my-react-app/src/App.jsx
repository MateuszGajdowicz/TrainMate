import { useState, useEffect, act, use } from 'react'
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
import MainPanel from './assets/MainPanel/MainPanel'
import RankingPanel from './assets/RankingPanel/RankingPanel'
import ChartsPanel from './assets/ChartsPanel/ChartsPANEL.JSX'
import UserProfilePanel from './assets/UserProfilePanel/UserProfilePanel'
import ResetPasswordContainer from './assets/ResetPasswordContainer'


import { collection, getDocs, query, where, doc, addDoc, updateDoc } from 'firebase/firestore'
import { defaultChallenges } from './assets/ChallenegesPanel/DefaultChallenges'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  const trainingOptions = [
    'Bieganie',
    'Rower',
    'Pływanie',
    'Siłownia',
    'Joga',
    'Stretching',
    'HIIT',
    'Pilates',
    'Wspinaczka',
    'Nordic Walking',
    'Rolki',
    'Deskorolka',
    'Kajakarstwo',
    'Wioślarstwo',
    'Snowboard',
    'Narciarstwo',
    'Łyżwy',
    'Boks',
    'Kickboxing',
    'Sztuki walki',
    'Krav Maga',
    'CrossFit',
    'Trening funkcjonalny',
    'Spacer',
    'Marszobieg',
    'Taniec',
    'Zumba',
    'Aqua aerobic',
    'Trening obwodowy',
    'Calisthenics',
    'Gimnastyka',
    'Parkour',
    'Triathlon',
    'Piłka nożna',
    'Koszykówka',
    'Siatkówka',
    'Tenis',
    'Tenis stołowy',
    'Badminton',
    'Squash',
    'Golf',
    'Bouldering',
    'Surfing',
    'Kitesurfing',
    'Windsurfing',
    'SUP (Stand Up Paddle)',
    'Łucznictwo',
    'Jeździectwo',
    'Paintball',
    'Airsoft',
    'Żeglarstwo',
    'Turystyka górska',
    'Bieg na orientację',
  ]



  const [displayedTrainingsList, setDisplayedTrainingList] = useState([])
  const [trainingsList, setTrainingsList] = useState([])
  const [todayTrainings, setTodayTrainings] = useState([])

  const [activitesList, setActivitesList] = useState([])
  const [displayedActivitiesList, setDisplayedActivitiesList] = useState([])
  const [points, setPoints] = useState(0)

  const [trainingPlan, setTrainingPlan] = useState([])
  const [trainingPlanData, setTrainingPlanData] = useState([])

  const [favourites, setFavourites] = useState([])

  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistered, setIsRegistered] = useState(true)
  const [isEmailConfirmDisplayed, setIsEmailConfirmDisplayed] = useState(false)
  const [isPasswordBeingReset, setIsPasswordBeingReset] = useState(false)

  const [allChallengesList, setAllChallengesList] = useState([])

  const [userInfo, setUserInfo] = useState([])
  const [allUsersInfo, setAllUsersInfo] = useState([])

  const [isRunnerOpacityFull, setIsRunnerOpacityFull] = useState(false)

  const [username, setUsername] = useState('')

  //

  async function FetchUserInformation() {
    const q = query(collection(db, 'UserInformation'), where('userID', '==', user.uid))
    const querySnapshot = await getDocs(q)
    const userInfo = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    setUserInfo(userInfo)
  }
  useEffect(() => {
    FetchUserInformation()
  }, [])
  async function FetchAllUsers() {
    const q = query(collection(db, 'UserInformation'))
    const querySnapshot = await getDocs(q)
    const userInfo = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    const sortedUsers = userInfo.sort((a, b) => b.userPoints - a.userPoints)
    setAllUsersInfo(sortedUsers)
  }
  useEffect(() => {
    FetchAllUsers()
  }, [])

  // useEffect(()=>{
  //   console.log(allUsersInfo)
  // },[allUsersInfo])
  // useEffect(()=>{
  //   FetchAllUsers()
  // },[])
  async function FetchPersonalChallengesList() {
    const qPersonal = query(collection(db, 'PersonalChallenges'), where('userID', '==', user.uid))

    const querySnapshot = await getDocs(qPersonal)
    const personalChallengesList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    let allChallenges = personalChallengesList
    setAllChallengesList(allChallenges)
  }
  // useEffect(()=>{
  //   console.log(allChallengesList)
  // }, [allChallengesList])

  // useEffect(()=>{
  //   setAllChallengesList([...defaultChallenges, ...personalChallengesList])
  // }, [personalChallengesList])

  async function FetchTrainingPlanList() {
    const q = query(collection(db, 'TrainingPlanList'), where('userID', '==', user.uid))
    const querySnapshot = await getDocs(q)
    const trainingPlanList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    setTrainingPlan(trainingPlanList)

    const q2 = query(collection(db, 'TrainingPlanData'), where('userID', '==', user.uid))
    const querySnapshot2 = await getDocs(q2)
    const trainingPlanData = querySnapshot2.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    setTrainingPlanData(trainingPlanData)
  }

  useEffect(() => {
    onAuthStateChanged(auth, u => {
      setUser(u)
    })
  }, [])

  function LogOut() {
    signOut(auth)
    setUser(null)
    setIsLoggedIn(false)
  }

  async function fetchTrainingsList() {
    const q = query(collection(db, 'Trainings'), where('userID', '==', user.uid))
    const querySnapshot = await getDocs(q)
    const trainings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    setDisplayedTrainingList(trainings.sort((a, b) => new Date(a.trainingDate) - new Date(b.trainingDate)))
    setTrainingsList(trainings.sort((a, b) => new Date(a.trainingDate) - new Date(b.trainingDate)))
  }
  async function fetchActivitiesList() {
    const q = query(collection(db, 'Activities'), where('userID', '==', user.uid))
    const querySnapshot = await getDocs(q)
    const trainings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    setDisplayedActivitiesList(trainings.sort((a, b) => new Date(b.activityDate) - new Date(a.activityDate)))
    setActivitesList(trainings.sort((a, b) => new Date(b.activityDate) - new Date(a.activityDate)))
  }
  // useEffect(()=>{
  //   if(activitesList.length!==0){
  //       let newPoints = (activitesList.reduce((prev, next)=>prev+Number(next.points),0))
  //       console.log(newPoints)
  //       setPoints(newPoints)

  //   }

  // }, [activitesList])

  useEffect(() => {
    if (user) {
      fetchTrainingsList()
      fetchActivitiesList()
      FetchPersonalChallengesList()
      FetchTrainingPlanList()
      FetchUserInformation()
    }
  }, [user])

  async function CountPoints() {
    let summedPoints = 0
    let activitiesPoints = activitesList.reduce((prev, next) => prev + Number(next.points), 0)
    let challengesPoints = allChallengesList
      .filter(element => element.status === 'finished')
      .reduce((prev, next) => prev + Number(next.points), 0)

    summedPoints = activitiesPoints + challengesPoints

    try {
      const docRef = doc(db, 'UserInformation', userInfo[0].id)
      await updateDoc(docRef, { userPoints: summedPoints })

      FetchUserInformation()
      FetchAllUsers()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    CountPoints()
  }, [activitesList, allChallengesList])
  return (
    <>
      <div style={{ opacity: isRunnerOpacityFull ? '1' : '0.55' }} className="BackgroundImage"></div>
    <BrowserRouter>
      {!isLoggedIn ? (
        <>
          {!isRegistered ? (
            !isEmailConfirmDisplayed ? (
              <SignUp
                allUsersInfo={allUsersInfo}
                username={username}
                setUsername={setUsername}
                setIsRegistered={setIsRegistered}
                setIsEmailConfirmDisplayed={setIsEmailConfirmDisplayed}
              />
            ) : (
              <ConfirmEmail setIsEmailConfirmDisplayed={setIsEmailConfirmDisplayed} setIsRegistered={setIsRegistered} />
            )
          ) : !isPasswordBeingReset ? (
            <Routes>
              <Route path="/" element={                
                <LogIn
              setIsPasswordBeingReset={setIsPasswordBeingReset}
              user={user}
              setIsRegistered={setIsRegistered}
              setIsLoggedIn={setIsLoggedIn}
            />} />


            </Routes>

          ) : (
            <ResetPasswordContainer setIsPasswordBeingReset={setIsPasswordBeingReset} />
          )}
        </>
      ) : (
        <>
            <NavBar LogOut={LogOut} />

            <Routes>
              <Route
                path="mainPanel"
                element={
                  <MainPanel
                    FetchPersonalChallengesList={FetchPersonalChallengesList}
                    fetchActivitiesList={fetchActivitiesList}
                    fetchTrainingsList={fetchTrainingsList}
                    trainingsList={trainingsList}
                    allChallengesList={allChallengesList}
                    activitesList={activitesList}
                  />
                }
              />
              <Route
                path="trainingsPanel"
                element={
                  <YourTrainingsPanel
                    setTodayTrainings={setTodayTrainings}
                    favourites={favourites}
                    setFavourites={setFavourites}
                    displayedTrainingsList={displayedTrainingsList}
                    setDisplayedTrainingList={setDisplayedTrainingList}
                    setTrainingsList={setTrainingsList}
                    trainingsList={trainingsList}
                    fetchTrainingsList={fetchTrainingsList}
                    user={user}
                    trainingOptions={trainingOptions}
                  />
                }
              />
              <Route
                path="activitiesPanel"
                element={
                  <YourActivitiesPanel
                    userInfo={userInfo}
                    allChallengesList={allChallengesList}
                    trainingOptions={trainingOptions}
                    fetchActivitiesList={fetchActivitiesList}
                    setActivitesList={setActivitesList}
                    activitesList={activitesList}
                    displayedActivitiesList={displayedActivitiesList}
                    setDisplayedActivitiesList={setDisplayedActivitiesList}
                    user={user}
                  />
                }
              />
              <Route
                path="planPanel"
                element={
                  <PlanPanel
                    trainingsList={trainingsList}
                    fetchTrainingsList={fetchTrainingsList}
                    FetchTrainingPlanList={FetchTrainingPlanList}
                    setTrainingPlanData={setTrainingPlanData}
                    trainingPlanData={trainingPlanData}
                    setTrainingPlan={setTrainingPlan}
                    trainingPlan={trainingPlan}
                    user={user}
                    trainingOptions={trainingOptions}
                  />
                }
              />
              <Route
                path="challengesPanel"
                element={
                  <ChallengesPanel
                    activitesList={activitesList}
                    trainingOptions={trainingOptions}
                    setAllChallengesList={setAllChallengesList}
                    allChallengesList={allChallengesList}
                    FetchPersonalChallengesList={FetchPersonalChallengesList}
                    user={user}
                  />
                }
              />
              <Route
                path="rankingPanel"
                element={
                  <RankingPanel
                    activitesList={activitesList}
                    allUsersInfo={allUsersInfo}
                    userInfo={userInfo}
                    FetchAllUsers={FetchAllUsers}
                  />
                }
              />
              <Route
                path="chartsPanel"
                element={<ChartsPanel trainingOptions={trainingOptions} activitesList={activitesList} />}
              />
              <Route
                path="userProfilePanel"
                element={
                  <UserProfilePanel LogOut={LogOut} userInfo={userInfo} FetchUserInformation={FetchUserInformation} />
                }
              />
            </Routes>
        </>

      )}
              </BrowserRouter>

    </>
  )
}

export default App
