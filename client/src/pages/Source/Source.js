import React, { useState, useEffect } from 'react';
// import SourceList from './SourceList';
import SourceHeader from './SourceHeader';
import LicenseFooter from '@/pages/License/LicenseFooter';
import { CSVImporter } from '@/components/CSVImporter/CSVImporter';
import { SourceForm } from '@/components/SourceForm/SourceForm';
import { ListGrid } from '@/components/ListGrid/ListGrid';
import { useSourcesQuery } from '@/api/queries';
import { searchArray } from '@/components/SearchBar/SearchBar';
import './Source.scss';
// import './SourceList.scss';

function createColumnHeaders(source) {
  if (!source) return [];
  return [
    {
      columnHeader: 'idSourceName',
      label: '',
    },
    {
      columnHeader: 'broken',
      label: 'Up',
    },
    {
      columnHeader: 'city',
      label: 'Location',
    },
    {
      columnHeader: 'isoAlpha3',
      label: 'Country',
    },
    {
      columnHeader: 'state',
      label: 'State',
    },

    {
      columnHeader: 'email',
      label: 'Email',
    },
    {
      columnHeader: 'contact',
      label: 'Contact',
    },
    {
      columnHeader: 'phone',
      label: 'Phone',
    },

    {
      columnHeader: 'notes',
      label: 'Notes',
    },
    // TODO turn this on for San Francisco's Friends of the Urban Forest
    // {
    //   columnHeader: 'maintenance',
    //   label: 'Maintenance',
    // },
  ];
}

export default function Source() {
  const [search, setSearch] = useState('');
  const [license, setLicense] = useState('');
  const [importCSV, setImportCSV] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [source, setList] = useState({});
  const [message, setMessage] = useState('');
  const { data: sources } = useSourcesQuery();
  console.log(sources, 'sources');
  const columns = createColumnHeaders(sources);
  const sourceFiltered = search && searchArray(sources, search);

  const handleNewEditSource = (e, item) => {
    e.preventDefault();
    setOpenEdit(!openEdit);
    setList(item);
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  }, [message]);

  return (
    <div className="source">
      <SourceHeader
        search={search}
        setSearch={setSearch}
        importCSV={importCSV}
        setImportCSV={setImportCSV}
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        setList={setList}
      />

      {message && (
        <div className="message">
          <h3>{`${source.idSourceName} ${message}`}</h3>
        </div>
      )}

      {openEdit && (
        <div className="sources__openedit">
          <SourceForm
            setOpenEdit={setOpenEdit}
            source={source}
            setList={setList}
            message={message}
            setMessage={setMessage}
          />
        </div>
      )}

      {importCSV && <CSVImporter setImportCSV={setImportCSV} />}

      {!openEdit && sources && (
        <ListGrid
          data={sourceFiltered || sources}
          columns={columns}
          defaultSortIndex={0}
          setList={setList}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          handleNewEditSource={handleNewEditSource}
          listType="source"
        />
      )}

      <LicenseFooter license={license} />
    </div>
  );
}
