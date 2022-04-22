/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React from 'react';
import { useQuery } from 'react-query';
import { getData } from '@/api/apiUtils';
import {
  TableRow, TableCell,
} from '@mui/material';
import Section from '@/components/Section/Section';
import TreeTable from './TreeTable';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const infoKeys = [
  'address',
  'city',
  'zip',
  'state',
  'country',
  'neighborhood',
  ['lat', 'Latitude'],
  ['lng', 'Longitude'],
  'organization',
  'who',
  'owner',
  ['idReference', 'Ref #'],
  'id',
  'sourceid',
  'count',
  'treelocationcount',
].map((treeRow) => (Array.isArray(treeRow)
  ? treeRow
  : [treeRow, capitalizeFirstLetter(treeRow)]));

export default function TreeInfo({ currentTreeData }) {
  // const {
  //   data,
  //   dataUpdatedAt,
  //   error,
  //   errorUpdatedAt,
  //   failureCount,
  //   isError,
  //   isFetched,
  //   isFetchedAfterMount,
  //   isFetching,
  //   isIdle,
  //   isLoading,
  //   isLoadingError,
  //   isPlaceholderData,
  //   isPreviousData,
  //   isRefetchError,
  //   isRefetching,
  //   isStale,
  //   isSuccess,
  //   refetch,
  //   remove,
  //   status,
  // } = useQuery('trees', queryFn?, {
  //   cacheTime,
  //   enabled,
  //   initialData,
  // })

  // const query = useTreeQuery({ id: changedData?.id }, {
  //   // We don't want to fire this query until mutate() has been called with some data to change.
  //   enabled: !!changedData,
  //   // This query is likely to 404, and we don't want to retry in that case.
  //   retry: 0,
  // });

  // const result = useQuery({
  //   queryKey,
  //   queryFn,
  //   enabled: false,
  //   retry: 0,
  // });

  const { data: treeData } = useQuery(['trees', { id: currentTreeData?.id }], getData, {
    // We don't want to fire this query until mutate() has been called with some data to change.
    enabled: false,
    staleTime: 30 * 1000,
    // This query is likely to 404, and we don't want to retry in that case.
    retry: 0,
    initialData: currentTreeData,
    // initialDataUpdatedAt: () =>
    //   // ✅ will refetch in the background if our list query data is older
    //   // than the provided staleTime (30 seconds)
    //   queryClient.getQueryState(['todo', 'list'])?.dataUpdatedAt,
  });
  console.log('treeData', treeData);
  console.log('currentTreeData', currentTreeData);
  const info = { ...treeData, ...currentTreeData };
  console.log('info', info);
  // export const useTreeQuery = createUseQuery('trees', {
  //   preProcessor(api, data, queryFn, options) {
  //     // If id is null, we don't want to call the server with that, as it'll return an error,
  //     // cluttering the console.  To avoid the error, use a promise that resolves to null instead of
  //     // the normal queryFn.  We can't just conditionally call useQuery() when the is null, since
  //     // that triggers a React exception.
  //     return useQuery(
  //       [api, data],
  //       !data.id
  //         ? () => Promise.resolve(null)
  //         : queryFn,
  //       options,
  //     );
  //   },
  // });

  const labelValues = infoKeys.reduce((result, [key, label]) => {
    const value = currentTreeData[key];

    if (value) {
      result.push([label, value, key]);
    }

    return result;
  }, []);

  if (!labelValues.length) {
    return null;
  }
  return (
    <Section
      title="Info"
    >
      <TreeTable>
        {labelValues.map(([label, value]) => (
          <TableRows key={label} label={label} value={value} />
        ))}
      </TreeTable>
    </Section>
  );
}

const TableRows = ({ label, value }) => (
  <TableRow key={label}>
    <TableCell sx={{ pl: 0, fontWeight: 'bold' }}>{label}</TableCell>
    <TableCell>{value}</TableCell>
  </TableRow>
);
