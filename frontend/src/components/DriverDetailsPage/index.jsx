import { useLocation } from 'react-router-dom'

export default function DriverDetailsPage() {
    const location = useLocation()
    const { driver } = location.state

    return (
        <div>
            <h1>{driver.givenName} {driver.familyName}</h1>
            <ul>
                <li>Nationality: {driver.nationality}</li>
                <li>Driver Number: {driver.permanentNumber}</li>
                <li>Born: {driver.dateOfBirth}</li>
                <li><a href={driver.url} target="_blank">Wiki Page</a></li>
            </ul>
        </div>
    )
}
