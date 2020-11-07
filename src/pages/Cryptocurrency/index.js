import React, { useEffect, useState } from "react";

const Cryptocurrency = ({}) => {
  const [APIData, setAPIData] = useState({});

  async function getData(url, params) {
    const response = await fetch(url, params);
    return response.json();
  }
  useEffect(() => {
    getData(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.REACT_APP_COINMARKETCAP_KEY
        }
      }
    ).then(data => setAPIData(data));
  }, []);

  console.log(APIData);
  return <div />;
};

export default Cryptocurrency;
