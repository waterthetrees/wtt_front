import React, { useState } from "react";
import { useSpringCarousel } from "react-spring-carousel";
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowForward, Circle, CircleOutlined } from "@mui/icons-material";

function ArrowButton({ slideAction, height, children, left }) {
  const dirProp = left ? { left: 0 } : { right: 0 };

  return (
    <IconButton
      onClick={slideAction}
      sx={{ 
        position: "absolute",
        backgroundColor: "rgba(0, 128, 0, .8)",
        color: "white",
        '&:hover': {
          backgroundColor: "white",
          color: "green",
        },
        zIndex: 1,
        ...dirProp
      }}
      fontSize="large"
      color="white"
    >
      {children}
    </IconButton>
  );
}

export default function TreeImageCarousel({ imgs, width }) {
  const widths = imgs.map(img => img.width);
  const largestImgIdx = widths.indexOf(Math.max(...widths));
  const largestImgWidth = imgs[largestImgIdx].width;
  const maxWidth = Math.min(largestImgWidth, width * .8);
  const [activeItem, setActiveItem] = useState("item-0");
  const {
    useListenToCustomEvent,
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
  } = useSpringCarousel({
    itemsPerSlide: 1,
    withLoop: true,
    gutter: width,
    items: (
      imgs.map((img, i) => ({
        id: `item-${i}`,
        renderItem:
          <div style={{
            display: "flex",
            backgroundColor: "rgba(0, 0, 0, .1)",
            alignItems: "center",
            width: largestImgWidth,
            maxWidth: maxWidth,
          }}>
            <img
              key={i}
              src={img.src}
              style={{
                display: "inline-block",
                width: largestImgWidth,
                maxWidth: maxWidth,
              }}
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
      margin: "10px",
      margin: "auto",
      width: "fit-content",
    }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <ArrowButton slideAction={slideToPrevItem} left >
          <ArrowBack sx={{ fontSize: "2em" }} />
        </ArrowButton>
        <div style={{
          zIndex: 0,
          mx: "auto",
          width: largestImgWidth,
          maxWidth: maxWidth,
        }}>
          {carouselFragment}
        </div>
        <ArrowButton slideAction={slideToNextItem} >
          <ArrowForward sx={{ fontSize: "2em" }} />
        </ArrowButton>
      </div>
      <div style={{ display: "flex", alignSelf: "center", justifyContent: "center", margin: "1em", gap: ".3em", color: "green" }} >
        {indicators}
      </div>
    </div>
  );
}