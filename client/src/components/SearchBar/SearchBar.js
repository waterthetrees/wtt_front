import React from "react";
import SearchIcon from '@mui/icons-material/Search';

import './SearchBar.scss'
export const SearchBar = (props) => {
    console.log(props.style)
    return (
        <div className="searchbar"
            style={{ ...props.style.div }}
        >
            {<SearchIcon
                sx={{ color: '#00000050', fontSize: '24px', marginLeft: '10px', marginRight: '10px', fontFamily:'Montserrat' }}
            />}

            <input
                style={{ ...props.style.input }}
                value={props.search}
                onChange={props.handleSearch}
                placeholder={props.placeholder}
                className="searchbar__input"
            />
        </div>
    )

}


