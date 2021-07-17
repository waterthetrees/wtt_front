import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import TopTrees from './topTrees';
import { topCaliforniaNativeTrees } from './topCaliforniaNativeTrees';
// import { testNatives } from './testNatives';
import { topFoodTrees } from './topFoodTrees';
// import TopTreesAlameda from './topTreesAlameda';
// import TopTreesSanFrancisco from './topTreesSanFrancisco';
import './Data.scss';

function chooseData(treeList) {
  return {
    'California Natives': topCaliforniaNativeTrees,
    'Food Trees': topFoodTrees,
  }[treeList];
}

function Data(props) {
  // const componentName = 'City';
  // const {} = Object(props);
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
  const [treeType, setTreeType] = useState(topCaliforniaNativeTrees);
  console.log('treeType', treeType);
  const [treeDropdownLabel, setDropdownLabel] = useState(dataArray[0]);
  console.log('treeDropdownLabel', treeDropdownLabel);

  const handleChange = (event) => {
    console.log('event', event.target.value);
    const newDataChoice = chooseData(event.target.value);
    console.log('newDataChoice', newDataChoice);
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
          <MenuItem value="Food Trees">Food Trees</MenuItem>
          <MenuItem value="California Natives">California Natives</MenuItem>
          )
        </Select>
      </FormControl>
      {treeType && <TreeList treeType={treeType} />}
    </div>
  );
}

function TreeList({ treeType }) {
  const [topTreesSorted, setTreesSorted] = useState(treeType);

  const clickHandler = (event) => {
    const sortby = event.target.value;
    const sortedData = [...topTreesSorted].sort((a, b) => {
      const aa = a[sortby].toLowerCase();
      const bb = b[sortby].toLowerCase();
      if (aa > bb) {
        return 1;
      }
      if (bb > aa) {
        return -1;
      }
      return 0;
    });
  };

  console.log('topTreesSorted', topTreesSorted);
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
    <div className="data__treelist-tree">
      <div className="data__treelist-tree-header-item">
        <button type="button" value="common" onClick={clickHandler}>Common</button>
      </div>
      <div className="data__treelist-tree-header-item">
        <button type="button" value="scientific" onClick={clickHandler}>Scientific</button>
      </div>
      <div className="data__treelist-tree-header-item">
        <button type="button" value="genus" onClick={clickHandler}>Genus</button>
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
export default Data;
