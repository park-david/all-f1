import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ConstructorsPage() {
    const [constructors, setConstructors] = useState([])

    async function getData(url) {
        const res = await fetch(url)
        const data = await res.json()
        setConstructors(data.MRData.ConstructorTable.Constructors || [])
    }

    useEffect(() => {
        getData(`https://ergast.com/api/f1/current/constructors.json`)
    }, [])

    return (
        <>
            <h1>constructors page</h1>
            <h1>Showing {constructors.length} constructors</h1>
            {constructors.map((constructor) => (
                <Link
                    key={constructor.constructorId}
                    to={`/constructors/${constructor.constructorId}`}
                    state={{ constructor }}>
                    <figure>
                        <h2>{constructor.name}</h2>
                    </figure>
                </Link>  
            ))}
        </>
    )
}
