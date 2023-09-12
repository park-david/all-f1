import { useParams, Link } from "react-router-dom"
import { Grid, Image, Card, Button, Icon } from 'semantic-ui-react'

export default function ConstructorDetailsPage({ constructorsData, driversData }) {
    const { constructorId } = useParams()
    const constructorList = constructorsData[0]?.ConstructorStandings || []
    const constructorIndex = constructorList.findIndex((constructorIndex) => constructorIndex.Constructor.constructorId === constructorId)
    const { Constructor: constructor, position, points, wins } = constructorList[constructorIndex] || {}
    const teamDrivers = driversData[0]?.DriverStandings.filter((driverIndex) => driverIndex.Constructors[0]?.constructorId === constructorId)

    // Function to get the next constructor index
    const getNextConstructorIndex = () => {
        return constructorIndex < constructorList.length - 1 ? constructorIndex + 1 : 0;
    };

    // Function to get the previous constructor index
    const getPreviousConstructorIndex = () => {
        return constructorIndex > 0 ? constructorIndex - 1 : constructorList.length - 1;
    };

    // Get the indices for the next and previous constructors
    const nextConstructorIndex = getNextConstructorIndex();
    const previousConstructorIndex = getPreviousConstructorIndex();

    return (
        <div className="constructorDetailsCards">
            <Card centered fluid>
                <h1>{constructor.name}</h1>
            </Card>
            <Grid columns={2} stackable centered>
                <Grid.Column >
                        <div className="constructorImage">
                            <Image src={`../assets/constructors/${constructorId}.jpg`} />
                        </div>
                </Grid.Column>
                <Grid.Column >
                    <div className="constructorDetails">
                        <Card centered>
                            <ul>
                                <li>Country: {constructor.nationality}</li>
                                <li>Position: {position}</li>
                                <li>Points: {points}</li>
                                <li>Wins: {wins}</li>
                                <li><a href={constructor.url} target="_blank" rel="noopener noreferrer">Wiki Page</a></li>
                            </ul>
                        </Card>
                        {teamDrivers && teamDrivers.length > 0 && (
                            <Card centered>
                                <div className="constructorDrivers">
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
                <Grid columns={3} stackable>
                    <Grid.Column>
                        <div className='prevButton'>
                            {/* Previous constructor button */}
                            <Link to={`/constructors/${constructorList[previousConstructorIndex].Constructor.constructorId}`}>
                                <Button icon labelPosition='left'>
                                    <Icon name='left arrow' />
                                    Previous Constructor
                                </Button>
                            </Link>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div className="car">
                            <Image src={`../assets/cars/${constructorId}.avif`} />
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div className='nextButton'>
                            {/* Next constructor button */}
                            <Link to={`/constructors/${constructorList[nextConstructorIndex].Constructor.constructorId}`}>
                                <Button icon labelPosition='right'>
                                    <Icon name='right arrow' />
                                    Next Constructor
                                </Button>
                            </Link>
                        </div>
                    </Grid.Column>
                </Grid>
        </div>
    )
}
