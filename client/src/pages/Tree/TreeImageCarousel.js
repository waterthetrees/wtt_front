import React, { useState } from "react";
import { useSpringCarousel } from "react-spring-carousel";
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowForward, Circle, CircleOutlined } from "@mui/icons-material";

function ArrowButton({ slideAction, height, children, left }) {
  return (
    <IconButton
      onClick={slideAction}
      sx={{ 
        alignSelf: left ? "flex-start" : "flex-end" ,
        position: "absolute",
        top: `${height / 2}px`,
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
      {children}
    </IconButton>
  );
}

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
      <ArrowButton slideAction={slideToPrevItem} height={maxHeight} left >
        <ArrowBack sx={{ fontSize: "2em" }} />
      </ArrowButton>
      <div style={{ zIndex: 0 }}>
        {carouselFragment}
      </div>
      <ArrowButton slideAction={slideToNextItem} height={maxHeight} >
        <ArrowForward sx={{ fontSize: "2em" }} />
      </ArrowButton>
      <div style={{ display: "flex", alignSelf: "center", justifyContent: "center", margin: "1em", gap: ".3em", color: "green" }} >
        {indicators}
      </div>
    </div>
  );
}