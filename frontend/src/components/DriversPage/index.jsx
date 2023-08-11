import { Link } from 'react-router-dom'

export default function DriversPage({ driversData }) {
    const drivers = driversData[0].DriverStandings || []

    return (
        <>
            <h1>Drivers page</h1>
            <h1>Showing {drivers.length} drivers</h1>
            {drivers.map((driverIndex) => {
                const driver = driverIndex.Driver
                const constructor = driverIndex.Constructors[0]
                const position = driverIndex.position
                const points = driverIndex.points
                const wins = driverIndex.wins

                return (
                    <Link
                        key={driver.driverId}
                        to={`/drivers/${driver.driverId}`}
                        state={{ driver, constructor, position, points, wins }}>
                        <figure>
                            <h2>{driver.givenName} {driver.familyName}</h2>
                            <p>Nationality: {driver.nationality}</p>
                            <p>Position: {position} </p>
                        </figure>
                    </Link>
                )
            })}
        </>
    )
}
