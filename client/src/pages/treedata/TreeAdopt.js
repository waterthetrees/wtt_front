import React, { useState, useRef, useEffect } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useForm } from 'react-hook-form';
import format from 'date-fns/format';
import './TreeData.scss';
// import { putData, postData } from '../../api/queries';

const filteredObj = (obj) => Object.entries(obj)
  // eslint-disable-next-line no-unused-vars
  .filter(([_, value]) => !!value)
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

const TreeAdopt = ({
  idTree, common,
  email, setAdoptTree,
  mutateTreeUser, mutateHistory,
}) => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  // const treeHistoryObj = useQuery(['treehistory', { currentTreeId: idTree }], getData);

  const mountedRef = useRef(true);

  // console.log('user', user);
  const handleSubmit = async () => {
    const functionName = 'handleadoptTree';
    if (!isAuthenticated) loginWithRedirect();

    try {
      const dateVisit = format(new Date(), 'yyyy/MM/dd HH:mm:ss');
      const sendTreeHistory = {
        idTree,
        date_visit: dateVisit,
        comment: `${common} was adopted by ${user.nickname}`,
        volunteer: user.nickname,
        email: user.email,
      };

      const sendTreeUser = {
        idTree,
        common,
        dateAdopted: dateVisit,
        volunteer: user.nickname,
        email,
      };

      console.log('1sendTreeHistory', sendTreeHistory);
      console.log('2sendTreeUser', sendTreeUser);
      // mutateHistory.mutate(['treehistory', sendTreeHistory]);
      // mutateTreeUser.mutate(['treeuser', sendTreeUser]);
      setAdoptTree(false);
      return sendTreeUser;
    } catch (err) {
      console.error('CATCH', functionName, 'err', err);
      return err;
    }
  };

  useEffect(() => () => {
    mountedRef.current = false;
  }, []);

  return (
    <div className="flex-grid text-left">
      <h1>
        {common}
        {' '}
        Adoption
      </h1>

      <div className="treehistory-list">
        <h4>Location</h4>
        It will be easiest to adopt this tree if you
        live at least one block from this tree.
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
      <div className="treehistory-list">
        <h4>
          Adopt this
          {' '}
          {common}
          {' '}
          tree?
        </h4>
      </div>

      <div className="treehistory-list">
        <span>
          <ButtonGroup>
            <Button
              className="treeadopt-btn"
              size="lg"
              color="secondary"
              id="noadoptTree"
              name="noadoptTree"
              outline
              onClick={() => setAdoptTree(false)}
            >
              Cancel
            </Button>
            <Button
              className="treeadopt-btn"
              size="lg"
              color="success"
              id="yesadoptTree"
              name="yesadoptTree"
              onClick={handleSubmit}
            >
              Yes Adopt
              {' '}
              {common}
            </Button>
          </ButtonGroup>
        </span>
      </div>
    </div>
  );
};

export default TreeAdopt;
