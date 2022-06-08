import React, {useState} from 'react'

function SearchBar({handleSearch, searchTerm, setSearchTerm}) {
    
    const [isVisited, setIsVisited] = useState(false)
    
    const handleOnChange = (e) => {
        setSearchTerm(e.target.value)
        handleSearch(searchTerm)
    }

    const handleClick = () => {
        setIsVisited(true)
        setSearchTerm('')
        if (isVisited) {
            console.log(searchTerm)
        }
    }

    return (
        <div className='metro-searchbar'>
            <form type='submit'>
                <input type='text'  
                    onClick={handleClick} 
                    onChange={handleOnChange} 
                    value={searchTerm}
                />
            </form>
        </div>
    )
}

export default SearchBar
