import React from 'react'

function SongCard(props) {

    const {song} = props

    const renderGenres = (genres) => {
        if (genres) {
            const newArr = []
            for (let i = 0; i < genres.length; i++) {
                newArr.push(genres[i][0].toUpperCase()+genres[i].slice(1))
            }
            return newArr.join(', ')
        }
        return undefined
    }

    return (
        <>
        <div className="songcard">
            <div className='songcard-left'>
                <i className='fas fa-play-circle' 
                    onMouseEnter={e => e.target.className='far fa-play-circle'} 
                    onMouseLeave={e => e.target.className='fas fa-play-circle'}
                />
            <div>
                <div className="songcard-title">{song.song_title}</div>
                <div className="songcard-artist">{song.artist.name}</div>
            </div>
            </div>
            <div>{renderGenres(song.artist.genres)}</div>
        </div>
        </>
        )
}

export default SongCard
