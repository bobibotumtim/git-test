import { Carousel } from "react-bootstrap";
import pizza1 from "../images/pizza1.jpg";
import pizza2 from "../images/pizza2.jpg";
import pizza3 from "../images/pizza3.jpg";
import pizza4 from "../images/pizza4.jpg";
import pizza5 from "../images/pizza5.jpg";

const slides = [pizza1, pizza2, pizza3, pizza4, pizza5];

function PizzaCarousel() {
  return (
    <Carousel id="home">
      {slides.map((image, index) => (
        <Carousel.Item key={image}>
          <img
            className="carousel-image"
            src={image}
            alt={`Pizza slide ${index + 1}`}
          />

          <Carousel.Caption>
            <h1>Neapolitan Pizza</h1>
            <p>
              If you are looking for a traditional Italian pizza, the
              Neapolitan is the best option.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default PizzaCarousel;
