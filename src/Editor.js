import React from "react";
import { StyleSheet, css } from "aphrodite";
import MapZoomControl from "./MapZoomControl";

import MapLampPreview from "./MapLampPreview";
import FormItem from "./FormItem";
import FormSelect from "./FormSelect";

import Button from "./Button";

function setUrlQueryString(params) {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach(key => searchParams.set(key, params[key]));
  return searchParams.toString();
}

function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

const DENSITY_OPTIONS = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
  { value: "none", label: "None" }
];

const THEME_OPTIONS = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" }
];

const FRAME_FINISH_OPTIONS = [
  { value: "black", label: "Black" },
  { value: "natural", label: "Natural" }
];

const CORD_COLOR_OPTIONS = [
  { value: "red", label: "Red" },
  { value: "black", label: "Black" }
];

class Editor extends React.Component {
  state = {
    latitude: 37.729,
    longitude: -122.36,
    zoom: 11,
    selectedDensity: DENSITY_OPTIONS[0],
    selectedTheme: THEME_OPTIONS[0],
    selectedFrameFinish: FRAME_FINISH_OPTIONS[0],
    selectedCordColor: CORD_COLOR_OPTIONS[0]
  };

  geocoderContainerRef = React.createRef();

  updateUrl = debounce(
    () => {
      const url = setUrlQueryString({
        lat: this.state.latitude,
        lon: this.state.longitude,
        zoom: this.state.zoom,
        density: this.state.selectedDensity.value,
        theme: this.state.selectedTheme.value,
        frameFinish: this.state.selectedFrameFinish.value,
        cordColor: this.state.selectedCordColor.value
      });
      this.props.history.push(`?${url}`);
    },
    500,
    false
  );

  setStateAndUpdateUrl = newState => {
    this.setState(newState);
    this.updateUrl();
  };

  handlePlusClick = () => {
    this.setStateAndUpdateUrl({
      zoom: this.state.zoom + 0.5
    });
  };

  handleMinusClick = () => {
    this.setStateAndUpdateUrl({
      zoom: this.state.zoom - 0.5
    });
  };

  handleViewportChange = viewport =>
    this.setStateAndUpdateUrl({
      latitude: viewport.latitude,
      longitude: viewport.longitude,
      zoom: viewport.zoom
    });

  handleDensitySelect = selectedDensity =>
    this.setStateAndUpdateUrl({ selectedDensity });
  handleThemeSelect = selectedTheme =>
    this.setStateAndUpdateUrl({ selectedTheme });
  handleFrameFinishSelect = selectedFrameFinish =>
    this.setStateAndUpdateUrl({ selectedFrameFinish });
  handleCordColorSelect = selectedCordColor =>
    this.setStateAndUpdateUrl({ selectedCordColor });

  render() {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.leftPanel)}>
          <header className={css(styles.header)}>Design your Map Lamp</header>
          <div className={css(styles.formItems)}>
            <FormItem name="Location">
              <div ref={this.geocoderContainerRef} />
            </FormItem>
            <FormItem name="Road density">
              <FormSelect
                value={this.state.selectedDensity}
                onChange={this.handleDensitySelect}
                options={DENSITY_OPTIONS}
              />
            </FormItem>
            <FormItem name="Map theme">
              <FormSelect
                value={this.state.selectedTheme}
                onChange={this.handleThemeSelect}
                options={THEME_OPTIONS}
              />
            </FormItem>
            <FormItem name="Frame finish">
              <FormSelect
                value={this.state.selectedFrameFinish}
                onChange={this.handleFrameFinishSelect}
                options={FRAME_FINISH_OPTIONS}
              />
            </FormItem>
            <FormItem name="Cord Color">
              <FormSelect
                value={this.state.selectedCordColor}
                onChange={this.handleCordColorSelect}
                options={CORD_COLOR_OPTIONS}
              />
            </FormItem>
          </div>
          <div className={css(styles.formButtons)}>
            <Button>Share</Button>
            <Button>Next</Button>
          </div>
        </div>
        <div className={css(styles.rightPanel)}>
          <MapZoomControl
            onPlusClick={this.handlePlusClick}
            onMinusClick={this.handleMinusClick}
          />
          <MapLampPreview
            geocoderContainerRef={this.geocoderContainerRef}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            zoom={this.state.zoom}
            onViewportChange={this.handleViewportChange}
          />
        </div>
      </div>
    );
  }
}

export default Editor;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%"
  },
  leftPanel: {
    padding: "20px",
    position: "relative",
    width: "300px",
    display: "flex",
    flexDirection: "column"
  },
  rightPanel: {
    backgroundColor: "#EEE",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  formItems: {
    flexGrow: 1
  },
  formButtons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  header: {
    fontWeight: "bold"
  }
});
