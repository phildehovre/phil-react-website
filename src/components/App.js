import React, {useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
// import Metronome from './metronome/components/UI'
import Metronome from './metronome/Metronome'

import './style.css'

function App() {

    const [showSongs, setShowSongs] = useState(false)
    
    function scrollIntoView(e) {
        const element = document.getElementById(e.target.attributes.linked.value)
        element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }

    return (
        <div className='main-container'>
            <BrowserRouter>
            <nav className='navbar'>
                <img alt=''/>
                <div className='navbar logo'>Phil De Hovre</div>
                <div onClick={scrollIntoView} className='navbar button'>Home</div>
                <div onClick={scrollIntoView} className='navbar button'linked='metro-there'>Projects</div>
                <div onClick={scrollIntoView} className='navbar button'>Contact</div>
                <div onClick={scrollIntoView} className='navbar button' linked='about-there'>About</div>
            </nav>
            <div className='hero'>
                <div className='headline-container'>
                    <p className='headline-subtitle'>Self-taught web developer</p>
                    <h1>A different perspective for a better business</h1>
                    <div className='headline-cta'>
                        <div className='headline-cta-logo'></div>
                        <h2>My work</h2>
                    </div>
                </div>
            </div>
            <div className='about-container' id="about-there">
                <div className='about-left'>Left</div>
                <div className='about-right'>right</div>
            </div>
            <div className='metro-container' id="metro-there">
                <div className='metro-left'>
                </div>
                <div className={`metro-right ${showSongs? `showsongs`: ``}`}>
                    <Metronome showSongs={showSongs} setShowSongs={setShowSongs}/>
                </div>
            </div>
            {/* <Metronome /> */}
            </BrowserRouter>
        </div>
    )
}

export default App
