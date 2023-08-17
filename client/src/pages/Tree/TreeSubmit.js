import React, { useState } from 'react';
import { Button, CircularProgress } from "@mui/material";
import "./TreeSubmit.scss";

export default function TreeSubmit({
    uploadURL,
}) {
    const [isUploading, setIsUploading] = useState(false);
    const handleUpload = async () => {
        setIsUploading(true);
        await uploadURL();
        setIsUploading(false);
    };

    // An upload by POST
    // is not actually
    // immediate, we still
    // need to wait for
    // it to complete before
    // we let the user upload
    // again.

    // It should still be fast
    // enough that most users
    // won't notice. Instead
    // of a more complex progress
    // bar that shows gradual
    // progress, use a circular
    // progress icon that says
    // we're doing something
    // but not for how long
    // because it doesn't matter.
    return (
        <div>
            <div className="tree-submit">
                {isUploading ?
                    <CircularProgress /> :
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleUpload}
                    >
                        Submit
                    </Button>
                }
            </div>
        </div>
    )
}