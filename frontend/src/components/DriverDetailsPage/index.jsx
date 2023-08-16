import { useParams, Link } from "react-router-dom"
import { Grid, Image, Card, Button, Icon } from 'semantic-ui-react'

export default function DriverDetailsPage({ driversData }) {
    const { driverId } = useParams()
    const driverList = driversData[0].DriverStandings || []
    const driverIndex = driverList.findIndex(driverIndex => driverIndex.Driver.driverId === driverId)
    const { Driver: driver, Constructors: constructors, position, points, wins } = driverList[driverIndex] || {}
    const constructorId = constructors[0]?.constructorId
    const teammate = driverList.filter(driverIndex => 
        driverIndex.Driver.driverId !== driverId && driverIndex.Constructors[0]?.constructorId === constructorId)

    return (
        <div className='driverDetails'>
            <Card centered fluid>
                <h1 className='driverName'>
                    {driver.givenName} {driver.familyName}
                </h1>
            </Card>
            <Grid columns={2} stackable centered>
                <Grid.Column>
                    <Card centered>
                        <div className="driverImage">
                            <Image src={`../assets/drivers/${driverId}.png`} />
                        </div>
                    </Card>
                </Grid.Column>
                <Grid.Column>
                    <div className="driverDetails">
                        <Card centered>
                            <ul>
                                <li>Nationality: {driver.nationality}</li>
                                <li>Driver Number: {driver.permanentNumber}</li>
                                <li>Born: {driver.dateOfBirth}</li>
                                {constructors && constructors.length > 0 && (
                                    <li>Constructor: {constructors[0].name}</li>
                                )}
                                <li><a href={driver.url} target="_blank">Wiki Page</a></li>
                            </ul>
                        </Card>
                        <Card centered>
                            <ul>
                                <li>Position: {position}</li>
                                <li>Points: {points}</li>
                                <li>Wins: {wins}</li>
                            </ul>
                        </Card>
                    </div>
                </Grid.Column>
            </Grid>
            {teammate.length > 0 && (
                <Card centered>
                    <div className='teammate'>
                        <h2>Teammate:</h2>
                        <div>
                            {teammate.map((teammate) => (
                                <p key={teammate.Driver.driverId}>
                                    <Link to={`/drivers/${teammate.Driver.driverId}`}>
                                        {teammate.Driver.givenName} {teammate.Driver.familyName}
                                    </Link>
                                </p>
                            ))}
                        </div>
                    </div>
                </Card>
            )}
        </div>
    )
}
