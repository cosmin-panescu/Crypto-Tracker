import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./CoinsTable.css"
import { CoinList } from "../../config/api"
import { numberWithCommas } from '../banner/Carousel';
import { Link } from 'react-router-dom';

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    //fetching data for all cryptocurrencies 
    const fetchCoins = async () => {
        const { data } = await axios.get(CoinList("USD"));
        setCoins(data);
    }

    //call fetching function when site loads
    useEffect(() => {
        fetchCoins()
    }, []);

    // search crypto by name or by symbol
    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
    );

    const handleChange = e => {
        setSearch(e.target.value)
    }

    return (
        <div className="coinsTable">
            <h2 className="coinsTable-title">Cryptocurrency Prices by Market cap</h2>
            <input
                type="text"
                placeholder='Search For a Cryptocurrency'
                className="coinsTable-search"
                onChange={handleChange}
            />

            <div className="coins-rows">
                <div className="coins-table-info coin-row">
                    <h2 style={{ textAlign: "left" }}>Cryptocurrency</h2>
                    <h2>Price</h2>
                    <h2>24h Change</h2>
                    <h2 className='mkc-info' style={{ textAlign: "right" }}>Market Cap</h2>
                </div>
                {filteredCoins.map(coin => {
                    let profit = coin.price_change_percentage_24h >= 0;

                    return (
                        <Link key={coin.symbol} to={`/coins/${coin.id}`} >
                            <div className="coin-row">
                                <div className="coin-name-img">
                                    <img src={coin.image} alt={coin.name} />
                                    <div className="coin-name-symbol">
                                        <h1>{coin.symbol}</h1>
                                        <h3>{coin.name}</h3>
                                    </div>
                                </div>
                                <h2>${coin?.current_price.toFixed(2)}</h2>
                                <h2 style={{ color: profit > 0 ? 'rgb(14, 203, 129)' : "red" }}>
                                    {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                                </h2>
                                <h2 className='mkc-info' style={{ textAlign: "right" }}>
                                    ${numberWithCommas(coin.market_cap)}
                                </h2>
                            </div>
                        </Link>
                    )
                })}
            </div>

        </div>
    )
}

export default CoinsTable
