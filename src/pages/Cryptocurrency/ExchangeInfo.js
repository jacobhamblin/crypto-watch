import React from "react";
import numberWithCommas from "../../utils/numberWithCommas";
import RandomCharacters from "./RandomCharacters";

export default ({ name, info, coin }) => {
  const { volume, volumePercentage, price, color } = info;

  const firstLI = volume ? (
    <li>
      24h Volume: {numberWithCommas(volume)} {coin}
    </li>
  ) : (
    <li>
      <RandomCharacters numChars={22} />
    </li>
  );
  const secondLI = volumePercentage ? (
    <li>
      Volume % of total: {parseFloat((volumePercentage * 100).toFixed(2))}%
    </li>
  ) : (
    <li>
      <RandomCharacters numChars={25} />
    </li>
  );
  const thirdLI = price ? (
    <li>Price: ${numberWithCommas(price)}</li>
  ) : (
    <li>
      <RandomCharacters numChars={13} />
    </li>
  );
  return (
    <div className="exchangeInfoContainer">
      <h3 style={{ backgroundColor: color || "#ddd" }}>{name || "_"}</h3>
      <ul>
        {firstLI}
        {secondLI}
        {thirdLI}
      </ul>
    </div>
  );
};
