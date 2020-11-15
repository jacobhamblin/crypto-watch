import React, { useEffect, useRef, useState } from "react";

const Cryptocurrency = ({}) => {
  const [top10Coins, setTop10Coins] = useState({});
  const [APIData, setAPIData] = useState({});
  const coinValues = useRef([]);

  async function getData(url, params) {
    const response = await fetch(url, params);
    return response.json();
  }
  useEffect(() => {
    const top10url = "https://api.coinpaprika.com/v1/coins";
    fetch(top10url)
      .then(res => res.json())
      .then(res => {
        const top10Coins = res.slice(0, 10);
        setTop10Coins(top10Coins);
        console.log(top10Coins)
        top10Coins.forEach(coinDict => {
          const url = `https://api.coinpaprika.com/v1/coins/${coinDict.id}/markets`;
          fetch(url)
            .then(res => res.json())
            .then(res => {
              const markets = res.filter(market => market.pair.endsWith("USD")).slice(0, 10);
              coinValues.current = coinValues.current.concat(markets)
            });
      });
    })
  }, []);

  console.log(coinValues.current);
  return <div />;
};

export default Cryptocurrency;
