
import React from "react";

import { Remove, ExpandLess,ExpandMore } from "@mui/icons-material";

export const Neutral = (props) => {
    return (
        <>
            <Remove {...props} />
        </>
    )
}

export const SortUp = (props) => {

    return (
        <>
            <ExpandLess {...props} />
        </>
    )
}

export const SortDown = (props) => {
    return (
        <>
            <ExpandMore {...props} />
        </>
    )
}