import { useParams } from 'react-router-dom'
import { Grid, Image } from 'semantic-ui-react'

export default function DriverDetailsPage({ driversData }) {
    const { driverId } = useParams()
    const driverList = driversData[0]?.DriverStandings || []
    const driverIndex = driverList.findIndex(driverIndex => driverIndex.Driver.driverId === driverId)
    const { Driver: driver, Constructors: constructors, position, points, wins } = driverList[driverIndex] || {}

    return (
        <div>
            <h1>
                {driver.givenName} {driver.familyName}
            </h1>
            <Grid columns={2}>
                <Grid.Column width={4}>
                    <Image src={`../src/assets/drivers/${driverId}.png`} />
                </Grid.Column>
                <Grid.Column width={12}>
                    <div className="driverDetails">
                        <ul>
                            <li>Nationality: {driver.nationality}</li>
                            <li>Driver Number: {driver.permanentNumber}</li>
                            <li>Born: {driver.dateOfBirth}</li>
                            {constructors && constructors.length > 0 && (
                                <li>Constructor: {constructors[0].name}</li>
                            )}
                            <li>
                                <a href={driver.url} target="_blank" rel="noopener noreferrer">
                                    Wiki Page
                                </a>
                            </li>
                        </ul>
                        <ul>
                            <li>Position: {position}</li>
                            <li>Points: {points}</li>
                            <li>Wins: {wins}</li>
                        </ul>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    )
}
