import { useState, useEffect } from 'react'

export default function HomePage() {
    const [circuits, setCircuits] = useState([]);

    async function getData(url) {
        const res = await fetch(url);
        const data = await res.json();
        setCircuits(data);
        console.log(data.MRData.RaceTable.Races);
    }

    useEffect(() => {
        getData(`https://ergast.com/api/f1/current.json`)
    }, [])
    {

        return (
            <>
                <h1>homepaasdfasdfge</h1>
            </>
        )
    }
}