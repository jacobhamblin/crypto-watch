import React from "react";
import numberWithCommas from "../../utils/numberWithCommas";
import RandomCharacters from "./RandomCharacters";

export default ({ name, info, coin }) => {
  const { volume, volumePercentage, price, color } = info;

  const firstLI = volume ? (
    <li>
      24h Volume:{" "}
      <span className="bold">
        {numberWithCommas(volume)} {coin}
      </span>
    </li>
  ) : (
    <li>
      <RandomCharacters numChars={30} />
    </li>
  );
  const secondLI = volumePercentage ? (
    <li>
      Volume % of total:{" "}
      <span className="bold">
        {parseFloat((volumePercentage * 100).toFixed(2))}%
      </span>
    </li>
  ) : (
    <li>
      <RandomCharacters numChars={21} />
    </li>
  );
  const thirdLI = price ? (
    <li>
      Price: <span className="bold">${numberWithCommas(price)}</span>
    </li>
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
