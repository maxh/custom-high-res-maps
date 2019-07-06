// TODO: Use transparency instead of colors so gradient shows through.
// Maybe with somekind of manual per-pixel transformation in the
// Mapbox WebGL layer, after Mapbox renders but before frame is shown?
const DARK_STYLES = {
  none: "maplamps/cjxpiw8rv1efk1cp6nkd9ur8e",
  low: "maplamps/cjxpiw5av1nb51clghg7kp1c2",
  medium: "maplamps/cjxpiw2aj4ne31cnrgq6y5ujt",
  high: "maplamps/cjxpflw074kec1cmb8q35ab9z"
};

const LIGHT_STYLES = {
  none: "maplamps/cjxpcn17t4hol1cnuq3dqfaak",
  low: "maplamps/cjxpckpdf3p4y1cmkn8ku44wk",
  medium: "maplamps/cjxpckkau4hxf1cp6k3ld2w5v",
  high: "maplamps/cjwe768gw1jkc1cq92843klrh"
};

const MAPBOX_STYLES = {
  light: LIGHT_STYLES,
  dark: DARK_STYLES
};

export const getMapboxStyle = (density, theme) => MAPBOX_STYLES[theme][density];

export const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFwbGFtcHMiLCJhIjoiY2p3NmNoYmYzMGlmcTRhcWsycXNma3NqNSJ9.RBpqn0qnposf4cWpkUsq_g";
