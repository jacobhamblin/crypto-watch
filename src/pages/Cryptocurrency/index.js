import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";

import LoadingPie from "../../components/LoadingPie";
import useCoinData from "./useCoinData";

const Cryptocurrency = ({}) => {
  const { data, isError, isLoading } = useCoinData();
  console.log(data);

  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [exchanges, setExchanges] = useState(new Set());
  const [exchangeStats, setExchangeStats] = useState({});

  const coinName = pair => pair.match(/(\w+)\/USD/)[1];

  const setupCoinList = () => {
    const coins = data.map(coin => coinName(coin[0].pair));
    setCoins(coins);
    setSelectedCoin(coins[0]);
  };

  const setupExchangesList = () => {
    const newExchangeStats = {};
    const unrecordedExchanges = [];
    data.forEach(marketsInfo => {
      marketsInfo.forEach(market => {
        if (!exchanges.has(market.exchange_id))
          unrecordedExchanges.push(market.exchange_id);
        newExchangeStats[coinName(market.pair)] = {
          volume: market.quotes?.USD?.volume_24h,
          price: market.quotes?.USD?.price
        };
      });
    });
    setExchanges([...exchanges, ...unrecordedExchanges]);
    setExchangeStats(newExchangeStats);
    console.log(newExchangeStats);
  };

  if (!coins.length && data.length) {
    setupCoinList();
    setupExchangesList();
  }

  return isLoading ? (
    <div>
      Compiling data from APIs...
      <LoadingPie />
    </div>
  ) : (
    <div>
      <ul className="coinTabs">
        {coins.map(coin => (
          <li
            onClick={() => setSelectedCoin(coin)}
            className={selectedCoin === coin && "selected"}
          >
            {coin}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cryptocurrency;
