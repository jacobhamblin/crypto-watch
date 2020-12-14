import React from "react";

export default ({ name, info }) => {
  const { volume, price, color } = info;
  console.log("name");
  console.log(name);

  return (
    <div className="exchangeInfoContainer">
      <h3 style={{ backgroundColor: color || "#ddd" }}>{name || "_"}</h3>
      <ul>
        <li>24h Volume: {volume}</li>
        <li>Price: ${price}</li>
      </ul>
    </div>
  );
};
