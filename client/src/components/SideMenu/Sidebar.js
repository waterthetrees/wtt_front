import React from 'react';

import { styled } from '@mui/material/styles';

import {
    Drawer,
    Box,
    ListItem,
    List,
    useMediaQuery,
    Typography,
    TextField,
} from '@mui/material'

export const Sidebar = (props) => {
    const StyledDrawer = styled(Drawer)({
        width: '400px',
        height: '1024px',
        backgroundColor: 'white',
    })


    return (
        <StyledDrawer open={props.open} onClose={props.onClose}>
            {props.children}
        </StyledDrawer>
    )
}


