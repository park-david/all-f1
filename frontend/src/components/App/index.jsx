import { Routes, Route, Link } from "react-router-dom"
import HomePage from "../HomePage"
import DriversPage from "../DriversPage"
import DriverDetailsPage from '../DriverDetailsPage'
import ConstructorsPage from "../ConstructorsPage"
import ConstructorDetailsPage from "../ConstructorDetailsPage"
// import SearchPage from "../SearchPage"
import './styles.css'

export default function App() {

  return (
    <>
      <nav>
        <Link to="/">All F1</Link>
        <Link to="/drivers">Drivers</Link>
        <Link to="/constructors">Constructors</Link>
        {/* <Link to="/search">Search</Link> */}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/drivers/:driverId" element={<DriverDetailsPage />} />
          <Route path="/constructors" element={<ConstructorsPage />} />
          <Route path="/constructors/:constructorId" element={<ConstructorDetailsPage />} />
          {/* <Route path="/search" element={<SearchPage />} /> */}
        </Routes>

      </main>
    </>
  )
}