import React, { useState } from 'react';

import { ButtonWithIcon }  from '@/components/Button'
import LinkMenu from '@/components/LinkMenu/LinkMenu'
import CommunityTableRow from '@/components/Table/TableRow'
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

                    <ButtonWithIcon text={"Export"}/>
                    <ButtonWithIcon text={"Add Link"} onClick={handleAddLink} />
                    <ButtonWithIcon text={"Report Broken Link"} onClick={handleReportLink} />

                </div>
                <div className='communities__main__table'>
                    <CommunityTableRow row={{ country: 'United States', city: 'Oakland', territory: 'California', service: 'Tree Service', organization: 'Oakland Tree Services', link:'https://www.oaklandca.gov/topics/tree-services'}}/>
                    <CommunityTableRow row={{ country: 'United States', city: 'Berkeley', territory: 'California', service: 'Tree Service', organization: 'Berkeley Tree Services', link: 'https://berkeleyca.gov/city-services/streets-sidewalks-sewers-and-utilities/city-trees-and-coast-live-oak-ordinance#:~:text=To%20apply%20for%20a%20permit,or%20removal%20will%20be%20permitted' }} />
                    <CommunityTableRow row={{ country: 'United States', city: 'Alameda', territory: 'California', service: 'Tree Service', organization: 'Alameda Tree Services', link: 'https://www.alamedaca.gov/Departments/Public-Works-Department/Street-Trees' }} />
                    <CommunityTableRow row={{ country: 'United States', city: 'San Francisco', territory: 'California', service: 'Tree Service', organization: 'San Francisco Tree Services', link: 'https://sfpublicworks.org/remove-street-tree' }} />
                    <CommunityTableRow row={{ country: 'United States', city: 'Monterey', territory: 'California', service: 'Organization', organization: 'City of Monterey', link: 'https://monterey.org/city_hall/parks___recreation/beaches,_parks___playgrounds/trees___urban_forestry/local_tree___plant_selections.php' }} />
                    <CommunityTableRow row={{ country: 'United States', city: 'Oxnard', territory: 'California', service: 'Organization', organization: 'City of Oxnard', link: 'https://www.oxnard.org/environmental-resources/' }} />

                </div>
                <div className='communities__main__categories'>

                </div>
                <div className='communities__main__links'>

                </div>
            </div>
        </div>
    )
}