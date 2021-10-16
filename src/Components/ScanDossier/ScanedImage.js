import React from "react";
import PropTypes from "prop-types";

const ScanedImage = ({ imageLink }) => {
  return (
    <img style={{ width: "100%" }} src={imageLink} alt="img" />
  );
};

ScanedImage.propTypes = {
    imageLink: PropTypes.string.isRequired,
};

export default ScanedImage;
