import React from 'react';
import './TreeData.scss';

// const filteredObj = (obj) => Object.entries(obj)
//   // eslint-disable-next-line no-unused-vars
//   .filter(([_, value]) => !!value)
//   .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

export default function TreeAdoptionDirections({ common }) {
  return (
    <div className="flex-grid  border-top text-left">
      <div className="treehistory-list__header  text-center">
        <h4>
          ADOPT a TREE!
        </h4>
      </div>
      <div className="treehistory-list">
        <h4>Location</h4>
        It will be easiest to do watering if you live closer
        than one block away from this tree.
      </div>

      <div className="treehistory-list">
        <h4>Water Needs</h4>
        The
        {' '}
        {common}
        {' '}
        needs 10-20 gallons of water every 2-3 weeks in the summer for the first 2-3 years.
        If it gets really hot, please water more!
      </div>
      <div className="treehistory-list">
        <h4>Mulch Needs</h4>
        Mulch the tree once a year before summer hits or as necessary.
        Mulch helps the tree retain moisture.
      </div>
      <div className="treehistory-list">
        <h4>Maintenance</h4>
        Please add to the maintenance history when you water the tree.
      </div>
    </div>
  );
}
