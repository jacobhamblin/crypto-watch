import React, { useEffect, useState } from 'react';

import LoadingPie from "../../components/LoadingPie";
import useCoinData from './useCoinData';

const Cryptocurrency = ({}) => {
  const {data, isError, isLoading} = useCoinData();

  return isLoading ? (
    <div>
      Compiling data from APIs...
      <LoadingPie /> 
    </div>
  ) : (
    <div/>
  )

}

export default Cryptocurrency;
