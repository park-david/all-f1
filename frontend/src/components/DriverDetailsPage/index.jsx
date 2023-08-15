import { useParams } from 'react-router-dom'
import { Grid, Image, Card } from 'semantic-ui-react'

export default function DriverDetailsPage({ driversData }) {
    const { driverId } = useParams()
    const driverList = driversData[0]?.DriverStandings || []
    const driverIndex = driverList.findIndex(driverIndex => driverIndex.Driver.driverId === driverId)
    const { Driver: driver, Constructors: constructors, position, points, wins } = driverList[driverIndex] || {}

    return (
        <div className='driverDetails'>
            <Card centered>
                <h1 className='driverName'>
                    {driver.givenName} {driver.familyName}
                </h1>
            </Card>
            <Grid columns={2} stackable centered>
                <Card centered>
                    <Grid.Column >
                        <div className="driverImage">
                            <Image src={`../assets/drivers/${driverId}.png`} />
                        </div>
                    </Grid.Column>
                </Card>
                <Grid.Column width={100}>
                    <div className="driverDetails">
                        <Card centered>
                            <ul>
                                <li>Nationality: {driver.nationality}</li>
                                <li>Driver Number: {driver.permanentNumber}</li>
                                <li>Born: {driver.dateOfBirth}</li>
                                {constructors && constructors.length > 0 && (
                                    <li>Constructor: {constructors[0].name}</li>
                                )}
                                <li>
                                    <a href={driver.url} target="_blank">
                                        Wiki Page
                                    </a>
                                </li>
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
        </div>
    )
}
