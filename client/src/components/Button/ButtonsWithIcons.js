import React from 'react';
import { UploadFile, Link, LinkOff } from '@mui/icons-material';
import { Button } from '@mui/material'

import { styled } from '@mui/material/styles';



export const ButtonWithIcon = (props) => {

    const ExportButton = styled(Button)({
        backgroundColor: 'white',
        borderRadius: '.3vw',
        border: '1px solid #00000050',
        color: '#00000050',
        height: '32px'
    })

    let icon

    if (props.text === 'Export') {
        icon = <UploadFile sx={{ color: '#00000050', verticalAlign: 'top', marginRight: '.4vw' }} {...props} />
    }
    else if (props.text === "Add Link") {
        icon = <Link sx={{ color: '#00000050', verticalAlign: 'top', marginRight: '.4vw' }} {...props} />
    }
    else if (props.text === "Report Broken Link") {
        icon = <LinkOff sx={{ color: '#00000050', verticalAlign: 'top', marginRight: '.4vw' }} {...props} />
    }

    return (
        <ExportButton
            onClick={props.handleclick}
        >
            {icon}
            {props.text}
        </ExportButton>
    )
}

