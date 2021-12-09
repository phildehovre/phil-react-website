import React from 'react'

const DropdownItem = (props) => {

    const {setDropdownOpen, setSoundEffect, dropdownOpen, sound} = props

    const handleClick = (e) => {
      setSoundEffect(sound)
      setDropdownOpen(!dropdownOpen)
      console.log(dropdownOpen)
 
    }

    return (
      <div className="metro-dropdown-item" onClick={e => handleClick(e)}>{sound}</div>
    )
  }

export default DropdownItem
