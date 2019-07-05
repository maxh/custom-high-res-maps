import React from "react";

import TopSection from "home/TopSection";
import ThreeFeatures from "home/ThreeFeatures";
import ImageCarousel from "home/ImageCarousel";
import Models from "home/Models";
import BottomSection from "home/BottomSection";

class Home extends React.Component {
  render() {
    return (
      <div>
        <TopSection />
        <ThreeFeatures />
        <ImageCarousel />
        <Models />
        <BottomSection />
      </div>
    );
  }
}

export default Home;
