import React from 'react';
import ListGridHeader from '@/components/ListGridHeader/ListGridHeader';
import { BlackButton } from '@/components/Button/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LinkIcon } from '@/components/Icons';
import './Source.scss';

export default function SourceHeader({
  search,
  setSearch,
  importCSV,
  setImportCSV,
  openEdit,
  setOpenEdit,
  setSource,
}) {
  // TODO turn this back on after MVP release
  const featureFlagCSVImporter = false;

  const handleClick = () => {
    setOpenEdit(!openEdit);
    if (openEdit) setSource(null);
  };

  return (
    <ListGridHeader
      search={search}
      setSearch={setSearch}
      title={'Sources'}
      description={'Add, edit, and delete sources'}
      searchLabel={'Search Sources'}
    >
      <div className="listgridheader-content-item">
        <BlackButton aria-label="Link City/Source" onClick={handleClick}>
          <LinkIcon
            color="gray"
            fontSize="large"
            aria-label="Download CSV"
            sx={{ className: 'wttbuttons__icon', paddingRight: '0.5rem' }}
          />
          Link Source
        </BlackButton>
      </div>

      {featureFlagCSVImporter && (
        <div className="listgridheader-content-item">
          <BlackButton
            aria-label="Import City/Source CSV"
            onClick={() => setImportCSV(!importCSV)}
          >
            <CloudUploadIcon
              sx={{ className: 'wttbuttons__icon', paddingRight: '0.5rem' }}
            />
            Upload Source
          </BlackButton>
        </div>
      )}
    </ListGridHeader>
  );
}
