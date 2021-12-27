import React from "react";
import PropTypes from "prop-types";

const ScanedImage = ({ imageLink, title }) => {
  return (
    <div
      style={{ width: 220, height: 220 }}
      className="d-inline-flex p-2 m-2 card "
    >
      <div className="card-header">
        <b>{title}</b>
      </div>
      <img width="200" height="150" src={imageLink} alt="img" />
    </div>
  );
};

ScanedImage.propTypes = {
  imageLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ScanedImage;
