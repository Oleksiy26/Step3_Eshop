import React from "react";
import PropTypes from 'prop-types'

const Title = ({ title, subtitle }) => {
  return (
    <>
    {title && 
      <div className="row mt-5">
        <div className="col text-uppercase secondaryColor">
          <h5>{title}</h5>
        </div>
      </div>
    }
    {subtitle && 
      <div className="row my-5">
        <div className="col">
          <h2 className="fs-1">{subtitle}</h2>
        </div>
      </div>
    }
    </>
  );
};

Title.defaultProps = {
  title: "Cards",
  subtitle: "Your cards"
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};


export default Title;
