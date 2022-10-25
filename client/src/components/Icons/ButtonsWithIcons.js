import React from 'react';
import { UploadFile, Link, LinkOff } from '@mui/icons-material';
import {Button} from '@mui/material'

import { styled } from '@mui/material/styles';



export const CommunityButton = (props) => {

    const ExportButton = styled(Button)({
        backgroundColor: 'white',
        borderRadius:'.3vw',
        border: '1px solid #00000050',
        color: '#00000050',
        height: '32px'
    })



    return(
        <ExportButton
            onClick={props.handleclick}
        >
            <UploadFile sx={{ color: '#00000050', verticalAlign: 'top', marginRight:'.4vw' }} {...props} />
            {props.text}
        </ExportButton>
    )
}

