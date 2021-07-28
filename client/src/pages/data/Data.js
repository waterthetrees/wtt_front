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

function chooseData(treeList) {
  return {
    'California Natives': topTreesCaliforniaNative,
    'Food Trees': topTreesUSFood,
    'San Francisco': topTreesSanFrancisco,
  }[treeList];
}

export default function Data() {
  // const componentName = 'Data';
  const dataArray = ['California Natives', 'Food Trees'];
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
    const newDataChoice = chooseData(event.target.value);
    setDropdownLabel(event.target.value);
    setTreeType(newDataChoice);
  };

  return (
    <div className="data">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Tree Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={treeDropdownLabel}
          onChange={handleChange}
        >
          <MenuItem value="Food Trees">US Food Trees</MenuItem>
          <MenuItem value="California Natives">California Natives</MenuItem>
          <MenuItem value="San Francisco">San Francisco Street Trees</MenuItem>
          )
        </Select>
      </FormControl>
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
    <div className="data__treelist">
      {topTreesSorted
      && topTreesSorted.map((tree, index) => ((index === 0)
        ? (
          <>
            <TreeHeader
              clickHandler={clickHandler}
            />
            <Tree
              common={tree.common}
              genus={tree.genus}
              scientific={tree.scientific}
              index={index}
            />
          </>
        )
        : (
          <Tree
            common={tree.common}
            genus={tree.genus}
            scientific={tree.scientific}
            index={index}
          />
        )))}
    </div>
  );
}

function TreeHeader({
  clickHandler,
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
    </div>
  );
}

function Tree({
  common, scientific, genus, index,
}) {
  return (
    <div className="data__treelist-tree" key={`${common}${index}`}>
      <div className="data__treelist-tree-item" id="common">{common}</div>
      <div className="data__treelist-tree-item" id="scientific">{scientific}</div>
      <div className="data__treelist-tree-item" id="genus">{genus}</div>
    </div>
  );
}

export {
  topTreesCaliforniaNative,
  topTreesUSFood,
  topTreesAlameda,
  topTreesSanFrancisco,
};
