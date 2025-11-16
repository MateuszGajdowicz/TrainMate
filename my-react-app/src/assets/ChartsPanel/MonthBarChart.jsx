import { useEffect, useState } from 'react'
import Select from 'react-select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import './MonthBarChart.css'
function MonthBarChart({ trainingOptions, activitesList, FormatActivities, getUnit }) {
  let trainingOptionsForSelect = trainingOptions.map(element => ({ value: element, label: element }))
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const months = [
    { id: 1, name: 'Styczeń' },
    { id: 2, name: 'Luty' },
    { id: 3, name: 'Marzec' },
    { id: 4, name: 'Kwiecień' },
    { id: 5, name: 'Maj' },
    { id: 6, name: 'Czerwiec' },
    { id: 7, name: 'Lipiec' },
    { id: 8, name: 'Sierpień' },
    { id: 9, name: 'Wrzesień' },
    { id: 10, name: 'Październik' },
    { id: 11, name: 'Listopad' },
    { id: 12, name: 'Grudzień' },
  ]

  const [statsInfo, setStatsInfo] = useState({
    biggestMonth: '',
    biggestValue: 0,
    lowestMonth: '',
    lowestvalue: 0,
  })
  const [statsInfoMonth, setStatsInfoMonth] = useState({
    allTrainingsCount: 0,
    biggestActivity: '',
    biggestCount: 0,
    lowestAcitivity: '',
    lowestCount: 0,
  })

  const [caloriesInfo, setCaloriesInfo] = useState({
    biggestCaloriesActivity: '',
    biggestCaloriesActivityValue: 0,
    summedCalories: 0,
    averageCalories: 0,
  })

  const [timeInfo, setTimeInfo] = useState({
    longestActivity: '',
    LongestActivityTime: 0,
    summedTime: 0,
    averageTime: 0,
  })

  const [radioActivityValue, setRadioActivityValue] = useState('all')
  const [selectedActivities, setSelectedActivities] = useState([])
  const [activitiesAnalyzedGoal, setActivitiesAnalyzedGoal] = useState('Ilość treningów')

  const [displayedChartData, setDisplayedChartData] = useState([])

  const [firstMonthSelect, setFirstMonthSelect] = useState('Wybierz miesiąc')
  const [secondMonthSelect, setSecondMonthSelect] = useState('Wybierz miesiąc')
  const [monthDiff, setMonthDiff] = useState(0)
  const [change, setChange] = useState('Progres')
  const [isWarningDisplayed, setIsWarningDisplayed] = useState(false)
  const [unit, setUnit] = useState('')

  const [selectedMonth, setSelectedMonth] = useState(null)

  function getBarChartStats(sortedList) {
    let biggestMonth
    let biggestValue = 0
    let lowestMonth
    let lowestvalue = Infinity
    for (let i = 0; i < sortedList.length; i++) {
      if (sortedList[i].value > biggestValue) {
        biggestMonth = sortedList[i].month
        biggestValue = sortedList[i].value
      }
      if (sortedList[i].value < lowestvalue) {
        lowestMonth = sortedList[i].month
        lowestvalue = sortedList[i].value
      }
    }
    setStatsInfo({
      biggestMonth: biggestMonth,
      biggestValue: biggestValue,
      lowestMonth: lowestMonth,
      lowestvalue: lowestvalue,
    })
  }

  function handleActivitiesByMonths(activitesList, activitiesGoal) {
    let typeFilteredActivities = activitesList
    if (radioActivityValue === 'one') {
      typeFilteredActivities = activitesList.filter(element =>
        selectedActivities.some(activity => activity.value === element.activityType)
      )
    }

    let formatedActivities = FormatActivities(typeFilteredActivities, activitiesGoal)
    let finalArray = []
    for (let i = 0; i < months.length; i++) {
      let monthObject = { id: i, month: months[i].name, value: 0 }
      for (let j = 0; j < formatedActivities.length; j++) {
        if (new Date(formatedActivities[j].date).getMonth() + 1 === months[i].id) {
          monthObject.value += formatedActivities[j].value
        }
      }
      finalArray.push(monthObject)
    }
    getBarChartStats(finalArray)
    console.log(finalArray)
    return finalArray
  }

  useEffect(() => {
    setUnit(getUnit(activitiesAnalyzedGoal))
    setDisplayedChartData(handleActivitiesByMonths(activitesList, activitiesAnalyzedGoal))
    console.log({ displayedChartData })
  }, [activitiesAnalyzedGoal, radioActivityValue, selectedActivities, activitesList])

  function CompareMonths() {
    if (firstMonthSelect !== 'Wybierz miesiąc' && secondMonthSelect !== 'Wybierz miesiąc') {
      let FirstMonthInfo = displayedChartData.find(element => element.month === firstMonthSelect)
      let SecondMonthInfo = displayedChartData.find(element => element.month === secondMonthSelect)

      let diff = SecondMonthInfo.value - FirstMonthInfo.value
      let percentageDiff = (diff / FirstMonthInfo.value) * 100
      let displayedPercentage = Math.abs(percentageDiff).toFixed(0)
      if (SecondMonthInfo.id > FirstMonthInfo.id) {
        setIsWarningDisplayed(false)
        if (FirstMonthInfo.value === 0) {
          if (SecondMonthInfo.value === 0) {
            setMonthDiff(0)
          } else {
            setMonthDiff(100)
          }
        } else {
          setMonthDiff(displayedPercentage)
        }
        if (percentageDiff > 0) {
          setChange('Progres')
        } else if (percentageDiff < 0) {
          setChange('Regres')
        }
      } else {
        setIsWarningDisplayed(true)
      }
    }
  }

  useEffect(() => {
    CompareMonths()
  }, [firstMonthSelect, secondMonthSelect, activitiesAnalyzedGoal, selectedActivities, activitesList])

  function analyzeSelectedMonth(selectedMonth) {
    if (!selectedMonth) return

    let selectedMonthInfo = months.find(element => element.name === selectedMonth)
    let monthFilteredActivities = activitesList.filter(
      element => new Date(element.activityDate).getMonth() + 1 === selectedMonthInfo.id
    )

    console.log({ monthFilteredActivities })

    let longestActivity
    let LongestActivityTime = 0
    let summedTime = 0
    for (let i = 0; i < monthFilteredActivities.length; i++) {
      if (monthFilteredActivities[i].activityGoal === 'Czas') {
        summedTime += Number(monthFilteredActivities[i].activityGoalValue)

        if (monthFilteredActivities[i].activityGoalValue > LongestActivityTime) {
          LongestActivityTime = monthFilteredActivities[i].activityGoalValue
          longestActivity = monthFilteredActivities[i]
        }
      } else {
        summedTime += Number(monthFilteredActivities[i].activitySecondGoalValue)

        if (monthFilteredActivities[i].activitySecondGoalValue > LongestActivityTime) {
          LongestActivityTime = monthFilteredActivities[i].activitySecondGoalValue
          longestActivity = monthFilteredActivities[i]
        }
      }
    }
    let averageTime = summedTime / monthFilteredActivities.length
    setTimeInfo({
      longestActivity: longestActivity,
      LongestActivityTime: LongestActivityTime,
      summedTime: summedTime,
      averageTime: averageTime,
    })

    let formatedActivities = FormatActivities(monthFilteredActivities, activitiesAnalyzedGoal)
    console.log({ formatedActivities })

    let biggestCaloriesActivityValue = 0
    let biggestCaloriesActivity
    for (let i = 0; i < formatedActivities.length; i++) {
      if (formatedActivities[i].estimatedCalories > biggestCaloriesActivityValue) {
        biggestCaloriesActivityValue = formatedActivities[i].estimatedCalories
        biggestCaloriesActivity = formatedActivities[i]
      }
    }

    let summedCalories = formatedActivities.reduce((prev, next) => prev + next.estimatedCalories, 0)
    let averageCalories = summedCalories / formatedActivities.length

    setCaloriesInfo({
      biggestCaloriesActivity: biggestCaloriesActivity,
      biggestCaloriesActivityValue: biggestCaloriesActivityValue,
      summedCalories: summedCalories,
      averageCalories: averageCalories,
    })
    let sortedActivities = []
    for (let i = 0; i < formatedActivities.length; i++) {
      if (!sortedActivities?.some(element => element.activityType === formatedActivities[i].activityType)) {
        sortedActivities?.push({
          activityType: formatedActivities[i].activityType,
          count: 1,
          value: formatedActivities[i].value,
          estimatedCalories: formatedActivities[i].estimatedCalories,
        })
      } else {
        let currentActivity = sortedActivities?.find(
          element => element.activityType === monthFilteredActivities[i].activityType
        )
        currentActivity.count++
        currentActivity.value += Number(formatedActivities[i].value)
        currentActivity.estimatedCalories += Number(formatedActivities[i].estimatedCalories)
      }
    }
    console.log({ sortedActivities })

    let biggestActivity
    let biggestCount = 0
    let lowestAcitivity
    let lowestCount = Infinity

    for (let i = 0; i < sortedActivities.length; i++) {
      if (sortedActivities[i].count > biggestCount) {
        biggestActivity = sortedActivities[i].activityType
        biggestCount = sortedActivities[i].count
      }
      if (sortedActivities[i].count < lowestCount) {
        lowestAcitivity = sortedActivities[i].activityType
        lowestCount = sortedActivities[i].count
      }
    }
    setStatsInfoMonth({
      allTrainingsCount: monthFilteredActivities.length,

      biggestActivity: biggestActivity,
      biggestCount: biggestCount,
      lowestAcitivity: lowestAcitivity,
      lowestCount: lowestCount,
    })
  }
  useEffect(() => {
    analyzeSelectedMonth(selectedMonth)
  }, [selectedMonth, activitiesAnalyzedGoal])

  return (
    <>
      <div className="BarChartContainer" style={{ marginBottom: '0px', borderRadius: '30px 30px 0px 0px' }}>
        <div className="ChartSettingContainer" style={{ marginBottom: '0px', borderRadius: '30px 0px 0px 0px' }}>
          <h2>
            Twoja aktywność <br /> w ostatnich miesiącach
          </h2>
          <h4>Wybierz analizowane aktywności:</h4>
          <div>
            <input
              value="all"
              checked={radioActivityValue === 'all'}
              onChange={event => setRadioActivityValue(event.target.value)}
              type="radio"
              id="all6"
              name="radio6"
            />
            <label htmlFor="all6">Wszystkie aktywności</label>
          </div>
          <div>
            <input
              value="one"
              checked={radioActivityValue === 'one'}
              onChange={event => setRadioActivityValue(event.target.value)}
              type="radio"
              id="one6"
              name="radio6"
            />
            <label htmlFor="one6">Poszczególne aktywności</label>
          </div>
          {radioActivityValue === 'one' && (
            <Select
              value={selectedActivities}
              onChange={setSelectedActivities}
              classNamePrefix="rs"
              isMulti
              options={trainingOptionsForSelect}
              type="text"
              placeholder="Wybierz analizowane aktywności"
            />
          )}
          <h4>Wybierz analizowaną jednostkę</h4>
          <select
            className="Inputs"
            style={{ width: '50%' }}
            onChange={event => setActivitiesAnalyzedGoal(event.target.value)}
            name=""
            id=""
          >
            {/* <option value="Wszystkie">Wszystkie</option> */}
            <option selected value="Ilość treningów">
              Ilość treningów
            </option>
            <option value="Dystans">Dystans</option>
            <option value="Czas">Czas</option>
            <option value="Kalorie">Kalorie</option>
            <option value="Punkty">Punkty</option>
          </select>
        </div>
        {displayedChartData.reduce((prev, next) => prev + next.value, 0) === 0 ? (
          <h1 className="message">Wygląda na to, że żadne aktywności nie spełniają podanych wymagań</h1>
        ) : (
          <>
            <div className="BarChartContainer2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayedChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {displayedChartData.map((element, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={['#82ca9d', '#8884d8', '#ffc658', '#ff7f50', '#00c49f'][index % 5]}
                        onClick={() => setSelectedMonth(element.month)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ width: '50%', height: '100%' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={displayedChartData?.filter(element => element.value !== 0)}
                    dataKey="value"
                    nameKey="month"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                  >
                    {displayedChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
      <div className="MonthStatsContainer">
        <div className="CompareDiv">
          <h1>Zmierz swój progres!</h1>

          <h3>Porównaj wybrane miesiące</h3>
          <div className="selectDiv">
            <p>Od</p>

            <select
              value={firstMonthSelect || ''}
              onChange={event => setFirstMonthSelect(event.target.value)}
              className="Inputs"
              name=""
              id=""
            >
              <option disabled value="Wybierz miesiąc">
                Wybierz miesiąc
              </option>
              {months.map(element => (
                <option value={element.name}>{element.name}</option>
              ))}
            </select>
          </div>

          <div className="selectDiv">
            <p>Do</p>
            <select
              value={secondMonthSelect || ''}
              onChange={event => setSecondMonthSelect(event.target.value)}
              className="Inputs"
              name=""
              id=""
            >
              <option disabled value="Wybierz miesiąc">
                Wybierz miesiąc
              </option>
              {months.map(element => (
                <option value={element.name}>{element.name}</option>
              ))}
            </select>
          </div>
          {isWarningDisplayed ? (
            'Podaj poprawną kolejność miesięcy'
          ) : (
            <h1>
              {change} o {monthDiff} %
            </h1>
          )}
          <div className="biggestDiv">
            <h1>Najlepszy miesiąc:</h1>
            {displayedChartData.reduce((prev, next) => prev + next.value, 0) === 0 ? (
              <p>Brak danych</p>
            ) : (
              <p>
                {statsInfo.biggestMonth} - <strong>{statsInfo.biggestValue}</strong> {unit}
              </p>
            )}
            <h1>Najgorszy miesiąc</h1>
            {displayedChartData.reduce((prev, next) => prev + next.value, 0) === 0 ? (
              <p>Brak danych</p>
            ) : (
              <p>
                {statsInfo.lowestMonth} - <strong>{statsInfo.lowestvalue}</strong> {unit}
              </p>
            )}
          </div>
        </div>

        <div className="singleMonthContainer">
          {selectedMonth === null ? (
            <h1>Kliknij na wykresie, by wybrać miesiąc</h1>
          ) : (
            <>
              <div>
                <h1>{selectedMonth}</h1>
                <p>
                  Liczba wszystkich treningów: <strong>{statsInfoMonth.allTrainingsCount}</strong>
                </p>
                <h2>Najchętniej wybierany przez ciebie sport:</h2>
                <p>
                  <strong>{statsInfoMonth.biggestActivity}</strong> - liczba treningów :{' '}
                  <strong>{statsInfoMonth.biggestCount}</strong>
                </p>
                <h2>Najrzadziej wybierany przez ciebie sport:</h2>
                <p>
                  <strong>{statsInfoMonth.lowestAcitivity}</strong> - liczba treningów :{' '}
                  <strong>{statsInfoMonth.lowestCount}</strong>
                </p>
                <h2>Najdłuższy trening:</h2>
                <p>
                  {timeInfo.longestActivity.activityType} - <strong>{timeInfo.LongestActivityTime} min</strong> -{' '}
                  {timeInfo.longestActivity.activityDate}
                </p>
                <h2>Najwięcej spalonych kalorii : </h2>
                <p>
                  {caloriesInfo.biggestCaloriesActivity.activityType} -{' '}
                  <strong>{caloriesInfo.biggestCaloriesActivityValue} kcal</strong> -{' '}
                  {caloriesInfo.biggestCaloriesActivity.date}{' '}
                </p>
              </div>

              <div>
                <h2>Łącznie w miesiącu {selectedMonth}:</h2>
                <p>
                  Ćwiczyłeś przez : <strong>{timeInfo.summedTime} </strong>min
                </p>
                <p>
                  Daje to <strong>{timeInfo.averageTime.toFixed(0)} </strong>min na trening
                </p>
                <p>
                  Spaliłeś: <strong>{caloriesInfo.summedCalories}</strong> kcal
                </p>
                <p>
                  To aż <strong>{(caloriesInfo.summedCalories / 7700).toFixed(1)}</strong> zrzuconych kilogramów!
                </p>
                <p>
                  Daje to <strong>{caloriesInfo.averageCalories.toFixed(0)}</strong> kcal na trening
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
export default MonthBarChart
