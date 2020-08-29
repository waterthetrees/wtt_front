import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const marks = [
  {
    value: 0,
  },
  {
    value: 20,
  },
  {
    value: 37,
  },
  {
    value: 100,
  },
];


const PrettoSlider = withStyles({
  root: {
    color: 'none',
    backgroundColor: 'green',/* For browsers that do not support gradients */
    background: 'linear-gradient(to right, black, red, orange, yellow, green)', /* Standard syntax (must be last) */
    height: 8,
  },
  thumb: {
    height: 50,
    width: 50,
    backgroundColor: 'black',
    marginTop: 0,
    marginLeft: 0,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
    borderRadius: 0
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 50,
    backgroundColor: 'none',
  },
  rail: {
    height: 50,
    backgroundColor: 'none',
  },
})(Slider);


export default function CustomizedSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={100} />
      <div className={classes.margin} />

      <div className={classes.margin} />
      
    </div>
  );
}