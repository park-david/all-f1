import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CommentThread from '../CommentThread';

export default function HomePage() {
    const [circuits, setCircuits] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    async function getData(url) {
        const res = await fetch(url);
        const data = await res.json();
        setCircuits(data.MRData.RaceTable.Races);
    }

    useEffect(() => {
        getData(`https://ergast.com/api/f1/current.json`);
    }, []);

    const CarouselChange = (index) => {
        setCurrentSlide(index);
    };

    return (
        <>
            <h1>homepage</h1>
            <div className='carousel'>
                <Carousel showThumbs={false} onChange={CarouselChange} selectedItem={currentSlide}>
                    {circuits.map((circuit, index) => (
                        <div className="circuits" key={circuit.raceName}>
                            <img src={`../src/assets/circuits/${circuit.Circuit.circuitId}.png`} alt={circuit.raceName} />
                            <p>{circuit.raceName} - {circuit.date}</p>
                        </div>
                    ))}
                </Carousel>
                <div className="commentThread">
                    {circuits.map((circuit, index) => (
                        index === currentSlide && (<CommentThread key={circuit.Circuit.circuitId} circuitId={circuit.Circuit.circuitId} />)
                    ))}
                </div>
            </div>
        </>
    );
}
