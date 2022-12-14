import React, { useState, useEffect, useRef } from 'react';
import { useSourcesQuery, useSourcesMutation } from '@/api/queries';
// import { IconButton } from '@mui/material';
import {
  // SortUp,
  // SortDown,
  LinkIcon,
  LinkOffIcon,
  UploadFileIcon,
} from '@/components/Icons';

import { GrayButton } from '@/components/Button/Button';
import PanelDrawer from '@/components/PanelDrawer/PanelDrawer';
// import CommunityTableRow from '@/components/Table/TableRow';
import { SearchBar } from '@/components/SearchBar/SearchBar';
// import Section from '@/components/Section/Section';
import { ListGrid } from '@/components/ListGrid/ListGrid';

import SideMenu from './SideMenu';
import './Communities.scss';
import { capFirstLetter } from '../../util/treeHealthUtil';

// const columnHeaders = [
//   'id',
//   'main',
//   'state',
//   'country',
//   'email',
//   'contact',
//   'who',
//   'phone',
//   'broken',
//   'info',
//   'download',
//   'source',
//   'source_url',
//   'countryCode',
//   'brokenReason',
// ];

export function createColumnHeaders(source) {
  if (!source) return [];
  const sourceKeys = Object.keys(source[0]);
  return sourceKeys.map((column) => {
    return {
      key: column,
      label: capFirstLetter(column),
    };
  });
}

export default function Communities() {
  const { data: sources } = useSourcesQuery();
  const mutateSources = useSourcesMutation();
  console.log('sources 0000', sources);
  // const [columnHeaders, setColumnHeaders] = useState();

  const columnHeaders = createColumnHeaders(sources);
  console.log('columnHeaders 0000', columnHeaders);

  const [search, setSearch] = useState('');

  const [open, setOpen] = useState(false);
  const [state, setState] = useState({});
  const [links, setLinks] = useState(sources);
  // const [country, setCountry] = useState(true);
  // const [city, setCity] = useState(true);
  // const [territory, setTerritory] = useState(true);
  // const [service, setService] = useState(true);
  // const [organization, setOrganization] = useState(true);
  const [hover, setHover] = useState(false);

  const filteredLinks = links?.filter((link) => {
    return (
      link.country.toLowerCase().includes(search.toLowerCase()) ||
      link.city.toLowerCase().includes(search.toLowerCase()) ||
      link.territory.toLowerCase().includes(search.toLowerCase()) ||
      link.service.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAddLink = async () => {
    await setOpen(false);
    const newState = {};
    newState.header = 'Add Link';
    newState.summary =
      "Didn't find your organization and want to add it to our list? Input the required text and link, then submit it. A team member will review the request, and if it meets the requirements you will see the organization on the list ASAP.";
    newState.inputs = [
      { label: 'Country', name: 'country', text: '' },
      { label: 'City', name: 'city', text: '' },
      { label: 'State', name: 'state', text: '' },
      { label: 'Organization Type', name: 'type', text: '' },
      { label: 'Link', name: 'link', text: '' },
    ];
    await setState(newState);
    await setOpen(true);

    const sendSourceUpdate = {
      country: 'Luxembourg',
      city: 'Luxembourg',
      short: 'Luxembourg',
      long: 'Grand-Duchy of Luxembourg',
      id: 'luxembourg',
      id_city_name: 'luxembourg',
      primary: 'luxembourg',
      center: null,
      latitude: null,
      longitude: null,
      info: 'https://data.public.lu/en/datasets/inspire-annex-i-theme-protected-sites-remarkable-trees/#_',
      srs: null,
      broken: true,
      brokenNotes: 'Requires outreach to get a compatible file format',
      download:
        'https://download.data.public.lu/resources/inspire-annex-i-theme-protected-sites-remarkable-trees/20220405-122622/ps.protectedsitesnatureconservation-trees.gml',
      format: 'gml',
      filename: null,
      gdal_options: null,
      license: null,
      email: null,
      contact: null,
      crosswalk: {
        ref: 'localId',
        scientific: '(x) => String(x.text).split(" - ")[0]',
        common: '(x) => String(x.text).split(" - ")[1]',
      },
    };

    mutateSources.mutate(sendSourceUpdate);
  };

  const handleReportLink = async () => {
    await setOpen(false);
    const newState = {};
    newState.header = 'Report Broken Link';
    newState.summary =
      "Clicked a link and it sent you to an error page? Or found yourself where the page doesn't exist anymore? Search for the broken link and set the link then add the new link to submit. A team member will review the request, and if it meets the requirements, you will see the updated link on the list ASAP.";
    newState.inputs = [
      { label: 'Broken Link', name: 'broken', text: '' },
      { label: 'New Link', name: 'new', text: '' },
    ];
    newState.links = [
      {
        organization: 'Oakland Tree Services',
        link: 'https://www.oaklandca.gov/topics/tree-services',
      },
      {
        organization: 'Berkeley Tree Services',
        link: 'https://berkeleyca.gov/city-services/streets-sidewalks-sewers-and-utilities/city-trees-and-coast-live-oak-ordinance#:~:text=To%20apply%20for%20a%20permit,or%20removal%20will%20be%20permitted',
      },
      {
        organization: 'Alameda Tree Services',
        link: 'https://www.alamedaca.gov/Departments/Public-Works-Department/Street-Trees',
      },
      {
        organization: 'San Francisco Tree Services',
        link: 'https://sfpublicworks.org/remove-street-tree',
      },
      {
        organization: 'City of Monterey',
        link: 'https://monterey.org/city_hall/parks___recreation/beaches,_parks___playgrounds/trees___urban_forestry/local_tree___plant_selections.php',
      },
      {
        organization: 'City of Oxnard',
        link: 'https://www.oxnard.org/environmental-resources/',
      },
    ];
    await setState(newState);
    await setOpen(true);
  };

  const ref = useClickOutside(() => {
    setHover(false);
  });

  const handleClose = () => {
    setOpen(false);
  };

  const exportXslx = () => {
    setHover(false);
  };

  const exportDoc = () => {
    setHover(false);
  };

  return (
    <div className="communities">
      <div className="communities__main">
        <div>
          <h2>Community Search</h2>
        </div>
        <div className="communities__main__p">
          <span>
            In the community search section, you can find and view other city
            government procedure to add,remove, or trim a tree or find nurseries
            and tree organizations nearby. You can view and filter as much
            information present such as Country, Service, etc. Viewers are able
            to submit a link to a city tree service, nursery, tree organization
            and a team member will review and approve the submission.
          </span>
        </div>
        <div className="communities__main__search">
          <SearchBar
            style={{
              div: { width: '60%', borderRadius: '.3vw' },
              input: { borderRadius: '.3vw' },
            }}
            search={search}
            onChange={handleSearch}
            placeholder={'Search City, Country, Service or something else'}
          />
          <div ref={ref} onMouseEnter={() => setHover(true)}>
            <GrayButton>
              <UploadFileIcon sx={{ marginRight: '7px' }} />
              <span>Export</span>
            </GrayButton>
            {hover && (
              <div
                style={{
                  position: 'relative',
                  width: '0px',
                  height: '0px',
                  top: '5px',
                  zIndex: '1',
                }}
              >
                <div className="communities__main__search__hovermenu">
                  <button onClick={exportXslx}>
                    <span>Export as .xslx</span>
                  </button>
                  <button onClick={exportDoc}>
                    <span style={{ width: '100%' }}>Export as .doc</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <GrayButton onClick={handleAddLink}>
            <LinkIcon sx={{ marginRight: '7px' }} />
            <span>Add City/Source Link</span>
          </GrayButton>

          <GrayButton onClick={handleReportLink}>
            <LinkOffIcon sx={{ marginRight: '7px' }} />
            <span>Report Broken City/Source Link</span>
          </GrayButton>
        </div>
        {open && (
          <PanelDrawer
            title={state?.header}
            open={open}
            onClose={handleClose}
            width={'400px'}
          >
            <SideMenu state={state} onClick={handleClose} />
          </PanelDrawer>
        )}
        <div>
          {sources && (
            <ListGrid
              data={sources}
              columns={columnHeaders}
              defaultSortIndex={0}
            />
          )}
        </div>

        <div className="communities__main__categories"></div>
        <div className="communities__main__links"></div>
      </div>
    </div>
  );
}
// handle export close menu when clicking outside

function useClickOutside(handler) {
  const ref = useRef();
  useEffect(() => {
    const onClose = (e) => {
      if (!ref.current?.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', onClose);

    return () => {
      document.removeEventListener('mousedown', onClose);
    };
  });

  return ref;
}
