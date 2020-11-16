import React, { useEffect, useRef, useState } from "react";

import asyncForEach from '../../utils/asyncForEach';

const Cryptocurrency = ({}) => {
  const [top10Coins, setTop10Coins] = useState([]);
  const [APIData, setAPIData] = useState({});

  async function getData(url, params) {
    const response = await fetch(url, params);
    return response.json();
  }

  function fetchCoins(exchanges) {
    console.log('fetching coins')
    const top10url = "https://api.coinpaprika.com/v1/coins";
    fetch(top10url)
      .then(res => res.json())
      .then(res => fetchRates(exchanges, res.slice(0, 10)))
      
  }

  function fetchExchanges() {
    console.log('fetching exchanges')
    const exchangesURL = "https://api.coinpaprika.com/v1/exchanges";
    fetch(exchangesURL)
      .then(res => res.json())
      .then(res => res.filter(exchange => !!exchange.adjusted_rank)
      .sort((a, b) => a.adjusted_rank - b.adjusted_rank).slice(0, 20))
      .then(objArr => new Set(objArr.map(obj => obj.id)))
      .then(top10Exchanges => fetchCoins(top10Exchanges))
  }

  async function getMarketInfoForCoin(exchanges, coin) {
    const url = `https://api.coinpaprika.com/v1/coins/${coin.id}/markets`;
    return fetch(url)
      .then(res => res.json())
      .then(markets => markets.filter(market => market.pair.endsWith("USD")))
      .then(markets => {console.log(markets); return markets;})
      .then(markets => markets.filter(market => exchanges.has(market.exchange_id)))
      .then(markets => {console.log(markets); return markets;})
  }

  async function fetchRates(exchanges, coins) {
    console.log('fetching rates')
    console.log(exchanges, coins)
    const getCoinValues = async () => {
      return Promise.all(coins.map(coin => getMarketInfoForCoin(exchanges, coin)))
    }
    getCoinValues().then(coins => { console.log('the coins'); console.log(coins); setTop10Coins(coins)})
    console.log('just set coins')
  }

  useEffect(() => fetchExchanges(), []);

  console.log('top10Coins');
  console.log(top10Coins);
  return <div>
      {top10Coins.length}
    </div>
};

export default Cryptocurrency;
