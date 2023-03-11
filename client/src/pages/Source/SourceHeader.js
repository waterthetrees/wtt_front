import React from 'react';
import ListGridHeader from '@/components/ListGridHeader/ListGridHeader';
import { GrayButton } from '@/components/Button/Button';
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
  setList,
}) {
  // TODO turn this back on after MVP release
  const featureFlagCSVImporter = false;

  const handleClick = () => {
    setOpenEdit(!openEdit);
    if (openEdit) setList(null);
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
        <GrayButton
          aria-label="Link City/Source"
          size="large"
          onClick={handleClick}
        >
          <LinkIcon color="gray" fontSize="large" aria-label="Download CSV" />
          Link Source
        </GrayButton>
      </div>

      {featureFlagCSVImporter && (
        <div className="listgridheader-content-item">
          <GrayButton
            aria-label="Import City/Source CSV"
            size="small"
            onClick={() => setImportCSV(!importCSV)}
          >
            <CloudUploadIcon sx={{ marginRight: '7px', fontSize: 24 }} />
            Upload Source
          </GrayButton>
        </div>
      )}
    </ListGridHeader>
  );
}
