import React from "react"

import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material'

import { styled } from '@mui/material/styles';

export default function CommunityTableRow({ row }) {

    const StyledCell = styled(TableCell)({
        borderBottom: '1px #00000050 solid',
        color:'#000000',
        fontSize: '14px' ,
        fontFamily:'Montserrat',
        padding: '0px'
    })

    return (
        <>
            <Table>
                <TableBody>
                    <TableRow sx={{ height: '40px' }}>
                        <StyledCell
                            sx={{ width: '16.67%', }}
                            >
                            {row.country}
                        </StyledCell>
                        <StyledCell sx={{ width: '25%',  }}>{row.city}</StyledCell>
                        <StyledCell sx={{ width: '16.67%' }}>{row.territory}</StyledCell>
                        <StyledCell sx={{ width: '16.67%'}}>{row.service}</StyledCell>
                        <StyledCell sx={{ width: '25%' }} ><a href={row.link} target="_blank" rel="noopener noreferrer">{row.organization}</a></StyledCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}