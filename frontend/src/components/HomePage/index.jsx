import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CommentThread from '../CommentThread';
import { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';

export default function HomePage({ circuitsData }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const CarouselChange = (index) => {
        setCurrentSlide(index);
    };

    // Find the index of the upcoming circuit based on the current date
    const findUpcomingCircuitIndex = () => {
        const currentDate = new Date();
        for (let i = 0; i < circuitsData.length; i++) {
            const circuitDate = new Date(circuitsData[i].date);
            if (circuitDate > currentDate) {
                return i;
            }
        }
        return 0; // Default to the first circuit if no upcoming circuit is found
    };

    useEffect(() => {
        // Set the initial state to the upcoming circuit on component load
        const upcomingCircuitIndex = findUpcomingCircuitIndex();
        setCurrentSlide(upcomingCircuitIndex);
    }, [circuitsData]); // Use circuitsData as a dependency to update when the data changes

    return (
        <>
            <div className='carousel'>
                <Card fluid>
                    <Carousel showThumbs={false} onChange={CarouselChange} selectedItem={currentSlide}>
                        {circuitsData.map((circuit, index) => (
                            <div className="circuits" key={circuit.raceName}>
                                <h2><a href={circuit.url} target="_blank">{circuit.raceName}</a>|{circuit.date}</h2>
                                <img src={`../assets/circuits/${circuit.Circuit.circuitId}.png`} alt={circuit.raceName} />
                            </div>
                        ))}
                    </Carousel>
                </Card>
                <div className="commentThread">
                    {circuitsData.map((circuit, index) => (
                        index === currentSlide && (<CommentThread key={circuit.Circuit.circuitId} circuitId={circuit.Circuit.circuitId} />)
                    ))}
                </div>
            </div>
        </>
    );
}
