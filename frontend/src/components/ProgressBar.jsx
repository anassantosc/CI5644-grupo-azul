import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: '20px',
  borderRadius: '10px',
  backgroundColor: '#731530',
  '& .MuiLinearProgress-bar': {
    borderRadius: '10px',
    backgroundColor: 'white',
  },
}));

const ProgressBar = ({ value }) => {
  return (
    <StyledLinearProgress variant="determinate" value={value} />
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ProgressBar;