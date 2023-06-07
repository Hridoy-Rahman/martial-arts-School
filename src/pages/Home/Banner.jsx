import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Banner = () => {
    return (
        <Carousel>
            <div>
                <img src="https://i.ibb.co/yVXZFY5/1.jpg" />
            </div>
            <div>
                <img src="https://i.ibb.co/87z7rTL/2.jpg"/>
            </div>
            <div>
                <img src="https://i.ibb.co/NNS1LKv/3.jpg" />
            </div>
        </Carousel>
    );
};

export default Banner;