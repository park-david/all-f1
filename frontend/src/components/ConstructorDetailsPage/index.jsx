import { useLocation } from 'react-router-dom'

export default function ConstructorDetailsPage() {
    const location = useLocation()
    const { constructor } = location.state

    return (
        <div>
            <h1>{constructor.name}</h1>
            <ul>
                <li>Country: {constructor.nationality}</li>
                <li><a href={constructor.url} target="_blank">Wiki Page</a></li>
            </ul>
        </div>
    )
}
