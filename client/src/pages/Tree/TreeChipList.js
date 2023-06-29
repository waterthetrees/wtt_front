import React from 'react';
import { Button } from '@mui/material';
import "./TreeChipList.scss";

export function TreeChip({ renderIcon, renderIconOutlined, text, addSelectionObserver, notifyObservers, tabSwitch }) {
  const [selected, setSelected] = React.useState(false);
  const clickHandler = () => {
    notifyObservers();
    tabSwitch();
    setSelected(true);
  };

  const observer = () => {
    if (selected) {
      setSelected(false);
    }
  };
  // I use an observer pattern here
  // because I only want two elements
  // to change when a tab is selected:
  // the tab itself, and the last tab
  // that was selected.

  // Strict mode may cause this
  // observer to be added twice,
  // but that's an acceptable side effect.
  React.useEffect(() => {
    addSelectionObserver(observer);
  }, []);

  return (
    <Button
      className={selected ? 'tree-chip-selected' : 'tree-chip'}
      onClick={clickHandler}
    >
      {selected ? renderIconOutlined : renderIcon}
      {text}
    </Button>
  );
}

export default function TreeChipList({ chips }) {
  const selectionObserver = [];

  const addSelectionObserver = (observer) => {
    selectionObserver.push(observer);
  };

  const notifyObservers = () => {
    for (const observer of selectionObserver) {
      observer();
    }
  };

  return (
    <div className="tree-chip-list">
      {chips.map((chip) => (
        <TreeChip
          renderIcon={chip.renderIcon}
          renderIconOutlined={chip.renderIconOutlined}
          text={chip.text}
          addSelectionObserver={addSelectionObserver}
          notifyObservers={notifyObservers}
          tabSwitch={chip.switchTab}
        />
      ))}
    </div>
  );
}
