import React from "react";
import { StyleSheet, css } from "aphrodite";

import MapZoomControl from "editor/MapZoomControl";
import MapLampPreview from "editor/MapLampPreview";
import FormItem from "editor/FormItem";

import FormSelect from "editor/FormSelect";
import colors from "common/colors";

import "./geocoder-overrides.css";

import Button from "common/Button";

import { Redirect } from "react-router";

export const PANEL_WIDTH_PX = 300;

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

const parseUrl = queryString => {
  const params = new URLSearchParams(queryString);
  const getParam = key =>
    params.get(key) === "undefined" ? null : params.get(key);
  const findOption = (options, key) =>
    options.find(option => option.value === key);
  return {
    lat: parseFloat(getParam("lat")),
    lon: parseFloat(getParam("lon")),
    zoom: parseFloat(getParam("zoom")),
    placeName: getParam("placeName"),
    density: findOption(DENSITY_OPTIONS, getParam("density")),
    theme: findOption(THEME_OPTIONS, getParam("theme")),
    frameFinish: findOption(FRAME_FINISH_OPTIONS, getParam("frameFinish")),
    cordColor: findOption(CORD_COLOR_OPTIONS, getParam("cordColor"))
  };
};

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
  { value: "black", label: "Matte Black" },
  { value: "natural", label: "Baltic Birch" }
];

const CORD_COLOR_OPTIONS = [
  { value: "red", label: "Red" },
  { value: "black", label: "Black" }
];

const SF_LAT = 37.741955392356495;
const SF_LON = -122.44054521089129;
const SF_ZOOM = 12;

class Editor extends React.Component {
  constructor(props) {
    super(props);
    const params = parseUrl(props.location.search);
    this.state = {
      latitude: params.lat || SF_LAT,
      longitude: params.lon || SF_LON,
      zoom: params.zoom || SF_ZOOM,
      placeName: params.placeName || "",
      selectedDensity: params.density || DENSITY_OPTIONS[1],
      selectedTheme: params.theme || THEME_OPTIONS[1],
      selectedFrameFinish: params.frameFinish || FRAME_FINISH_OPTIONS[0],
      selectedCordColor: params.cordColor || CORD_COLOR_OPTIONS[0]
    };
  }

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
      this.props.history.replace(`?${url}`);
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

  handleSearchResult = () => {
    // We only need the hardcoded search result for when you initially
    // land on the editor from the homepage. If a search is conducted
    // from within the editor, we just want to let the geocoder manage
    // its own state, hence setting null here.
    this.setState({ placeName: null });
  };

  handleDensitySelect = selectedDensity =>
    this.setStateAndUpdateUrl({ selectedDensity });
  handleThemeSelect = selectedTheme =>
    this.setStateAndUpdateUrl({ selectedTheme });
  handleFrameFinishSelect = selectedFrameFinish =>
    this.setStateAndUpdateUrl({ selectedFrameFinish });
  handleCordColorSelect = selectedCordColor =>
    this.setStateAndUpdateUrl({ selectedCordColor });

  handleNextClick = () => this.setState({ checkout: true });

  render() {
    if (this.state.checkout) {
      return <Redirect push to={`/checkout`} />;
    }
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.previewPanel)}>
          <h1 className={css(styles.header)}>
            <a href="/" className={css(styles.headerLink)}>
              Map Lamps
            </a>
          </h1>
          <MapLampPreview
            geocoderContainerRef={this.geocoderContainerRef}
            frameFinish={this.state.selectedFrameFinish.value}
            cordColor={this.state.selectedCordColor.value}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            density={this.state.selectedDensity.value}
            theme={this.state.selectedTheme.value}
            zoom={this.state.zoom}
            placeName={this.state.placeName}
            onViewportChange={this.handleViewportChange}
            onSearchResult={this.handleSearchResult}
          />
          <MapZoomControl
            onPlusClick={this.handlePlusClick}
            onMinusClick={this.handleMinusClick}
          />
        </div>
        <div className={css(styles.formPanel)}>
          <div className={css(styles.formPanelInner)}>
            <h2 className={css(styles.formHeader)}>Design your Map Lamp</h2>
            <div className={css(styles.formItems)}>
              <FormItem name="Location">
                <div ref={this.geocoderContainerRef} />
                <div className={css(styles.hint)}>
                  Drag and zoom the map to pick a precise location
                </div>
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
          </div>
          <div className={css(styles.footer)}>
            <div className={css(styles.total)}>Total: $500</div>
            <Button onClick={this.handleNextClick}>Next</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;

// <FormItem name="Special requests (optional)">
//   <textarea
//     className={css(styles.notes)}
//     placeholder="We may be able to accomodate further customization."
//   />
// </FormItem>

const styles = StyleSheet.create({
  notes: {
    fontSize: "medium",
    padding: "6px",
    height: "4em",
    "@media (max-width: 640px)": {
      flex: 1
    }
  },
  header: {
    position: "absolute",
    top: "20px",
    left: "20px",
    margin: 0,
    cursor: "pointer",
    "@media (max-width: 800px)": {
      fontSize: "18px"
    },
    "@media (max-width: 400px)": {
      fontSize: "12px"
    }
  },
  headerLink: {
    color: "black",
    textDecoration: "none",
    cursor: "pointer"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    "@media (max-width: 800px)": {
      display: "block",
      height: "auto"
    }
  },
  formPanel: {
    position: "relative",
    display: "flex",
    flexDirection: "column"
  },
  formPanelInner: {
    width: "300px",
    margin: "20px",
    display: "flex",
    "@media (max-width: 800px)": {
      width: "auto"
    },
    flex: 1,
    flexDirection: "column"
  },
  previewPanel: {
    backgroundColor: "#EEE",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    "@media (max-width: 800px)": {
      height: "60vh"
    }
  },
  formItems: {
    flexGrow: 1,
    "@media (max-width: 800px)": {
      display: "flex",
      flexWrap: "wrap"
    }
  },
  footer: {
    padding: "25px",
    backgroundColor: "#555",
    marginTop: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  total: {
    color: "white",
    fontSize: "18px",
    fontWeight: "bold"
  },
  formHeader: {
    fontWeight: "bold"
  },
  hint: {
    marginTop: "5px",
    fontSize: "small",
    color: colors.textGray
  }
});
