import React, { useEffect, useState } from "react";

import LoadingPie from "../../components/LoadingPie";
import VolumePie from "./VolumePie";
import PriceBar from "./PriceBar";
import ExchangeInfo from "./ExchangeInfo";
import useCoinData from "./useCoinData";
import colors from "../../utils/colors";

const Cryptocurrency = ({}) => {
  const { data, isError, isLoading } = useCoinData();

  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [selectedExchange, setSelectedExchange] = useState("");
  const [exchanges, setExchanges] = useState(new Set());
  const [exchangeStats, setExchangeStats] = useState({});
  const [volumePieData, setVolumePieData] = useState({});
  const [priceBarData, setPriceBarData] = useState({});
  const [exchangeColors, setExchangeColors] = useState({});

  const coinName = pair => pair.match(/(\w+)\/USD/)[1];

  useEffect(() => {
    let data = [...exchanges];
    setVolumePieData(
      data
        .map(exchange => {
          const volume =
            (exchangeStats[exchange] &&
              exchangeStats[exchange][selectedCoin] &&
              exchangeStats[exchange][selectedCoin].volumePercentage) ||
            0;
          const color = exchangeColors[exchange];
          return {
            name: exchange,
            y: parseFloat((volume * 100).toFixed(2)),
            color
          };
        })
        .filter(item => item.y > 0)
    );
    setPriceBarData(
      data
        .map(exchange => {
          const price =
            (exchangeStats[exchange] &&
              exchangeStats[exchange][selectedCoin] &&
              exchangeStats[exchange][selectedCoin].price) ||
            0;
          const color = exchangeColors[exchange];
          return {
            name: exchange,
            y: price,
            color
          };
        })
        .filter(item => item.y > 0)
    );
  }, [exchangeStats, selectedCoin]);

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
    const exchangesSet = new Set([...exchanges, ...unrecordedExchanges]);
    setExchanges(exchangesSet);
    setSelectedExchange([...exchangesSet][0]);
    assignColorsToExchanges(exchangesSet);
  };

  const assignColorsToExchanges = exchangesSet => {
    const assignments = {};
    let i = 0;
    exchangesSet.forEach(exchange => {
      assignments[exchange] = colors[i++];
    });
    setExchangeColors(assignments);
  };

  useEffect(() => {
    const newExchangeStats = {};
    data.forEach(coin => {
      let totalVolume = 0;
      coin.forEach(exchange => {
        totalVolume += exchange.quotes?.USD?.volume_24h;
        const exchangeInfo = newExchangeStats[exchange.exchange_id] || {};
        exchangeInfo[coinName(exchange.pair)] = {
          volume: parseFloat(exchange.quotes?.USD?.volume_24h?.toFixed(2)),
          price: parseFloat(exchange.quotes?.USD?.price?.toFixed(2)),
          color: exchangeColors[exchange.exchange_id]
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
  }, [exchanges, exchangeColors]);

  if (!coins.length && data.length) {
    setupCoinList();
    setupExchangesList();
  }

  const selectedExchangeInfo =
    (exchangeStats[selectedExchange] &&
      exchangeStats[selectedExchange][selectedCoin]) ||
    {};

  return (
    <div>
      <ul className="coinTabs">
        {coins.length ? (
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
      <h2 className="volumeTitle">Exchange Volume Distribution</h2>
      <div className="volumeRow">
        <VolumePie
          data={volumePieData}
          selectExchange={setSelectedExchange}
          selected={selectedExchange}
        />
        <ExchangeInfo
          coin={selectedCoin}
          info={selectedExchangeInfo}
          name={selectedExchange}
        />
      </div>
      <h2 className="volumeTitle">Price Comparison</h2>
      <div className="priceRow">
        <PriceBar
          data={priceBarData}
          selectExchange={setSelectedExchange}
          selected={selectedExchange}
        />
      </div>
    </div>
  );
};

export default Cryptocurrency;
