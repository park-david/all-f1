import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

export default function ConstructorsPage({ constructorsData }) {
    const constructors = constructorsData[0].ConstructorStandings || []

    return (
        <>
            <h1>Constructors page</h1>
            <Grid columns={2} divided>
                {constructors.map((constructorIndex) => {
                    const constructor = constructorIndex.Constructor
                    const position = constructorIndex.position
                    const points = constructorIndex.points
                    const wins = constructorIndex.wins
                    return (
                        <Grid.Column>
                            <Link
                                key={constructor.constructorId}
                                to={`/constructors/${constructor.constructorId}`}
                                state={{ constructor, position, points, wins }}
                            >
                                <figure>
                                    <h2>{constructor.name}</h2>
                                    <p>Nationality: {constructor.nationality}</p>
                                </figure>
                            </Link>
                        </Grid.Column>
                    )
                })}
            </Grid>
        </>
    )
}
