import React from 'react';
import { useSourcesQuery } from '@/api/queries';
import { Button } from '@mui/material';
import './Communities.scss';

export default function Communities({ searchValue }) {
  //TODO change searchValue and create orgs table on backend to query instead of sources
  const { data: sources } = useSourcesQuery({ source: searchValue });

  return (
    <div className="communities">
      <div className="communities__smallcolumn">
        <h2>Popular</h2>
        <p>Upcoming</p>
        <p>This Week</p>
        <hr></hr>
        <p>Your Events</p>
        <p>Your Groups</p>
        <Button variant="contained" disableElevation>
          + Create
        </Button>
      </div>

      <div className="communities__middle">
        {sources &&
          sources.map((source) => (
            <div key={source.id} className="communities__middle__card">
              <Button variant="contained" disableElevation>
                {source.id}
              </Button>
            </div>
          ))}
      </div>

      <div className="communities__smallcolumn">
        <div>
          <h2>Plant with Friends</h2>
          <p>
            Invite your friends, family, and others to Water the Trees. When you
            invite your first friend, you earn a badge!
          </p>
          <Button variant="contained" disableElevation>
            Invite Friends
          </Button>
        </div>
        <div>
          <h2>Report a Bug</h2>
          <p>
            Found a bug when using the platform? Let us know by reporting it to
            our board! We will fix it as soon as possible!
          </p>
          <Button variant="contained" disableElevation>
            Report Bug
          </Button>
        </div>
      </div>
    </div>
  );
}
