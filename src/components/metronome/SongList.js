
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



 useEffect(() => {
     (async () => {
         const KEY = BPM_API_KEY
         setSongListIsLoading(true)
         const res = await axios.get(`https://api.getsongbpm.com/tempo/?api_key=${KEY}&bpm=${bpm}`)
         if (res) {
             setSongListIsLoading(false)
             setRawList(res.data.tempo)
             console.log('fetching')
        } else {
           console.log('error')
         }
         console.log(songListIsLoading)
        })()
      }, [bpm])
      
      
      useEffect(() => {
        setSongs(rawList.slice(listStart, listEnd))
      }, [rawList, listStart, listEnd])

    
const renderSongListWithNav = () => {
    if(songListIsLoading) {
        return <div className='songlist-spinner fas fa-spinner'></div>
    }
    if (songs && showSongs) {
        return (
            <>
                {renderSongList()}
                    <div className='songlist-nav-ctn'>
                    <div className='songlist-nav-btn fas fa-chevron-left' onClick={handleNavClick} keyword='Prev'></div>
                        <div>Page {pageCounter}</div>                    
                    <div className='songlist-nav-btn fas fa-chevron-right' onClick={handleNavClick} Keyword='Next'></div>
                </div>
            </>
        )
    }
}

const renderSongList = () => {
    if (!showSongs) {
        return (<>{props.renderDescription}</>)
    }
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
                {renderSongListWithNav()}
            </div>
        </>
    )
}

export default SongList
