import React from 'react';
import PropTypes from 'prop-types';

const BlankLayout = ({ children }) => (
  <div>
    {children}
  </div>
);

BlankLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlankLayout;
