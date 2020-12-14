import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";

import LoadingPie from "../../components/LoadingPie";
import VolumePie from "./VolumePie";
import useCoinData from "./useCoinData";
import colors from "../../utils/colors";

const Cryptocurrency = ({}) => {
  const { data, isError, isLoading } = useCoinData();

  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [selectedExchange, setSelectedExchange] = useState([]);
  const [exchanges, setExchanges] = useState(new Set());
  const [exchangeStats, setExchangeStats] = useState({});
  const [volumePieData, setVolumePieData] = useState({});

  const coinName = pair => pair.match(/(\w+)\/USD/)[1];

  useEffect(() => {
    prepPieChartData();
  }, [selectedCoin]);

  const setupCoinList = () => {
    const coinsList = data.map(coin => coinName(coin[0].pair));
    setCoins(coinsList);
    setSelectedCoin(coinsList[0]);
    return coinsList[0];
  };

  const setupExchangesList = () => {
    const unrecordedExchanges = [];
    data.forEach(coin => {
      coin.forEach(exchange => {
        if (!exchanges.has(exchange.exchange_id))
          unrecordedExchanges.push(exchange.exchange_id);
      });
    });
    const exchangesSet = new Set([...exchanges, ...unrecordedExchanges]);
    setExchanges(exchangesSet);
    return exchangesSet;
  };

  const addInfoToExchanges = () => {
    const newExchangeStats = {};
    data.forEach(coin => {
      let totalVolume = 0;
      let i = 0;
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
      coin.forEach(exchange => {
        const coinInfo =
          newExchangeStats[exchange.exchange_id][coinName(exchange.pair)];
        coinInfo.volumePercentage = coinInfo.volume / totalVolume;
      });
    });
    setExchangeStats(newExchangeStats);
    return newExchangeStats;
  };

  const prepPieChartData = () => {
    let data = [...exchanges];
    setVolumePieData(
      data
        .map(exchange => {
          console.log(`exchangestats exchange ${exchangeStats[exchange]}`);
          console.log(`exchange ${exchange} coin ${selectedCoin}`);
          const volume =
            (exchangeStats[exchange] &&
              exchangeStats[exchange][selectedCoin] &&
              exchangeStats[exchange][selectedCoin].volumePercentage) ||
            0;
          const color =
            (exchangeStats[exchange] &&
              exchangeStats[exchange][selectedCoin] &&
              exchangeStats[exchange][selectedCoin].color) ||
            "#000";
          return {
            name: exchange,
            y: parseFloat((volume * 100).toFixed(2)),
            color
          };
        })
        .filter(item => item.y > 0)
    );
  };

  if (!coins.length && data.length) {
    const newSelectedCoin = setupCoinList();
    const exchangesSet = setupExchangesList();
    const newExchangeStats = addInfoToExchanges();
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
        {coins ? (
          coins.map(coin => (
            <li
              onClick={() => setSelectedCoin(coin)}
              className={selectedCoin === coin && "selected"}
            >
              {coin}
            </li>
          ))
        ) : (
          <h5>Compiling data from APIs...</h5>
        )}
      </ul>
      <div className="pieContainer">
        <VolumePie data={volumePieData} selectExchange={setSelectedExchange} />
      </div>
    </div>
  );
};

export default Cryptocurrency;
