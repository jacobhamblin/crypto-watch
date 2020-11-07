import React, { useEffect, useState } from "react";

const Cryptocurrency = ({}) => {
  const [APIData, setAPIData] = useState({});

  async function getData(url, params) {
    const response = await fetch(url, params);
    return response.json();
  }
  useEffect(() => {
    const url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5000&convert=USD";
    const fetchParams = {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_COINMARKETCAP_KEY
      }
    };
    fetch(url, fetchParams)
      .then(res => res.json())
      .then(res => setAPIData(res));
  }, []);

  console.log(APIData);
  return <div />;
};

export default Cryptocurrency;
