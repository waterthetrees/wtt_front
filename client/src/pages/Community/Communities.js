import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import {
  SortUp,
  SortDown,
  LinkIcon,
  LinkOffIcon,
  UploadFileIcon,
} from '@/components/Icons';

import { GrayButton } from '@/components/Button/Button';
import PanelDrawer from '@/components/PanelDrawer/PanelDrawer';
import CommunityTableRow from '@/components/Table/TableRow';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import Section from '@/components/Section/Section';

import SideMenu from './SideMenu';
import './Communities.scss';

export default function Communities() {
  const [search, setSearch] = useState('');

  const [open, setOpen] = useState(false);
  const [state, setState] = useState({});
  const [Links, setLinks] = useState([]);
  const [country, setCountry] = useState(true);
  const [city, setCity] = useState(true);
  const [territory, setTerritory] = useState(true);
  const [service, setService] = useState(true);
  const [organization, setOrganization] = useState(true);
  const [hover, setHover] = useState(false);

  const filteredLinks = Links?.filter((link) => {
    return (
      link.country.toLowerCase().includes(search.toLowerCase()) ||
      link.city.toLowerCase().includes(search.toLowerCase()) ||
      link.territory.toLowerCase().includes(search.toLowerCase()) ||
      link.service.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    let links = [
      {
        country: 'United States',
        city: 'Oakland',
        territory: 'California',
        service: 'Tree Service',
        organization: 'Oakland Tree Services',
        link: 'https://www.oaklandca.gov/topics/tree-services',
      },
      {
        country: 'United States',
        city: 'Berkeley',
        territory: 'California',
        service: 'Tree Service',
        organization: 'Berkeley Tree Services',
        link: 'https://berkeleyca.gov/city-services/streets-sidewalks-sewers-and-utilities/city-trees-and-coast-live-oak-ordinance#:~:text=To%20apply%20for%20a%20permit,or%20removal%20will%20be%20permitted',
      },
      {
        country: 'United States',
        city: 'Alameda',
        territory: 'California',
        service: 'Tree Service',
        organization: 'Alameda Tree Services',
        link: 'https://www.alamedaca.gov/Departments/Public-Works-Department/Street-Trees',
      },
      {
        country: 'United States',
        city: 'San Francisco',
        territory: 'California',
        service: 'Tree Service',
        organization: 'San Francisco Tree Services',
        link: 'https://sfpublicworks.org/remove-street-tree',
      },
      {
        country: 'United States',
        city: 'Monterey',
        territory: 'California',
        service: 'Organization',
        organization: 'City of Monterey',
        link: 'https://monterey.org/city_hall/parks___recreation/beaches,_parks___playgrounds/trees___urban_forestry/local_tree___plant_selections.php',
      },
      {
        country: 'United States',
        city: 'Oxnard',
        territory: 'California',
        service: 'Organization',
        organization: 'City of Oxnard',
        link: 'https://www.oxnard.org/environmental-resources/',
      },
    ];
    setLinks(
      [...links].sort(
        (a, b) =>
          a.country.toLowerCase().localeCompare(b.country.toLowerCase()) ||
          a.city.toLowerCase().localeCompare(b.city.toLowerCase()) ||
          a.territory.toLowerCase().localeCompare(b.territory.toLowerCase()),
      ),
    );
  }, []);

  const sortCountryAsc = () => {
    setLinks((state) =>
      [...state].sort((a, b) => {
        return (
          a.country.toLowerCase().localeCompare(b.country.toLowerCase()) ||
          a.city.toLowerCase().localeCompare(b.city.toLowerCase()) ||
          a.territory.toLowerCase().localeCompare(b.territory.toLowerCase())
        );
      }),
    );
    setCountry((state) => !state);
  };

  const sortCountryDesc = () => {
    setLinks((state) =>
      [...state].sort((a, b) => {
        return (
          b.country.toLowerCase().localeCompare(a.country.toLowerCase()) ||
          a.city.toLowerCase().localeCompare(b.city.toLowerCase()) ||
          a.territory.toLowerCase().localeCompare(b.territory.toLowerCase())
        );
      }),
    );
    setCountry((state) => !state);
  };

  const sortCityAsc = () => {
    setLinks((state) =>
      [...state].sort((a, b) =>
        a.city.toLowerCase().localeCompare(b.city.toLowerCase()),
      ),
    );
    setCity((state) => !state);
  };

  const sortCityDesc = () => {
    setLinks((state) =>
      [...state].sort((a, b) =>
        b.city.toLowerCase().localeCompare(a.city.toLowerCase()),
      ),
    );
    setCity((state) => !state);
  };

  const sortTerritoryAsc = () => {
    setLinks((state) =>
      [...state].sort((a, b) =>
        a.territory.toLowerCase().localeCompare(b.territory.toLowerCase()),
      ),
    );
    setTerritory((state) => !state);
  };

  const sortTerritoryDesc = () => {
    setLinks((state) =>
      [...state].sort((a, b) =>
        b.territory.toLowerCase().localeCompare(a.territory.toLowerCase()),
      ),
    );
    setTerritory((state) => !state);
  };

  const sortServiceAsc = () => {
    setLinks((state) =>
      [...state].sort((a, b) => {
        return a.service.toLowerCase().localeCompare(b.service.toLowerCase());
      }),
    );
    setService((state) => !state);
  };

  const sortServiceDesc = () => {
    setLinks((state) =>
      [...state].sort((a, b) => {
        return b.service.toLowerCase().localeCompare(a.service.toLowerCase());
      }),
    );
    setService((state) => !state);
  };

  const sortOrganizationAsc = () => {
    setLinks((state) =>
      [...state].sort((a, b) =>
        a.organization
          .toLowerCase()
          .localeCompare(b.organization.toLowerCase()),
      ),
    );
    setOrganization((state) => !state);
  };

  const sortOrganizationDesc = () => {
    setLinks((state) =>
      [...state].sort((a, b) =>
        b.organization
          .toLowerCase()
          .localeCompare(a.organization.toLowerCase()),
      ),
    );
    setOrganization((state) => !state);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAddLink = () => {
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
    setState(newState);
    setOpen(true);
  };

  const handleReportLink = () => {
    const newState = {};
    newState.header = 'Report Broken Link';
    newState.summary =
      "Clicked a link and it sent you to an error page? Or found yourself where the page doesn't exist anymore? Search for the broken link and set the link then add the new link to submit. A team member will review the request, and if it meets the requirements, you will see the updated link on the list ASAP.";
    newState.inputs = [
      { label: 'Broken Link', name: 'broken', text: '' },
      { label: 'New Link', name: 'new', text: '' },
    ];
    setState(newState);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const exportXslx = (e) => {
    setHover(false);
  };

  const exportDoc = (e) => {
    setHover(false);
  };

  return (
    <div className="communities">
      <PanelDrawer
        title={state?.header}
        open={open}
        onClose={handleClose}
        width={'400px'}
      >
        <SideMenu state={state} onClick={handleClose} />
      </PanelDrawer>
      {/* <Sidebar open={open} onClose={handleClose}>
        <SideMenu state={state} onClick={handleClose} />
      </Sidebar> */}
      <div className="communities__main">
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

          <GrayButton>
            <div onMouseEnter={() => setHover(true)}>
              <UploadFileIcon sx={{ marginRight: '7px' }} />
              <span>Export</span>
            </div>
          </GrayButton>
          <GrayButton onClick={handleAddLink}>
            <LinkIcon sx={{ marginRight: '7px' }} />
            <span>Add Link</span>
          </GrayButton>

          <GrayButton onClick={handleReportLink}>
            <LinkOffIcon sx={{ marginRight: '7px' }} />
            <span>Report Broken Link</span>
          </GrayButton>
        </div>
        {hover && (
          <div
            style={{
              position: 'relative',
              width: '0px',
              height: '0px',
              left: '585px',
              bottom: '25px',
              zIndex: '1',
            }}
          >
            <div className="communities__main__search__hovermenu">
              <div onClick={exportXslx}>
                <span>Export as .xslx</span>
              </div>
              <div onClick={exportDoc}>
                <span>Export as .doc</span>
              </div>
            </div>
          </div>
        )}
        <div className="communities__main__section">
          <Section sx={{ width: '16.67%' }}>
            <span>Country</span>
            <IconButton onClick={country ? sortCountryDesc : sortCountryAsc}>
              {country ? <SortUp /> : <SortDown />}
            </IconButton>
          </Section>
          <Section sx={{ width: '25%' }}>
            <span>City</span>
            <IconButton onClick={city ? sortCityDesc : sortCityAsc}>
              {city ? <SortUp /> : <SortDown />}
            </IconButton>
          </Section>
          <Section sx={{ width: '16.67%' }}>
            <span>State/Territory</span>
            <IconButton
              onClick={territory ? sortTerritoryDesc : sortTerritoryAsc}
            >
              {territory ? <SortUp /> : <SortDown />}
            </IconButton>
          </Section>
          <Section sx={{ width: '16.67%' }}>
            <span>Service</span>
            <IconButton onClick={service ? sortServiceDesc : sortServiceAsc}>
              {service ? <SortUp /> : <SortDown />}
            </IconButton>
          </Section>
          <Section sx={{ width: '25%' }}>
            <span>Organization</span>
            <IconButton
              onClick={
                organization ? sortOrganizationDesc : sortOrganizationAsc
              }
            >
              {organization ? <SortUp /> : <SortDown />}
            </IconButton>
          </Section>
        </div>

        <div className="communities__main__table">
          {filteredLinks?.map(
            ({ country, city, territory, service, organization, link }, i) => (
              <CommunityTableRow
                key={i}
                row={{ country, city, territory, service, organization, link }}
              />
            ),
          )}
        </div>
        <div className="communities__main__categories"></div>
        <div className="communities__main__links"></div>
      </div>
    </div>
  );
}
