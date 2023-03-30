import React from "react";
import { useSpringCarousel } from "react-spring-carousel";

export default function TreeImageCarousel({ imgs }) {
  const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
  } = useSpringCarousel({
    items: (imgs.map((img, idx) =>
      ({
        id: `img-item-${idx}`,
        renderItem: <img src={img.src} alt={img.txt} />
      })
    ))
  });

  return (
    <div>
      <button onClick={slideToPrevItem}>Prev Item</button>
      <div>{carouselFragment}</div>
      <button onClick={slideToNextItem}>Next Item</button>
    </div>
  );
}