import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";

import LoadingPie from "../../components/LoadingPie";
import useCoinData from "./useCoinData";
import colors from "../../utils/colors";

const Cryptocurrency = ({}) => {
  const { data, isError, isLoading } = useCoinData();
  console.log(data);

  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [exchanges, setExchanges] = useState(new Set());
  const [exchangeStats, setExchangeStats] = useState({});

  const coinName = pair => pair.match(/(\w+)\/USD/)[1];

  const setupCoinList = () => {
    const coinsList = data.map(coin => coinName(coin[0].pair));
    setCoins(coinsList);
    setSelectedCoin(coinsList[0]);
  };

  const setupExchangesList = () => {
    const unrecordedExchanges = [];
    data.forEach(coin => {
      coin.forEach(exchange => {
        if (!exchanges.has(exchange.exchange_id))
          unrecordedExchanges.push(exchange.exchange_id);
      });
    });
    setExchanges([...exchanges, ...unrecordedExchanges]);
  };

  const addInfoToExchanges = () => {
    let i = 0;
    const newExchangeStats = {};
    data.forEach(coin => {
      let totalVolume = 0;
      coin.forEach(exchange => {
        totalVolume += exchange.quotes?.USD?.volume_24h;
        const exchangeInfo = newExchangeStats[exchange.exchange_id] || {};
        exchangeInfo[coinName(exchange.pair)] = {
          volume: exchange.quotes?.USD?.volume_24h,
          price: exchange.quotes?.USD?.price,
          color: colors[i++]
        };
        newExchangeStats[exchange.exchange_id] = exchangeInfo;
      });
      coins.forEach(exchange => {
        const coinInfo =
          newExchangeStats[exchange.exchange_id][coinName(exchange.pair)];
        coinInfo.volumePercentage = totalVolume / coinInfo.volume;
      });
    });
    setExchangeStats(newExchangeStats);
  };

  if (!coins.length && data.length) {
    setupCoinList();
    setupExchangesList();
    addInfoToExchanges();
  }

  const stats = [];
  exchanges.forEach(exchange => {
    const volume =
      exchangeStats[exchange] &&
      exchangeStats[exchange][selectedCoin] &&
      exchangeStats[exchange][selectedCoin].volume;
    const price =
      exchangeStats[exchange] &&
      exchangeStats[exchange][selectedCoin] &&
      exchangeStats[exchange][selectedCoin].price;
    const volumePercentage =
      exchangeStats[exchange] &&
      exchangeStats[exchange][selectedCoin] &&
      exchangeStats[exchange][selectedCoin].volumePercentage;
    if (volume || price) {
      stats.push(
        <div>
          <div>{exchange}</div>
          <div>Volume: {volume}</div>
          <div>Price: {price}</div>
          <div>Volume Percentage: {volumePercentage}</div>
        </div>
      );
    }
  });

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
      <div>
        <h1>Some stats for now</h1>
        {stats}
      </div>
    </div>
  );
};

export default Cryptocurrency;
