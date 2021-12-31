import React, {useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
// import Metronome from './metronome/components/UI'
import Metronome from './metronome/Metronome'


import {bio} from '../assets/about'
import './style.css'

function App() {

    const [showSongs, setShowSongs] = useState(false)


    
    function scrollIntoView(e) {
        const element = document.getElementById(e.target.attributes.linked.value)
        console.log(element)
        // Event.stopPropagation()
        element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }

    return (
        <div className='main-container'>
            <BrowserRouter>
            <nav className='navbar'>
                <img alt=''/>
                <div className='navbar logo'>Phil De Hovre</div>
                <div onClick={scrollIntoView} className='navbar button' linked='hero-there'>Home</div>
                <div onClick={scrollIntoView} className='navbar button'linked='metro-there'>Projects</div>
                <div onClick={scrollIntoView} className='navbar button'linked=''>Contact</div>
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
                        <li>Javascript</li>
                        <li>Javascript</li>
                        <li>Javascript</li>
                        <li>Javascript</li>
                        <li>Javascript</li>
                    </ul>
                </div>
            </div>
            <div className='metro-container' id="metro-there">
                <div className='metro-left'>
                </div>
                <div className={`metro-right ${showSongs? `showsongs`: ``}`}>
                    <Metronome showSongs={showSongs} setShowSongs={setShowSongs}/>
                </div>
            </div>
            </BrowserRouter>
        </div>
    )
}

export default App
