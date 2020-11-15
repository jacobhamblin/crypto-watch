import React, { useEffect, useRef, useState } from "react";

const Cryptocurrency = ({}) => {
  const [top10Coins, setTop10Coins] = useState({});
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
      .then(res => res.sort((a, b) => a.adjusted_rank - b.adjusted_rank).slice(0, 10))
      .then(objArr => new Set(objArr.map(obj => obj.id)))
      .then(top10Exchanges => fetchCoins(top10Exchanges))
  }

  function fetchRates(exchanges, coins) {
    console.log('fetching rates')
    let coinValues = [];
    coins.forEach(coin => {
      const url = `https://api.coinpaprika.com/v1/coins/${coin.id}/markets`;
      fetch(url)
        .then(res => res.json())
        .then(markets => markets.filter(market => market.pair.endsWith("USD")))
        .then(markets => markets.filter(market => exchanges.has(market.id)))
        .then(markets => coinValues = coinValues.concat(markets))
    })
    setTop10Coins(coinValues);
  }

  useEffect(() => fetchExchanges(), []);

  console.log('top10Coins');
  console.log(top10Coins);
  return <div />;
};

export default Cryptocurrency;
