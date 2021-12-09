import React from 'react'

import DropdownItem from './DropdownItem'


const Dropdown = (props) => {

    const {dropdownOpen, soundEffect, setSoundEffect, setDropdownOpen} = props

    const sounds = ['sidestick', 'cowbell', 'woodblock']
   
    const renderDropdown = () => {
        if (props.open) {
          const newSounds = sounds.filter(sound => {return sound !== soundEffect})
          return (
            newSounds.map(sound => {
              return (
                <DropdownItem 
                    sound={sound} 
                    key={sound}
                    setSoundEffect={setSoundEffect} 
                    setDropdownOpen={setDropdownOpen}
                    dropdownOpen={dropdownOpen}
                />
              )
            })
          )
        }
    }


    return (
      <div className={`metro-dropdown${dropdownOpen? ` open`: ` closed`}`}>
        {renderDropdown()}
        </div>
    )
  }

export default Dropdown
