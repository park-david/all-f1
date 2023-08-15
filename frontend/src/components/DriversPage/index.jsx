import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

export default function DriversPage({ driversData }) {
    const drivers = driversData[0].DriverStandings || []

    return (
        <>
            <Grid columns={3} divided stackable celled>
                {drivers.map((driverIndex) => {
                    const driver = driverIndex.Driver
                    const constructor = driverIndex.Constructors[0]
                    const position = driverIndex.position
                    const points = driverIndex.points
                    const wins = driverIndex.wins

                    return (
                        <Grid.Column key={driver.driverId}>
                            <Link
                                to={`/drivers/${driver.driverId}`}
                                state={{ driver, constructor, position, points, wins }}>
                                <figure>
                                    <h2>{driver.givenName} {driver.familyName}</h2>
                                    <p>Nationality: {driver.nationality}</p>
                                    <p>Position: {position} </p>
                                </figure>
                            </Link>
                        </Grid.Column>
                    )
                })}
            </Grid>
        </>
    )
}
