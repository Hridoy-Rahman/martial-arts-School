import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Banner = () => {
    return (
        <Carousel >
            <div>
                <img  src="https://i.ibb.co/yVXZFY5/1.jpg" />
            </div>
            <div>
                <img src="https://i.ibb.co/Nn3xKCr/4.jpg" />
            </div>
        </Carousel>
    );
};

export default Banner;
