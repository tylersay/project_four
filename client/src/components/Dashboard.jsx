import React, { useState, useEffect, Fragment } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

function Ticker() {
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
          <li key={tickers.pk}>{tickers.tickers_text}</li>
        ))}
      </ul>
    </>
  );
}

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("local storage", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      window.location.replace("http://localhost:3000/login");
    } else {
      fetch("http://127.0.0.1:8000/api/user/auth/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())

        .then((data) => {
          console.log("dashboard", data);
          setUserName(data.username);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div>
      {loading === false && (
        <>
          <h1>Dashboard</h1>
          <h2>Hello {userName}!</h2>
          <QueryClientProvider client={queryClient}>
            <Ticker />
          </QueryClientProvider>
        </>
      )}
    </div>
  );
};

export default Dashboard;
