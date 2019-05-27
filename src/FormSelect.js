import React from "react";
import { StyleSheet, css } from "aphrodite";
import Select from "react-select";
import colors from "./colors";

const customStyles = {
  indicatorSeparator: (provided, state) => ({
    display: "none"
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    color: "#000",
    backgroundColor: state.isSelected
      ? colors.selectedGray
      : state.isFocused
      ? colors.hoveredGray
      : colors.white,
    ":active": {
      backgroundColor: "#FFF"
    }
  }),
  control: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    borderColor:
      state.isFocused || state.isActive
        ? colors.defaultGray
        : colors.defaultGray,
    boxShadow: "none",
    "&:hover": {
      borderColor:
        state.isFocused || state.isActive
          ? colors.defaultGray
          : colors.defaultGray,
      boxShadow: state.isFocused || state.isActive ? "none" : "none" // "0px 0px 5px #999"
    }
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: colors.defaultGray,
    "&:hover": {
      color: colors.defaultGray
    }
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  }
};

export default function(props) {
  return (
    <Select
      value={props.value}
      onChange={props.onChange}
      options={props.options}
      isClearable={false}
      isSearchable={false}
      styles={customStyles}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "20px",
    right: "20px"
  },
  button: {
    borderColor: "rgb(15,15,15)",
    borderWidth: "2px",
    borderStyle: "solid",
    height: "50px",
    width: "50px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    margin: "5px",
    userSelect: "none",
    backgroundColor: "white",
    ":hover": {
      backgroundColor: "rgb(230,230,230)",
      cursor: "pointer"
    },
    ":active": {
      backgroundColor: "rgb(190,190,190)",
      cursor: "pointer"
    }
  }
});
