import React from 'react'

import axios from 'axios'

import {useEffect, useState} from 'react'
// import SongListHeader from './SongListHeader'


function SongList(props) {

    // const BPM_API_KEY = '59d26b50dd52ee5de04287f8a5837b8f'
    const BPM_API_KEY = 'process.env.BPM_API_KEY'
    const { bpm, showSongs, listSize} = props

 const [songs, setSongs] = useState([])
 const [rawList, setRawList] = useState([])


 useEffect(() => {
     (async () => {
         console.log('fetching')
         const KEY = BPM_API_KEY
         const res = await axios.get(`https://api.getsongbpm.com/tempo/?api_key=${KEY}&bpm=${bpm}`)
         if (res) {
           setRawList(res.data.tempo)
         } else {
           console.log('error')
         }
        })()
      }, [showSongs, bpm, listSize])
      
      
      useEffect(() => {
        setSongs(rawList.slice(0, listSize))
      }, [rawList, listSize])
      
//  useEffect(() => {
//    const prevSongs = songs
//     if (searchTerm && searchTerm.length > 0) {
//       const newSongs = rawList.filter(song => {
//         return song.artist.name.slice(0, searchTerm.length).toLowerCase() === searchTerm
//       })
//       setSongs(newSongs)
//     } else {
//       setSongs(prevSongs)
//     }
//  }, [songs, searchTerm, rawList, listSize])


    
    const renderSongList = () => {
      if (songs.length === 0 && showSongs) {
        return (
          <div className="metro-songlist-loader"></div>
          )}
          if (songs.length > 0 && showSongs) {
            return (      
              <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  {/* <SongListHeader header={'Title'} /> */}
                  <th>Artist </th>
                  <th>Album</th>
                  <th>Year</th>
                  <th>Genres</th>
                </tr>
              </thead>
              <tbody>
                {renderTable()}
              </tbody>
              </table>
          )
        }
      }
      
      const renderTable = () => {
        return songs.map((song, i) => {
          i = i +1
          const renderGenres = () => {
            if (song.artist.genres !== null) {
              return song.artist.genres[0]+', '+song.artist.genres[1]
            }
            return 'undefined'
          }

        const checkLength = (word) => {
          if (word.length > 20) {
            return word.slice(0, 20)+'...'
          }
          return word
        }

            return (
              <tr key={song.song_id}>
              <td className='index'>{i}</td>
                <td className='details'>{checkLength(song.song_title)}</td>
                <td className='details'>{checkLength(song.artist.name)}</td>
                <td className='details'>{checkLength(song.album.title)}</td>
                <td className='details'>{song.album.year}</td>
                <td className='details genres'>{renderGenres()}</td>
              </tr>
            )
          })
        }


      return (
        <div className={`metro-songlist ${showSongs?'open':'closed' }`}>
            {renderSongList()}
        </div>
    )
  }
  
  export default SongList