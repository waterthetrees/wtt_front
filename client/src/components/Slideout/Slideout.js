import React from 'react';
import clsx from 'clsx';
import { Drawer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './Slideout.scss';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  slideout: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({
  buttonText, children, classNameButtonText, classNameButton,
}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className="slideout">
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          {!state[anchor] && (
            <button type="button" className={classNameButton} onClick={toggleDrawer(anchor, true)}>
              <div className={classNameButtonText}>{buttonText[anchor]}</div>
            </button>
          )}
          <div
            className={clsx(classes.list, classes.slideout, {
              [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {children}
            </Drawer>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
