import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./CategoryCarousel.css";
import { Button } from "react-bootstrap";
import NumberFormatter from "./NumberFormatter";

const CategoryCarousel = ({ products }) => {
  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={false}
      centerMode={true}
      centerSlidePercentage={25}
      swipeScrollTolerance={5}
      emulateTouch={true}
      selectedItem={0}
      interval={3000}
      transitionTime={500}
      showIndicators={false}
      width="100%"
      className="category-carousel"
    >
      {products.map((prod) => (
        <div
          key={prod?.id}
          style={{
            paddingRight: "20px",
            paddingTop: "20px",
          }}
          className="category-carousel-item"
        >
          <img
            src={prod?.image}
            // height="350px"
            style={{ marginBottom: "8px" }}
          />
          <p
            className="carousel-item-info"
            style={{ fontWeight: "bold", lineHeight: "30px" }}
          >
            <span className="title">{prod?.name}</span>
            <Button className="rating ml-2">
              {prod?.rating} <FaStar className="mb-1" />
            </Button>
            <br />
            <span className="price">
              ₹ <NumberFormatter number={prod?.price} />
            </span>
            <br />
            <span className="seller">{prod?.seller}</span>
          </p>
        </div>
      ))}
    </Carousel>
  );
};

export default CategoryCarousel;
