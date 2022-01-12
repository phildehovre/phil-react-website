import React, { useState, useEffect, useCallback } from 'react';
import useSound from 'use-sound';

import Dropdown from './Dropdown';
// import SearchBar from './SearchBar'
import './metronome.css'

import Sidestick from '../../assets/Click.wav'
import Cowbell from '../../assets/Cowbell.mp3';
import Woodblock from '../../assets/Woodblock.mp3';
import SongList from './SongList';
// import SongListRefactor from './SongListRefactor';



const Metronome = ({showSongs, setShowSongs}) => {

    const [play, setPlay] = useState(false)
    const [bpm, setBpm] = useState(120)
    const [tempoInterval, setTempoInterval] = useState(null)
    const [tapped, setTapped] = useState()
    const [soundEffect, setSoundEffect] = useState('sidestick')
    const [debouncedBpm, setDebouncedBpm] = useState(bpm)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    // const [searchTerm, setSearchTerm] = useState('Search')
    const [listSize, setListSize] = useState(25)


    const [cowbell] = useSound(Cowbell)
    const [woodblock] = useSound(Woodblock)
    const [sidestick] = useSound(Sidestick)

    // ========================== Tap Tempo Logic:

    const tapTempo = () => {
      if (tapped) {
        let elapsed = (new Date().getTime()) - tapped
        if (elapsed < 2500) {
          const tappedBpm = Math.round((6000/elapsed)*10)
          setBpm(tappedBpm)
        } else {
          setTapped(new Date().getTime())
        } 
      } 
      setTapped(new Date().getTime())
    } 

    const playSound = useCallback(() => {
      if (soundEffect === 'cowbell') {
        cowbell()
      } else if (soundEffect === 'woodblock') {
        woodblock()
      } else {
        sidestick()
      }
    }, [soundEffect, cowbell, woodblock, sidestick] )
        
    
    // Sound and Visual:

    const trigger = useCallback( (duration) => {
        if (play) {
          playSound()

        } else {
          return;
        }
    }, [play, playSound])



    
    const startClick = () => {
      setPlay(!play)      
    }

    
    // Tempo setter:

    useEffect(() => {
      const intervalId = setInterval(() => {
        trigger(tempoInterval);
      }, tempoInterval)
        return (() => {clearInterval(intervalId)})
    }, [play, tempoInterval, soundEffect, trigger])
    

    useEffect(() => {
        setTempoInterval((60/bpm)*1000);
        if (bpm <= 40) {
          setBpm(40)
        } 
        if (bpm >= 220) {
          setBpm(220)
        }
        const intervalId = setTimeout(() => {
            setDebouncedBpm(bpm)
            }, 500);
        return (() => {
            (clearTimeout(intervalId))
        })
    }, [bpm])
    
        

    // ========================== Song list Logic ===============================

    const generateSongs = () => {
      setShowSongs(!showSongs)
    }

    // const renderListSizeSelector = (bool) => {
    //   setShowListSizeSelector(bool)
    // }

    // const handleSearch = (searchTerm) => {
    //   console.log(searchTerm)
    // }

    const increment = () => {
      setBpm(Number(bpm) + 1)
    }
    const decrement = () => {
      setBpm(Number(bpm) - 1)
    }


    return (
        <div className='metronome'>
            <h1>Metronome</h1>
            <div className="metro-display">
                <div className="metro-btn decrement" onClick={decrement}>-</div>
                <div className='metro-display bpm'>{bpm}</div>
                <div  className="metro-btn increment" onClick={increment}>+</div>
            </div>
            <input type="range" min="40" max="220" value={bpm} onChange={e =>setBpm(e.target.value)}/>
            <div className="metro-controls">
                    <div onClick={startClick} className={`metro-btn ${play? `pause`: `play`} noSelect`} id='metro-there'></div>
            <div 
              className="metro-btn-generate"
              onClick={e => generateSongs()} 
              >
              </div>

            <div onClick={tapTempo} className="metro-btn-tap">
              <div className="outer"></div>
              <div className="inner"></div>
            </div>
            {/* <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
              /> */}
            <div className='metro-dropdown-header' onClick={e => setDropdownOpen(!dropdownOpen)}>{soundEffect}
              <Dropdown 
                open={dropdownOpen}
                soundEffect={soundEffect}
                setSoundEffect={setSoundEffect}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
                />
            </div>
            </div>
              <SongList 
                bpm={debouncedBpm}
                showSongs={showSongs}
                // searchTerm={searchTerm}
                listSize={listSize}
                setListSize={setListSize}
              />
              <input type='range' min='0' max='50' onChange={e => setListSize(e.target.value)}/>
              <div>{listSize}</div>
              <h6 style={{color: 'var(--secondary)'}}>Powered by GetSongBpm.com</h6>
        </div>
    )
}

export default Metronome

