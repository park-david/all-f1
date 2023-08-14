import { useParams, Link } from "react-router-dom"
import { Grid, Image, Card } from 'semantic-ui-react'

export default function ConstructorDetailsPage({ constructorsData, driversData }) {
    const { constructorId } = useParams()
    const constructorList = constructorsData[0]?.ConstructorStandings || []
    const constructorIndex = constructorList.findIndex((constructorIndex) => constructorIndex.Constructor.constructorId === constructorId)
    const { Constructor: constructor, position, points, wins } = constructorList[constructorIndex] || {}

    const teamDrivers = driversData[0]?.DriverStandings.filter((driverIndex) => driverIndex.Constructors[0]?.constructorId === constructorId)

    return (
        <div>
            <Card>
                <h1>{constructor.name}</h1>
            </Card>
            <Grid columns={2} stackable>
                <Card>
                    <Grid.Column width={4}>
                        <Image src={`../assets/constructors/${constructorId}.jpg`} />
                    </Grid.Column>
                </Card>
                <Grid.Column width={12}>
                    <div className="constructorDetails">
                        <Card>
                            <ul>
                                <li>Country: {constructor.nationality}</li>
                                <li>Position: {position}</li>
                                <li>Points: {points}</li>
                                <li>Wins: {wins}</li>
                                <li><a href={constructor.url} target="_blank" rel="noopener noreferrer">Wiki Page</a></li>
                            </ul>
                        </Card>
                        {teamDrivers && teamDrivers.length > 0 && (
                            <Card>
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
                            </Card>
                        )}
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    )
}
