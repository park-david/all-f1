import { Routes, Route, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import HomePage from "../HomePage"
import DriversPage from "../DriversPage"
import DriverDetailsPage from '../DriverDetailsPage'
import ConstructorsPage from "../ConstructorsPage"
import ConstructorDetailsPage from "../ConstructorDetailsPage"
import './styles.css'

export default function App() {
  const [circuitsData, setCircuitsData] = useState([])
  const [driversData, setDriversData] = useState([])
  const [constructorsData, setConstructorsData] = useState([])

  async function getCircuitsData(url) {
    console.log('circuits data api call')
    const res = await fetch(url)
    const data = await res.json()
    setCircuitsData(data.MRData.RaceTable.Races || [])
  }

  async function getDriversData(url) {
    console.log('drivers data api call')
    const res = await fetch(url)
    const data = await res.json()
    setDriversData(data.MRData.StandingsTable.StandingsLists || [])
  }

  async function getConstructorsData(url) {
    console.log('constructors data api call')
    const res = await fetch(url)
    const data = await res.json()
    setConstructorsData(data.MRData.StandingsTable.StandingsLists || [])
  }

  useEffect(() => {
    getCircuitsData(`https://ergast.com/api/f1/current.json`)
    getDriversData(`https://ergast.com/api/f1/current/driverStandings.json`)
    getConstructorsData(`https://ergast.com/api/f1/current/constructorStandings.json`)
  }, [])

  return (
    <>
      <nav>
        <Link to="/">All F1</Link>
        <Link to="/drivers">Drivers</Link>
        <Link to="/constructors">Constructors</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage circuitsData={circuitsData} />} />
          <Route path="/drivers" element={<DriversPage driversData={driversData} />} />
          <Route path="/drivers/:driverId" element={<DriverDetailsPage driversData={driversData} />} />
          <Route path="/constructors" element={<ConstructorsPage driversData={driversData} constructorsData={constructorsData} />} />
          <Route path="/constructors/:constructorId" element={<ConstructorDetailsPage constructorsData={constructorsData} driversData={driversData} />} />
        </Routes>
      </main>
    </>
  )
}
