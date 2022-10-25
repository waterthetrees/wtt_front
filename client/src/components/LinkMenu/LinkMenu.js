import React, { createRef, useEffect, useRef } from 'react';

import { styled } from '@mui/material/styles';
import {
    Drawer,
    Box,
    ListItem,
    List,
    useMediaQuery,
} from '@mui/material'




export default function LinkMenu(props) {
    /************* MUI STYLING **************/
    const menuRef = useRef([])
    let fields = {}
    if (props.state === 1) {
        fields.header = "Add Link"
        fields.summary = "Didn't find your organization and want to add it to our list? Input the required text and link, then submit it. A team member will review the request, and if it meets the requirements you will see the organization on the list ASAP."
        fields.inputs = [
            { label: 'Country', text: 'none' },
            { label: 'City', text: 'none' },
            { label: 'State', text: 'none' },
            { label: 'Organization Type', text: 'none' },
            { label: 'Link', text: 'none' },
        ]
        menuRef.current = fields?.inputs.map((inputs) => createRef())
    }

    else if (props.state === 2) {
        fields.header = "Report Broken Link"
        fields.summary = "Clicked a link and it sent you to an error page? Or found yourself where the page doesn't exist anymore? Search for the broken link and set the link then add the new link to submit. A team member will review the request, and if it meets the requirements, you will see the updated link on the list ASAP."
        fields.inputs = [
            { label: 'Search Broken Link or Organization', text: 'none' },
            { label: 'Broken Link', text: 'none' },
            { label: 'New Link', text: 'none' },
        ]
    }

    const handleInput = (i) => {

    }

    const handleClose = () => {
        props.setState(0)
        return false
    }

    const handleSubmit = () => {
        if (props.state === 1) {
            const payload = {
                country: menuRef.current[0].current.value
            }
            console.log(payload)
        }
    }

    return (
        <Drawer open={props.state} onClose={handleClose}>
            <Box>
                <h1>
                    {fields?.header}
                </h1>
                <p>
                    {fields?.summary}
                </p>
                <div>
                    {fields?.inputs.map((inputs, i) => (
                        <div>
                            <label>{inputs.label}</label>
                            <input
                                ref={menuRef.current[i]}
                                onChange={() => handleInput(i)}
                            >
                            </input>
                        </div>
                    ))}
                </div>
                <div>
                    <button onClick={handleClose}>cancel</button>
                    <button onClick={handleSubmit}>submit</button>
                </div>

            </Box>
        </Drawer>
    )
}