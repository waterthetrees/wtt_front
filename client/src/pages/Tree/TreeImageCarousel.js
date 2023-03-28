import React from "react";
import Carousel from "react-material-ui-carousel";

export default function TreeImageCarousel({ imgs }) {
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