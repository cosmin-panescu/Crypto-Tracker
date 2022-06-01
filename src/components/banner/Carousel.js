import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Banner.css"
import { TrendingCoins } from "../../config/api"
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom';

// function to display numbers with commas
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    //store trending coins
    const [trending, setTrending] = useState([]);

    //getting trending coins data
    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins('USD'));
        setTrending(data);
    };

    //getting trending coins data every time site loads 
    useEffect(() => {
        fetchTrendingCoins();
    }, []);

    //Display each item (each trending coin) for carousel
    const items = trending.map(coin => {
        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link className="carousel-item" to={`/coins/${coin.id}`} >
                <img src={coin?.image} alt={coin.name} className='carousel-item-image' />
                <span className='carousel-item-name-percentage'>
                    {coin?.symbol} &nbsp;
                    <span style={{ color: profit > 0 ? 'rgb(14, 203, 129)' : "red" }}>
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span className='carousel-item-price'>
                    ${numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    //setup for trending coins carousel
    const responsive = {
        0: {
            items: 2,
        },
        512: { //width > 512px ? display 5 items : display 2 items
            items: 4,
        },
        1000: {
            items: 5,
        }
    }

    return (
        <div className='carousel'>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1250}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel