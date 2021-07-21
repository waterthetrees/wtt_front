import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import TopTrees from './topTrees';
import { topCaliforniaNativeTrees } from './topCaliforniaNativeTrees';
// import { testNatives } from './testNatives';
import { topUSFoodTrees } from './topUSFoodTrees';
// import TopTreesAlameda from './topTreesAlameda';
// import TopTreesSanFrancisco from './topTreesSanFrancisco';
import './Data.scss';

function chooseData(treeList) {
  return {
    'California Natives': topCaliforniaNativeTrees,
    'US Food Trees': topUSFoodTrees,
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
  console.log('treeType[0].common', treeType[0].common);
  const [treeDropdownLabel, setDropdownLabel] = useState(dataArray[0]);
  console.log('treeDropdownLabel[0]', treeDropdownLabel);

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
          <MenuItem value="US Food Trees">US Food Trees</MenuItem>
          <MenuItem value="California Natives">California Natives</MenuItem>
          )
        </Select>
      </FormControl>
      {treeType && <TreeList treeType={treeType} />}
    </div>
  );
}

function TreeList({ treeType }) {
  const componentName = 'TreeList';
  console.log(componentName, 'treeType[0].common', treeType[0].common);
  const [topTreesSorted, setTreesSorted] = useState(treeType);
  const [sortOrderAsc, setSortOrderAsc] = useState(true);

  const clickHandler = (event) => {
    const sortby = event.target.value;
    console.log('sortby', sortby);
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
    console.log('sortedData[0]', sortedData[0]);
    setTreesSorted(sortedData);
    setSortOrderAsc(!sortOrderAsc);
  };

  useEffect(() => {
    setTreesSorted(treeType);
  }, [treeType]);

  console.log('topTreesSorted[0].common', topTreesSorted[0].common);
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
  Data,
  topCaliforniaNativeTrees,
  topFoodTrees,
};
