import React from 'react';
import format from 'date-fns/format';
import Favorite from '@mui/icons-material/Favorite';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const makeMaintenanceString = (history) => {
  const historyArray = Object.entries(history)
  // eslint-disable-next-line no-unused-vars
    .filter(([key, value]) => value !== 'no' && value !== null)
  // eslint-disable-next-line no-unused-vars
    .filter(([key, value]) => (
      key === 'watered'
     || key === 'mulched'
     || key === 'weeded'
     || key === 'staked'
     || key === 'braced'
     || key === 'pruned'
    ))
    .map((item) => item[0]);
  if (historyArray.length === 0) return '';
  return historyArray.join(', ');
};

export default function TreeHistory({ treeHistory }) {
  return (
    <div className="flex-grid border-top">
      {treeHistory && (
        <div className="text-center treehistory-list">
          <h4>Tree Visit History</h4>
        </div>
      )}

      {treeHistory
     && treeHistory.map((history, index) => {
       const {
         idTreehistory,
         dateVisit,
         comment,
         volunteer,
         liked,
         adopted,
       } = history || {};
       const maintenanceString = makeMaintenanceString(history);
       const keyName = `${idTreehistory}${index}`;
       return (
         <div className="treehistory-item" key={keyName}>
           <div className="treehistory-item-label">
             {format(new Date(dateVisit), 'MMMM dd yyyy')}
             {' '}
             tree visit by
             {' '}
             {volunteer || 'volunteer'}
           </div>

           {comment && (
             <div className="">
               <span>
                 <div className="treehistory-item-label">Comment:</div>
                 {' '}
                 {comment}
               </span>
             </div>
           )}

           <div>
             <span>
               {liked && (
                 <div className="treehistory-item-label">
                   <Favorite fontSize="large" />
                   {' '}
                   Liked!
                 </div>
               )}
               {adopted && (
                 <div className="treehistory-item-label">
                   {' '}
                   <CheckBoxIcon fontSize="large" />
                   {' '}
                   Adopted!
                 </div>
               )}

             </span>
           </div>

           {maintenanceString && (
             <div className="">
               <span>
                 <div className="treehistory-item-label">Maintenance Done:</div>
                 {' '}
                 {maintenanceString}
               </span>
             </div>
           )}
         </div>
       );
     })}
    </div>
  );
}
