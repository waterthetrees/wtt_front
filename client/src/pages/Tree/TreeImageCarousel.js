import React, { useState } from "react";
import { useSpringCarousel } from "react-spring-carousel";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowForward, Circle, CircleOutlined } from "@mui/icons-material";

export default function TreeImageCarousel({ imgs }) {
  const maxWidth = Math.max(...imgs.map(img => img.width));
  const maxHeight = Math.max(...imgs.map(img => img.height));

  const [activeItem, setActiveItem] = useState("item-0");

  const {
    useListenToCustomEvent,
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
  } = useSpringCarousel({
    withLoop: true,
    gutter: 50,
    items: (
      imgs.map((img, i) => ({
        id: `item-${i}`,
        renderItem:
          <div style={{
            display: "flex",
            backgroundColor: "rgba(0, 0, 0, .1)",
            alignItems: "center",
            width: `${maxWidth}px`,
            height: `${maxHeight}px`,
          }}>
            <img
              key={i}
              src={img.src}
              style={{ display: "inline-block" }}
              alt={img.text}
            />
          </div>
      }))
    )
  });

  useListenToCustomEvent((event) => {
    if (event.eventName === "onSlideStartChange") {
      setActiveItem(event.nextItem.id)
    } 
  });

  const indicators = [];
  for (let i = 0; i < imgs.length; ++i) {
    const itemName = `item-${i}`;
    if (itemName === activeItem) {
      indicators.push(<Circle key={i} />);
    } else {
      indicators.push(<CircleOutlined key={i} />);
    }
  }

  return (
    <div style={{ 
      display: "flex",
      flexDirection: "column",
      width: `${maxWidth}px`,
      margin: "10px",
    }}>
      <IconButton
        onClick={slideToPrevItem}
        sx={{ 
          alignSelf: "flex-start",
          position: "absolute",
          top: `${maxHeight / 2}px`,
          zIndex: 1,
          backgroundColor: "rgba(0, 128, 0, .8)",
          color: "white",
          '&:hover': {
            backgroundColor: "white",
            color: "green",
          }
        }}
        fontSize="large"
        color="white"
      >
        <ArrowBack
          sx={{ fontSize: "2em" }}
        />
      </IconButton>
      <div style={{ zIndex: 0 }}>
        {carouselFragment}
      </div>
      <IconButton
        onClick={slideToNextItem}
        sx={{
          alignSelf: "flex-end",
          position: "absolute",
          top: `${maxHeight / 2}px`,
          zIndex: 1,
          backgroundColor: "rgba(0, 128, 0, .8)",
          color: "white",
          '&:hover': {
            backgroundColor: "white",
            color: "green",
          }
        }}
        fontSize="large"
      >
        <ArrowForward
          sx={{ fontSize: "2em" }}
        />
      </IconButton>
      <div style={{ display: "flex", alignSelf: "center", justifyContent: "center", margin: "1em", gap: ".3em", color: "green" }} >
        {indicators}
      </div>
    </div>
  );
}