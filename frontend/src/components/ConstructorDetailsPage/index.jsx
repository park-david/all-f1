import { useParams, Link } from "react-router-dom"

export default function ConstructorDetailsPage({ constructorsData, driversData }) {
    const { constructorId } = useParams()
    const constructorList = constructorsData[0]?.ConstructorStandings || []
    const constructorIndex = constructorList.findIndex(
        (constructorIndex) => constructorIndex.Constructor.constructorId === constructorId
    )
    const { Constructor: constructor, position, points, wins } = constructorList[constructorIndex] || {}

    const teamDrivers = driversData[0]?.DriverStandings.filter(
        (driverIndex) =>
            driverIndex.Constructors[0]?.constructorId === constructorId
    )

    return (
        <div>
            <h1>{constructor.name}</h1>
            <ul>
                <li>Country: {constructor.nationality}</li>
                <li>Position: {position}</li>
                <li>Points: {points}</li>
                <li>Wins: {wins}</li>
                <li><a href={constructor.url} target="_blank">Wiki Page</a></li>
            </ul>
            {teamDrivers && teamDrivers.length > 0 && (
                <div>
                    <h2>Drivers:</h2>
                    <div className="drivers">
                        <ul>
                            {teamDrivers.map((driverIndex) => {
                                const driver = driverIndex.Driver
                                return (
                                    <li key={driver.driverId}>
                                        <Link to={`/drivers/${driver.driverId}`}>
                                            {driver.givenName} {driver.familyName}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}
