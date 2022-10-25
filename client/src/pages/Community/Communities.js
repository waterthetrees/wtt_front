import React, { useState } from 'react';

import Sidebar from '@/components/Sidebar/Sidebar'
import { ExportButton, LinkButton, ReportLinkButton } from '@/components/Icons'
import LinkMenu from '@/components/LinkMenu/LinkMenu'
import './Communities.scss';

export default function Communities() {
    const [search, setSearch] = useState("")

    const [state,setState] = useState(0)


    const handleExport = () => {

    }


    const handleAddLink = () => {
        if(state === 1) return setState(0)
        setState(1)
    }

    const handleReportLink = () => {
        if (state === 2) return setState(0)
        setState(2)
    }

    return (
        <div className='communities'>
            <div>
                {
                    state ?
                    <LinkMenu 
                        state={state}
                        setState={setState}
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
                    <ExportButton text={"Export"} color={'red'} />
                    <LinkButton text={"Add Link"} handleclick={handleAddLink} />
                    <ReportLinkButton text={"Report Broken Link"} handleclick={handleReportLink} />
                </div>
                <div className='communities__main__categories'>

                </div>
                <div className='communities__main__links'>

                </div>
            </div>
        </div>
    )
}