import React from 'react';
import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.array,
    ]
  ).isRequired,
};
