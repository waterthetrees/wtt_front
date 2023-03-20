import React from 'react';
import { render } from '@testing-library/react';
import Source from '@/pages/Source/Source';
import SourceHeader from '@/pages/Source/SourceHeader';
import { SourceForm } from '@/components/SourceForm/SourceForm';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

const mockSetOpenEdit = jest.fn(() => {});
const mockSetImportCSV = jest.fn(() => {});
const mockSetList = jest.fn(() => {});
const mockSetSearch = jest.fn(() => {});
// const mockSetMessage = jest.fn(() => {});

describe('<Source /> spec', () => {
  it('renders Source Header correctly', () => {
    const sourceHeader = render(
      <SourceHeader
        search={'test'}
        setSearch={mockSetSearch}
        setImportCSV={mockSetImportCSV}
        setOpenEdit={mockSetOpenEdit}
        setList={mockSetList}
        openEdit={false}
        importCSV={false}
      />,
    );
    expect(sourceHeader).toMatchSnapshot();
  });

  // TODO Need Auth provider to render Source Form
  // it('renders Source Form correctly with null source', () => {
  //   const sourceForm = render(
  //     <SourceForm
  //       setOpenEdit={mockSetOpenEdit}
  //       source={null}
  //       setList={mockSetList}
  //       message={'test message'}
  //       setMessage={mockSetMessage}
  //     />,
  //   );
  //   expect(sourceForm).toMatchSnapshot();
  // });
});
