import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { topTreesCaliforniaNative } from './topTreesCaliforniaNative';
import { topTreesUSFood } from './topTreesUSFood';
import { topTreesAlameda } from './topTreesAlameda';
import { topTreesSanFrancisco } from './topTreesSanFrancisco';
import './Data.scss';

function chooseData() {
  return {
    'California Natives': topTreesCaliforniaNative,
    'Food Trees': topTreesUSFood,
    'San Francisco Street Trees': topTreesSanFrancisco,
  };
}

export default function Data() {
  // const componentName = 'Data';
  const dataArray = Object.keys(chooseData());
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const [treeType, setTreeType] = useState(topTreesCaliforniaNative);
  const [treeDropdownLabel, setDropdownLabel] = useState(dataArray[0]);

  const handleChange = (event) => {
    const newDataChoice = chooseData()[event.target.value];
    setDropdownLabel(event.target.value);
    setTreeType(newDataChoice);
  };

  return (
    <div className="data">
      <div className="data__menus">
        <div className="data__menus-item">
          <FormControl className={classes.formControl}>
            <InputLabel id="data__select-label">Tree Type</InputLabel>
            <Select
              labelId="data__select-label"
              id="data__select"
              value={treeDropdownLabel}
              onChange={handleChange}
            >
              {dataArray.map((treeSelect) => (
                <MenuItem
                  key={treeSelect}
                  value={treeSelect}
                >
                  {treeSelect}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="data__menus-item">
          {treeDropdownLabel === 'Food Trees' && (
            <a href="http://fallingfruit.org" target="_blank" rel="noreferrer">
              Thanks FallingFruit.org for the top US Food Tree Data!
            </a>
          )}
          {treeDropdownLabel === 'San Francisco Street Trees' && (
            <a href="https://www.fuf.net/" target="_blank" rel="noreferrer">
              Thanks fuf.net for the top San Francisco Street Tree Data!
            </a>
          )}
          {treeDropdownLabel === 'California Natives' && (
            <a href="https://calscape.org/loc-California/cat-Trees/ord-popular?srchcr=sc60ef7918b1949" target="_blank" rel="noreferrer">
              Thanks calscape.org for the California Natives Tree Data!
            </a>
          )}
        </div>
        <div className="data__menus-item">
          Unless otherwise specified, data are licensed as
          {' '}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noreferrer"
          >
            CC BY-NC-SA
          </a>
          {' '}
          (Creative Commons – Attribution, Non-commercial, Share-alike).
          This means that you are free to use and distribute the data so long as you
          preserve the original author/source attributions and
          do not use it (without permission) for commercial applications.
        </div>
      </div>
      {treeType && <TreeList treeType={treeType} />}
    </div>
  );
}

function TreeList({ treeType }) {
  // const componentName = 'TreeList';
  const [topTreesSorted, setTreesSorted] = useState(treeType);
  const [sortOrderAsc, setSortOrderAsc] = useState(true);

  const clickHandler = (event) => {
    const sortby = event.target.value;
    const sortedData = [...topTreesSorted].sort((a, b) => {
      const aa = a[sortby].toLowerCase();
      const bb = b[sortby].toLowerCase();
      if (sortOrderAsc) {
        if (aa > bb) return 1;
        if (bb > aa) return -1;
      }
      if (!sortOrderAsc) {
        if (aa < bb) return 1;
        if (bb < aa) return -1;
      }
      return 0;
    });
    setTreesSorted(sortedData);
    setSortOrderAsc(!sortOrderAsc);
  };

  useEffect(() => {
    setTreesSorted(treeType);
  }, [treeType]);

  return (
    <div className="data__treelist" key={treeType}>
      {topTreesSorted
      && topTreesSorted.map((tree, index) => ((index === 0)
        ? (
          <React.Fragment key={`${tree.common}${tree.scientific}0`}>
            <TreeHeader
              clickHandler={clickHandler}
              height={tree.height}
              notes={tree.notes}
              deciduousEvergreen={tree.deciduousEvergreen}
            />
            <Tree
              common={tree.common}
              genus={tree.genus}
              scientific={tree.scientific}
              height={tree.height}
              notes={tree.notes}
              deciduousEvergreen={tree.deciduousEvergreen}
              index={index}
            />
          </React.Fragment>
        )
        : (
          <Tree
            common={tree.common}
            genus={tree.genus}
            scientific={tree.scientific}
            height={tree.height}
            notes={tree.notes}
            deciduousEvergreen={tree.deciduousEvergreen}
            index={index}
            key={`${tree.common}${tree.scientific}`}
          />
        )))}
    </div>
  );
}

function TreeHeader({
  clickHandler, notes, height, deciduousEvergreen,
}) {
  return (
    <div className="data__treelist-tree-header">
      <div className="data__treelist-tree-header-item">
        <button type="button" className="data__treeheader-btn" value="common" onClick={clickHandler}>Common</button>
      </div>
      <div className="data__treelist-tree-header-item">
        <button type="button" className="data__treeheader-btn" value="scientific" onClick={clickHandler}>Scientific</button>
      </div>
      <div className="data__treelist-tree-header-item">
        <button type="button" className="data__treeheader-btn" value="genus" onClick={clickHandler}>Genus</button>
      </div>

      {height && (
        <div className="data__treelist-tree-header-item">
          <button type="button" className="data__treeheader-btn" value="height" onClick={clickHandler}>height</button>
        </div>
      )}

      {deciduousEvergreen && (
        <div className="data__treelist-tree-header-item">
          <button type="button" className="data__treeheader-btn" value="deciduousEvergreen" onClick={clickHandler}>Evergreen or Deciduous</button>
        </div>
      )}

      {notes && (
        <div className="data__treelist-tree-header-item">
          <button type="button" className="data__treeheader-btn" value="notes" onClick={clickHandler}>notes</button>
        </div>
      )}

    </div>
  );
}

function Tree({
  common, scientific, genus, index, height, notes, deciduousEvergreen,
}) {
  return (
    <div className="data__treelist-tree" key={`${common}${index}`}>
      <div className="data__treelist-tree-item" id="common">{common}</div>
      <div className="data__treelist-tree-item" id="scientific">{scientific}</div>
      <div className="data__treelist-tree-item" id="genus">{genus}</div>
      {height && <div className="data__treelist-tree-item" id="scientific">{height}</div>}
      {deciduousEvergreen && <div className="data__treelist-tree-item" id="genus">{deciduousEvergreen}</div>}
      {notes && <div className="data__treelist-tree-item" id="genus">{notes}</div>}
    </div>
  );
}

export {
  topTreesCaliforniaNative,
  topTreesUSFood,
  topTreesAlameda,
  topTreesSanFrancisco,
};
