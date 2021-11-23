import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from "react-query";


const Ticker = () => {
  const fetchTicker = async () => {
    const response = await fetch("http://localhost:8000/api/user/dashboard/");
    console.log("tickers response", response);
    const tickers = await response.json();
    console.log("tickers ", tickers);

    return tickers;
  };
  
  const { status, data, error } = useQuery("tickers", fetchTicker);
  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }
  return (
   
    <>
      <ul>
        {data.map((tickers) => (
          <li key={tickers.pk}>{tickers.fields.tickers_text}{" "}Quantity: {tickers.fields.shares_holding}</li>
        ))}
      </ul>
    </>
  )
}

export default Ticker

