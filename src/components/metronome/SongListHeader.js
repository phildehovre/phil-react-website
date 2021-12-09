import React, {useState} from 'react'
import SearchBar from './SearchBar'


function SongListHeader({header}) {

    const [clicked, setClicked] = useState(false)

    const renderHeader = () => {
        if (clicked) {
            return <SearchBar />
        }

        return <th onClick={() => setClicked(true)}>{header}</th>
    }
    return (
        <div>
            {renderHeader()}
        </div>
    )
}

export default SongListHeader
