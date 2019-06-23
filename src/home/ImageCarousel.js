import React from "react";
import { StyleSheet, css } from "aphrodite";

// https://github.com/brainhubeu/react-carousel
// https://brainhubeu.github.io/react-carousel/docs/api/carousel
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import colors from "common/colors";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import brick from "home/images/brick.jpg";
import tree from "home/images/tree.jpg";
import white from "home/images/white.jpg";
import manhattanTree from "home/images/manhattan-tree.jpg";

const IMAGES = [brick, tree, white, manhattanTree];

export default class ImageCarousel extends React.Component {
  state = {
    selectedIndex: 0
  };

  handleChange = selectedIndex => {
    this.setState({ selectedIndex });
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <Carousel
        value={selectedIndex}
        onChange={this.handleChange}
        slidesPerPage={2}
        offset={120}
        centered={true}
        infinite
        keepDirectionWhenDragging
        arrowLeft={<FaArrowLeft className={css(styles.arrow)} />}
        arrowRight={<FaArrowRight className={css(styles.arrow)} />}
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
    );
  }
}

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
