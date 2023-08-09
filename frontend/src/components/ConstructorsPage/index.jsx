import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ConstructorsPage() {
    const [constructors, setConstructors] = useState([]);
    const [constructorData, setConstructorData] = useState({})

    async function getData(url) {
        const res = await fetch(url);
        const data = await res.json();
        setConstructors(data?.MRData?.ConstructorTable?.Constructors || []);
    }

    useEffect(() => {
        getData(`https://ergast.com/api/f1/current/constructors.json`);
    }, []);

    return (
        <>
            <h1>constructors page</h1>
            <h1>Showing {constructors.length} constructors</h1>
            {constructors.map((constructor) => (
                <figure key={constructor?.constructorId}>
                    <h2>{constructor?.name}</h2>
                </figure>
            ))}
            <Link to={"/constructordetails"}>Go to Details Page</Link>
        </>
    );
}
