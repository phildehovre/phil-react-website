import React, {useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import Metronome from './metronome/Metronome'
// import Songlist from './metronome/SongList'

import './style.css'

function App() {

    const [showSongs, setShowSongs] = useState(false)


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
    
    function scrollIntoView(e) {
        const element = document.getElementById(e.target.attributes.linked.value)
        console.log(element)
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
    }

    return (
        <div className='main-container'>
            <BrowserRouter>
            <nav className='navbar'>
                {/* <img alt=''/> */}
                <div className='navbar logo'>Phil De Hovre</div>
                <div onClick={scrollIntoView} className='navbar button' linked='hero-there'>Home</div>
                <div onClick={scrollIntoView} className='navbar button'linked='metro-there'>Projects</div>
                <div onClick={scrollIntoView} className='navbar button'linked='contact-there'>Contact</div>
                <div onClick={scrollIntoView} className='navbar button' linked='about-there'>About</div>
            </nav>
            <div className='hero' id='hero-there'>
                <div className='headline-container'>
                    <p className='headline-subtitle'>Self-taught web developer</p>
                    <h1>A different perspective for a better business</h1>
                <div className='headline-cta'>
                        <div className='headline-cta-logo'></div>
                        <h2 onClick={scrollIntoView} linked='metro-there'>My work</h2>
                    </div>
                </div>
            </div>
            <div className='about-container' id="about-there">
                <div className='about-left'>
                    <h1>About me</h1>
                    <p>I am a self taught web developer, professional musician and jack of all trades.<br /> <br/>
                    I started studying html, css then javascript in the summer of 2020, being unable to perform live as a professional musician due to government restrictions. I quickly moved on to learning React and building my own projects.<br/><br/>
                    I am passionate about clean code and I am constantly improving my designs. My background as a musician means I am naturally inclined to look at things from a different standpoint and a real eye for esthetics.</p>
                    <div className='headline-cta'>
                        <div className='headline-cta-logo'></div>
                        <h2>My work</h2>
                    </div>
                </div>
                <div className='about-right'>
                    <h1>Skillset</h1>
                    <ul>
                        <li>Javascript ES6</li>
                        <li>React</li>
                        <li>Redux</li>
                        <li>Node.JS/Express</li>
                        <li>Data Structures and Algorithms</li>
                    </ul>
                </div>
            </div>
            <div className='metro-container'>
                <div className='metro-left'>
                    {renderDescription()}
                </div>
                <div className={`metro-right ${showSongs? `showsongs`: ``}`}>
                    <Metronome showSongs={showSongs} setShowSongs={setShowSongs}/>
                </div>
            </div>
            <div className="contact-container" id="contact-there">
                <div>Telephone: +44 (0)7907318221</div>
                <div>Email: ph.dehovre@gmail.com</div>
                <div>github: https://github.com/phildehovre/</div>
            </div>
            <div className='copyright'>copyright Philippe De Hovre 2022</div>
            </BrowserRouter>
        </div>
    )
}

export default App
