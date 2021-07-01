import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {listItems.map((text) => (
          <ListItem button key={text}>
            {children}
          </ListItem>
        ))}
      </List>
    </div>
  );

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
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
