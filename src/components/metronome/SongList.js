
import axios from 'axios'

import {useEffect, useState} from 'react'

import SongCard from './SongCard'

function SongList(props) {

const BPM_API_KEY = '59d26b50dd52ee5de04287f8a5837b8f'
const { bpm, showSongs} = props

 const [songs, setSongs] = useState([])
 const [rawList, setRawList] = useState([])
 const [listStart, setListStart] = useState(0)
 const [listEnd, setListEnd] = useState(10)
 const [pageCounter, setPageCounter] = useState(1)
 const [songListIsLoading, setSongListIsLoading] = useState(false)
 const [prevRawList, setPrevRawList] = useState([])


useEffect(() => {
    setPrevRawList(rawList)
}, [rawList])

 useEffect(() => {
     (async () => {
         const KEY = BPM_API_KEY
         setSongListIsLoading(true)
         const res = await axios.get(`https://api.getsongbpm.com/tempo/?api_key=${KEY}&bpm=${bpm}`)
         if (res) {
             console.log(res)
             setSongListIsLoading(false)
             setRawList(res.data.tempo)
        } else {
            console.log(res.statusText)
         }
        })()
      }, [bpm])

// test api call
      useEffect(() => {
          (async () => {
              const res = await axios.get(`https://api.getsongbpm.com/song/?api_key=${BPM_API_KEY}&id=983pB`)
              console.log(res)
          })()
      }, [])
      
      
      useEffect(() => {
        setSongs(rawList.slice(listStart, listEnd))
      }, [rawList, listStart, listEnd])

    const renderDescription = () => {
      if (!showSongs) {
        return (
          <div>
              <h1>Songs and Tempo Finder</h1>
              <p>
                  This app combines the functionality of a metronome and a track finder.<br /> <br />
                  It allows you to find the tempo of a song by clicking in rhythm on the 'Tap' button (Two concentric circles, on the right of the 'Play' icon button)<br /> <br />
                  Once the desired tempo is set, the user can click the 'List' button (on the left of the 'Play' icon button and get a randomly selected list of tracks of the same tempo)<br />
                  The list will update in real time as the tempo changes, should the user decide to explore genre options at neighboring tempos. <br /><br />
                  This is obviously quite a useful tool for DJ's, amateurs or professionals, who are looking for a simple tool to craft their sets and transition smoothly from one track to another with similar tempos.
              </p>
          </div>
        )
      }
    }
    
const renderSongListWithNav = () => {
    if (songListIsLoading && prevRawList !== rawList) {
        return <div className='songlist-spinner fas fa-spinner'></div>
    }
    if (songs && showSongs) {
        return (
            <>
                {renderSongList()}
                    <div className='songlist-nav-ctn'>
                    <div className='songlist-nav-btn fas fa-chevron-left' onClick={handleNavClick} keyword='Prev'></div>
                        <div>Page {pageCounter}</div>                    
                    <div className='songlist-nav-btn fas fa-chevron-right' onClick={handleNavClick} keyword='Next'></div>
                </div>
            </>
        )
    }
}

const renderSongList = () => {
    return (
            songs.map(song => {
            return (
                <SongCard song={song}/>
            )
        })
        )
}

const handleNavClick = (e) => {
    if(e.target.attributes.keyword.value === 'Prev') {
        if (listStart > 0) {
            setListStart(listStart-10)
            setListEnd(listEnd-10)
            if (pageCounter !== 1) {
                setPageCounter(pageCounter-1)
            }
        }
    }
    if(e.target.attributes.keyword.value === 'Next') {
        if (listEnd < 250) {
            setListStart(listStart+10)
            setListEnd(listEnd+10)
            setPageCounter(pageCounter+1)
        }
        }
    }

    return (
        <>
            <div className={`metro-songlist ${showSongs?'open':'closed' }`}>
                {renderDescription()}
                {renderSongListWithNav()}
            </div>
        </>
    )
}

export default SongList
