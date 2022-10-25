import React, { useState } from 'react';

import { ButtonWithIcon }  from '@/components/Button'
import LinkMenu from '@/components/LinkMenu/LinkMenu'
import './Communities.scss';

export default function Communities() {
    const [search, setSearch] = useState("")

    const [open,setOpen] = useState(false)
    const [state,setState] = useState({})


    const handleExport = () => {

    }


    const handleAddLink = () => {
        const newState = {}
        newState.header = "Add Link"
        newState.summary = "Didn't find your organization and want to add it to our list? Input the required text and link, then submit it. A team member will review the request, and if it meets the requirements you will see the organization on the list ASAP."
        newState.inputs = [
            { label: 'Country', name: 'country', text: '' },
            { label: 'City', name: 'city', text: '' },
            { label: 'State', name: 'state', text: '' },
            { label: 'Organization Type', name: 'type', text: '' },
            { label: 'Link', name: 'link', text: '' },
        ]
        setState(newState)
        setOpen(true)

    }

    const handleReportLink = () => {
        const newState = {}
        newState.header = "Report Broken Link"
        newState.summary = "Clicked a link and it sent you to an error page? Or found yourself where the page doesn't exist anymore? Search for the broken link and set the link then add the new link to submit. A team member will review the request, and if it meets the requirements, you will see the updated link on the list ASAP."
        newState.inputs = [
            { label: 'Search Broken Link or Organization', name: '', text: '' },
            { label: 'Broken Link', name: 'broken' ,text: '' },
            { label: 'New Link', name: 'new' ,text: '' },
        ]
        setState(newState)
        setOpen(true)
    }

    return (
        <div className='communities'>
            <div>
                {
                    open ?
                    <LinkMenu 
                        state={state}
                        open = {open}
                        setOpen={setOpen}
                    />
                    :
                    null
                }
            </div>
            <div className='communities__header'>
                <h2>Community Search</h2>
            </div>
            <div className='communities__main'>
                <div className='communities__main__p'>
                    <span>
                        In the community search section, you can find and view other city government procedure to add,remove, or trim a tree or find nurseries and tree
                        organizations nearby. You can view and filter as much information present such as Country, Service, etc. Viewers are able to submit a link to a city tree
                        service, nursery, tree organization and a team member will review and approve the submission.
                    </span>
                </div>
                <div className='communities__main__search'>
                    <input
                        className='communities__main__search__input'
                        placeholder='Search City, Country, Service, or something else'
                    >
                    </input>

                    <ButtonWithIcon text={"Export"} color={'red'}/>
                    <ButtonWithIcon text={"Add Link"} click={handleAddLink} />
                    <ButtonWithIcon text={"Report Broken Link"} click={handleReportLink} />

                </div>
                <div className='communities__main__categories'>

                </div>
                <div className='communities__main__links'>

                </div>
            </div>
        </div>
    )
}