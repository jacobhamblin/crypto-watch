import React from "react";

export default ({ name, info }) => {
  const { volume, price, color } = info;
  console.log("color");
  console.log(color);

  return (
    <div className="exchangeInfoContainer">
      <h3 style={{ backgroundColor: color }}>{name}</h3>
      <ul>
        <li>24h Volume: {volume}</li>
        <li>Price: ${price}</li>
      </ul>
    </div>
  );
};
