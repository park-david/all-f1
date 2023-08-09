import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DriversPage() {
    const [drivers, setDrivers] = useState([]);
    const [driverData, setDriverData] = useState({})

    async function getData(url) {
        const res = await fetch(url);
        const data = await res.json();
        setDrivers(data?.MRData?.DriverTable?.Drivers || []);
    }

    useEffect(() => {
        getData(`https://ergast.com/api/f1/current/drivers.json`);
    }, []);

    return (
        <>
            <h1>Drivers page</h1>
            <h1>Showing {drivers.length} drivers</h1>
            {drivers.map((driver) => (
                <figure key={driver?.driverId}>
                    <h2>{driver?.givenName} {driver?.familyName}</h2>
                    <p>Nationality: {driver?.nationality}</p>
                </figure>
            ))}
            <Link to={"/driverdetails"}>Go to Details Page</Link>
        </>
    );
}
