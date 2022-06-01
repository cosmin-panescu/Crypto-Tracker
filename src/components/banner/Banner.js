import React from 'react'
import "./Banner.css"
import Carousel from './Carousel'

const Banner = () => {
    return (
        <div className="banner">
            <div className="banner-content">
                <h1 className='banner-subtitle'>Get the most important info regarding your favourite cryptocurrency</h1>
                <Carousel />
            </div>
        </div>
    )
}

export default Banner