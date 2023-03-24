import React from "react";
import Carousel from "react-material-ui-carousel";
import Example1 from "../../../../example1.jpg";
import Example2 from "../../../../example2.jpg";

export default function TreeImageCarousel() {
  const imgs = [Example1, Example2];

  return (
    <Carousel height={400}>
      {
        imgs.map((img, i) =>
          <div style={{
            display: "flex",
            backgroundColor: "black",
            height: "100%",
            alignItems: "center",
          }}>
            <img
              key={i}
              src={img}
              style={{ display: "inline-block", width: "100%", }}
            />
          </div>
        )
      }
    </Carousel>
  )
}