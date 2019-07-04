import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";

import { useWindowWidth } from "@react-hook/window-size";

// https://github.com/brainhubeu/react-carousel
// https://brainhubeu.github.io/react-carousel/docs/api/carousel
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import colors from "common/colors";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import brick from "home/images/brick.jpg";
import tree from "home/images/tree.jpg";
import white from "home/images/white.jpg";
import manhattanTree from "home/images/manhattan-tree.jpg";

const IMAGES = [brick, tree, white, manhattanTree];

export default () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const windowWidth = useWindowWidth(
    360 /* initialWidth when there is no window */,
    { wait: 100 }
  );
  const isBigScreen = windowWidth > 1000;
  return (
    <div className={css(styles.container)}>
      <Carousel
        value={selectedIndex}
        onChange={setSelectedIndex}
        slidesPerPage={isBigScreen ? 2 : 1}
        offset={120}
        centered
        infinite
        keepDirectionWhenDragging
        arrowLeft={
          isBigScreen ? <FaArrowLeft className={css(styles.arrow)} /> : null
        }
        arrowRight={
          isBigScreen ? <FaArrowRight className={css(styles.arrow)} /> : null
        }
        addArrowClickHandler
      >
        {IMAGES.map((image, index) => (
          <img
            key={index}
            className={getClassName(index, selectedIndex)}
            src={image}
            alt={`gallery preview ${index}`}
          />
        ))}
      </Carousel>
      {isBigScreen ? null : (
        <div className={css(styles.dots)}>
          <Dots
            value={selectedIndex}
            onChange={setSelectedIndex}
            number={IMAGES.length}
          />
        </div>
      )}
    </div>
  );
};

const getClassName = (index, selectedIndex) => {
  const selected = selectedIndex % IMAGES.length;
  if (selected >= 0 && index == selected) {
    return css(styles.selectedImage);
  } else if (selected < 0 && index == IMAGES.length + selected) {
    return css(styles.selectedImage);
  } else {
    return css(styles.image);
  }
};

const styles = StyleSheet.create({
  container: {
    marginBottom: "80px"
  },
  dots: {
    paddingTop: "20px"
  },
  arrow: {
    height: "20px",
    width: "20px",
    padding: "20px",
    borderRadius: "30px",
    ":hover": {
      cursor: "pointer",
      backgroundColor: colors.defaultGray
    },
    userSelect: "none",
    color: colors.textGray,
    margin: "20px",
    backgroundColor: colors.selectedGray
  },
  image: {
    height: "60vh",
    opacity: 0.6,
    transition: "opacity .5s"
  },
  selectedImage: {
    height: "60vh",
    opacity: 1,
    transition: "opacity .5s"
  }
});
