import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from "../config/api";
import "./CoinPage.css"
import ReactHtmlParser from "react-html-parser"

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  //getting data for the chosen coin
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <div className="coin-page">
      <div className="coin-page-content">
        <div className="coin-image-name">
          <img src={coin?.image.large} alt={coin?.name} />
          <div className="coin-name-symbol">
            <h1>{coin?.name}</h1>
            <h1 style={{ textTransform: "uppercase" }}>{coin?.symbol}</h1>
          </div>
        </div>
        <div className="coin-prices">
          <h2>Current Price: ${coin?.market_data.current_price.usd}</h2>
          <h2>24h High: ${coin?.market_data.high_24h.usd}</h2>
          <h2>24h Low: ${coin?.market_data.low_24h.usd}</h2>
        </div>
        <p>{ReactHtmlParser(coin?.description.en)}</p>
        <div className="more-coin-info">
          <h2>{`Rank: ${coin?.market_cap_rank}`}</h2>
          <h2>All Time High: ${coin?.market_data.ath.usd}</h2>
          <h2>Release date: {coin?.genesis_date ? coin.genesis_date : "-"}</h2>
        </div>
      </div>
    </div>
  )
}

export default CoinPage