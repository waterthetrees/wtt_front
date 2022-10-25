import React from "react";
import { Button } from '@mui/material'

import { styled } from '@mui/material/styles';


export const GreenButton = (props) => {

    const Green = styled(Button)({
        backgroundColor: '#147d16',
        borderRadius: '.3vw',
        color: 'white',
        height: '32px',
        // font: 'Montserrat',
    })

    return(
        <Green type="submit">
            {props.text}
        </Green>
    )
}

export const WhiteButton = (props) => {
    const White = styled(Button)({
        backgroundColor: 'white',
        border:'1px #147d16 solid',
        borderRadius: '.3vw',
        color: '#00000050',
        height: '32px',
    })

    console.log(props.sx)
    return (
        <White type="button" onClick={props.handleClose} sx={props?.sx}>
            {props.text}
        </White>
    )
}