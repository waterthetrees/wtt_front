import React, { createRef, useState, useRef, useEffect } from 'react';

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

export default function LinkMenu(props) {

    // const menuRef = useRef([])

    console.log(props)

    const handleClose = () => {
        props.setOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {

        }
        props.state.inputs.forEach((input) => {
            input.name ? payload[`${input.name}`] = e.target[`${input.name}`].value : null
        })
        console.log(payload)

        // Submit payload

    }

    /************* MUI STYLING **************/
    const StyledDrawer = styled(Drawer)({
        width: '400px',
        height: '1024px',
        backgroundColor: 'white',
    })
    const StyledBox = styled(Box)({
        width: '400px',
        height: '1024px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
    })

    const StyledHeader = styled(Typography)({
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
        fontWeight: '500',
        fontSize: 'Medium',
        marginBottom: '24px',
    })

    const StyledSummary = styled(Typography)({
        fontSize: '12px',
        marginBottom: '32px',
    })

    const StyledLabel = styled(Typography)({
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '8px'
    })

    const StyledInput = styled(TextField)({
        width: '100%',

    })

    return (
        <StyledDrawer open={props.open} onClose={handleClose}>
            <StyledBox
                component="form"
                onSubmit={handleSubmit}
            >
                <StyledHeader>
                    {props?.state.header}
                </StyledHeader>
                <StyledSummary>
                    {props?.state.summary}
                </StyledSummary>
                <p></p>
                <Box
                    component="div"
                    sx={{ marginBottom: '8px' }}>
                    {props?.state.inputs.map((input, i) => (
                        <Box key={i}
                            component="div"
                            sx={{ marginBottom: '16px' }}
                        >
                            <StyledLabel
                            >
                                {input.label}
                            </StyledLabel>
                            <p></p>
                            <StyledInput
                                name={input.name}
                                InputProps={{
                                    style: {
                                        width: '100%',
                                        height: '28px',
                                    }
                                }}
                            // ref={menuRef.current[i]}
                            >
                            </StyledInput>
                        </Box>
                    ))}
                </Box>
                <div>
                    <button type='button' onClick={handleClose}>cancel</button>
                    <button >submit</button>
                </div>

            </StyledBox>
        </StyledDrawer>
    )
}