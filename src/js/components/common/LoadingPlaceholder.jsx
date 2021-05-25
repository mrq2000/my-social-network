import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const LoadingPlaceholder = ({
  height, width, className, children, ...props
}) => (
  <Box width={width} height={height} className={`loading_placeholder ${className}`} {...props}>
    {children}
  </Box>
);

LoadingPlaceholder.defaultProps = {
  className: '',
  height: '100%',
  width: '100%',
  children: null,
};

LoadingPlaceholder.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default LoadingPlaceholder;
