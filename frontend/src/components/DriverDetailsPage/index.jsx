import { useParams, Link } from "react-router-dom";
import { Grid, Image, Card, Button, Icon } from 'semantic-ui-react';

export default function DriverDetailsPage({ driversData }) {
    const { driverId } = useParams();
    const driverList = driversData[0].DriverStandings || [];
    const driverIndex = driverList.findIndex(driverIndex => driverIndex.Driver.driverId === driverId);
    const { Driver: driver, Constructors: constructors, position, points, wins } = driverList[driverIndex] || {};
    const constructorId = constructors[0]?.constructorId;
    const teammate = driverList.filter(driverIndex =>
        driverIndex.Driver.driverId !== driverId && driverIndex.Constructors[0]?.constructorId === constructorId);

    // Function to get the next driver index
    const getNextDriverIndex = () => {
        return driverIndex < driverList.length - 1 ? driverIndex + 1 : 0;
    };

    // Function to get the previous driver index
    const getPreviousDriverIndex = () => {
        return driverIndex > 0 ? driverIndex - 1 : driverList.length - 1;
    };

    // Get the indices for the next and previous drivers
    const nextDriverIndex = getNextDriverIndex();
    const previousDriverIndex = getPreviousDriverIndex();

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
                                <li><a href={driver.url} target="_blank" rel="noopener noreferrer">Wiki Page</a></li>
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
            <Grid columns={3} stackable>
                <Grid.Column>
                    <div className='prevButton'>
                        {/* Previous driver button */}
                        <Link to={`/drivers/${driverList[previousDriverIndex].Driver.driverId}`}>
                            <Button icon labelPosition='left'>
                                <Icon name='left arrow' />
                                Previous Driver
                            </Button>
                        </Link>
                    </div>
                </Grid.Column>
                <Grid.Column>
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
                </Grid.Column>
                <Grid.Column>
                    <div className="nextButton">
                        {/* Next driver button */}
                        <Link to={`/drivers/${driverList[nextDriverIndex].Driver.driverId}`}>
                            <Button icon labelPosition='right'>
                                Next Driver
                                <Icon name='right arrow' />
                            </Button>
                        </Link>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );
}
