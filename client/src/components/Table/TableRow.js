import React, { useState } from 'react';

import { Table, TableBody, TableRow, TableCell } from '@mui/material';

import { styled } from '@mui/material/styles';

export default function CommunityTableRow({ row }) {
  const [hover, setHover] = useState(false);

  const StyledCell = styled(TableCell)({
    borderBottom: '1px #00000050 solid',
    color: '#000000',
    fontSize: '14px',
    fontFamily: 'Montserrat',
    padding: '0px',
  });

  const ShortCell = styled(TableCell)(
    hover
      ? {
          fontWeight: 'bold',
          width: '16.67%',
          borderBottom: '1px #00000050 solid',
          color: '#000000',
          fontSize: '14px',
          fontFamily: 'Montserrat',
          padding: '0px',
        }
      : {
          width: '16.67%',
          borderBottom: '1px #00000050 solid',
          color: '#000000',
          fontSize: '14px',
          fontFamily: 'Montserrat',
          padding: '0px',
        },
  );

  const LongCell = styled(TableCell)(
    hover
      ? {
          fontWeight: 'bold',
          width: '25%',
          borderBottom: '1px #00000050 solid',
          color: '#000000',
          fontSize: '14px',
          fontFamily: 'Montserrat',
          padding: '0px',
        }
      : {
          width: '25%',
          borderBottom: '1px #00000050 solid',
          color: '#000000',
          fontSize: '14px',
          fontFamily: 'Montserrat',
          padding: '0px',
        },
  );

  return (
    <>
      <Table>
        <TableBody
          sx={
            hover
              ? { backgroundColor: '#f3f1f1', height: '40px' }
              : { height: '40px' }
          }
        >
          <TableRow
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <ShortCell>{row.country}</ShortCell>
            <LongCell>{row.city}</LongCell>
            <ShortCell>{row.territory}</ShortCell>
            <ShortCell>{row.service}</ShortCell>
            <LongCell>
              <a
                style={
                  hover
                    ? { color: '#3FAB45', textDecoration: 'underline' }
                    : { color: '#000000', textDecoration: 'underline' }
                }
                href={row.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {row.organization}
              </a>
            </LongCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
