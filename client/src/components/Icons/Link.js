import React from "react";

import { Link, LinkOff } from '@mui/icons-material';



export const LinkIcon = (props) => {
    return (
        <>
            <Link sx={{ verticalAlign: 'top' }} {...props} />
        </>
    )
}

export const LinkOffIcon = (props) => {
    return (
        <>
            <LinkOff sx={{ verticalAlign: 'top' }} {...props} />
        </>
    )
}