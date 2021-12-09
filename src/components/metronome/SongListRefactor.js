import React, { Component } from 'react'
import axios from 'axios'

class SongListRefactor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bpm: this.props.bpm,
      rawList: [],
      songs: [],
      listSize: 25
    }
  }

  BPM_API_KEY = '93f2be180a4be75f06c1a7d2829e8bbc'

  fetchSongs = async () => {
    const KEY = this.BPM_API_KEY
    const res = await axios.get(`https://api.getsongbpm.com/tempo/?api_key=${KEY}&bpm=${this.state.bpm}`)
    this.setState({rawList: res.data.tempo})
    this.setState({songs: this.state.rawList.slice(0, this.state.listSize)})
  }

  // componentDidMount() {
  //     // this.fetchSongs()
  //     }


  componentDidUpdate() {
    this.fetchSongs()
    this.renderSongList()
  }

  renderSongList = () => {
    if (this.state.rawList.length === 0 && this.props.showSongs) {
    return (
      <div className="metro-songlist-loader"></div>
    )}
    if (this.state.rawList.length > 0 && this.props.showSongs) {
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
          {this.renderTable()}
        </tbody>
        </table>
    )
  }
}
      
    
    renderTable = () => {
      return this.state.songs.map((song, i) => {
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
              <td className='details'>{renderGenres()}</td>
            </tr>
          )
        })
      }

      render() {
        console.log(this.state.rawList)
        console.log(this.state.songs)
        return (
          <div className={`metro-songlist ${this.props.showSongs?'open':'closed' }`}>
              {this.renderSongList()}
          </div>
      )
  }
}


export default SongListRefactor