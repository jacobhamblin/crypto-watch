import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";

import LoadingPie from "../../components/LoadingPie";
import useCoinData from "./useCoinData";

const Cryptocurrency = ({}) => {
  const { data, isError, isLoading } = useCoinData();
  console.log(data);

  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");

  if (!coins.length && data.length) {
    const coins = data.map(coin => coin[0].pair.match(/(\w+)\/USD/)[1]);
    setCoins(coins);
    setSelectedCoin(coins[0]);
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
