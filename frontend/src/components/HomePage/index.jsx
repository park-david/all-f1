import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import CommentThread from '../CommentThread'
import { useState } from 'react'
import { Card } from 'semantic-ui-react'

export default function HomePage({ circuitsData }) {
    const [currentSlide, setCurrentSlide] = useState(0)

    const CarouselChange = (index) => {
        setCurrentSlide(index)
    }

    return (
        <>
            <div className='carousel'>
                <Card fluid>
                    <Carousel showThumbs={false} onChange={CarouselChange} selectedItem={currentSlide}>
                        {circuitsData.map((circuit, index) => (
                            <div className="circuits" key={circuit.raceName}>
                                <img src={`../assets/circuits/${circuit.Circuit.circuitId}.png`} alt={circuit.raceName} />
                                <p><a href={circuit.url} target="_blank">{circuit.raceName}</a> | {circuit.date}</p>
                            </div>
                        ))}
                    </Carousel>
                </Card>
                <Card fluid>
                    <div className="commentThread">
                        {circuitsData.map((circuit, index) => (
                            index === currentSlide && (<CommentThread key={circuit.Circuit.circuitId} circuitId={circuit.Circuit.circuitId} />)
                        ))}
                    </div>
                </Card>
            </div>
        </>
    )
}
