import React, { useEffect, useRef, useState } from "react";

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
    console.log(`Getting market info for coin ${coin.name}`)
    const url = `https://api.coinpaprika.com/v1/coins/${coin.id}/markets`;
    return fetch(url)
      .then(res => res.json())
      .then(markets => markets.filter(market => market.pair.endsWith("USD")))
      .then(markets => markets.filter(market => exchanges.has(market.exchange_id)))
  }

  async function fetchRates(exchanges, coins) {
    const getCoinValues = async () => {
      return Promise.all(coins.map(coin => getMarketInfoForCoin(exchanges, coin)))
    }
    getCoinValues().then(coins => setTop10Coins(coins))
  }

  useEffect(() => fetchExchanges(), []);

  return <div>
      {top10Coins.length}
    </div>
};

export default Cryptocurrency;
