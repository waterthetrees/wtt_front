import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MapperFilter from './MapperFilter';
import './Slideout.scss';

const WATERDROPLET = 'assets/images/map/waterdroplet.svg';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({
  buttonText, children, listItems,
  classNameButton,
  classNameButtonText,
  handleChange,
  value
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
    <div className="slideout__item">
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          {!state[anchor] && (
            <button type="button" className={classNameButton} onClick={toggleDrawer(anchor, true)}>
              <div className={classNameButtonText}>{buttonText[anchor]}</div>
            </button>
          )}

          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
          <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <MapperFilter
          value={value}
          handleChange={handleChange}
         listItems={listItems}
         />
    </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
