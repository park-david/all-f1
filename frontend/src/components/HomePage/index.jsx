import { useState, useEffect, React } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import WaitingRoom from '../WaitingRoom'

export default function HomePage() {
    const [circuits, setCircuits] = useState([]);
    const [carouselStates, setCarouselStates] = useState([])

    async function getData(url) {
        const res = await fetch(url)
        const data = await res.json()
        setCircuits(data.MRData.RaceTable.Races)
        // console.log(data.MRData.RaceTable.Races[0].Circuit.circuitId);
    }
    useEffect(() => {
        getData(`https://ergast.com/api/f1/current.json`)
    }, [])
        
    const handleCarouselChange = (index) => {
        const updatedStates = carouselStates.map((state, i) => i === index)
        setCarouselStates(updatedStates)
        console.log(carouselStates)
    }

    return (
        <>
            <h1>homepage</h1>
            <div>
                <Carousel showThumbs={false} onChange={handleCarouselChange}>
                    {circuits.map((circuit, index) => (
                        <div className='circuits' key={circuit?.raceName}>
                            <img
                                src={`../src/assets/circuits/${circuit?.Circuit?.circuitId}.png`}
                                alt={circuit?.raceName}
                            />
                            <p className="legend">
                                {circuit?.raceName} - {circuit?.date}
                            </p>
                        </div>
                    ))}
                </Carousel>
                {/* <WaitingRoom circuitId={circuits} ></WaitingRoom> */}
            </div>
        </>
    )
}