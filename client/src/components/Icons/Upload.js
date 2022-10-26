import React from 'react';
import { UploadFile } from '@mui/icons-material';

export const UploadFileIcon = (props) => {
    return (
        <>
            <UploadFile sx={{ verticalAlign: 'top' }} {...props} />
        </>
    )
}