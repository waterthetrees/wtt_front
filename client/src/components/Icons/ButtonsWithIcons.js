import React from 'react';
import { UploadFile, Link, LinkOff } from '@mui/icons-material';




export const ExportButton = (props) => {
    return(
        <button
            // onClick={props.handleclick}
        >
            <UploadFile sx={{ color: '#00000050', verticalAlign: 'top' }} {...props} />
            {props.text}
        </button>
    )
}

export const LinkButton = (props) => {
    return (
        <button
            onClick={props.handleclick}
        >
            <Link sx={{ color: '#00000050', verticalAlign: 'top' }} {...props} />
            {props.text}
        </button>
    )
}

export const ReportLinkButton = (props) => {
    return (
        <button
            onClick={props.handleclick}
        >
            <LinkOff sx={{ color: '#00000050', verticalAlign: 'top' }} {...props} />
            {props.text}
        </button>
    )
}