import { Carousel } from "react-bootstrap";
import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";


const slides = [banner1, banner2];

function HeroBanner() {
  return (
    <Carousel id="home">
      {slides.map((image, index) => (
        <Carousel.Item key={image}>
          <img
            className="carousel-image"
            src={image}
            alt={`Fashion slide ${index + 1}`}
          />

          <Carousel.Caption>
            <h1>SUMMER SALE UP TO 50%</h1>
            <p>
              If you are looking for a traditional fashion style, the
              Fashion123 is the best option.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeroBanner;
