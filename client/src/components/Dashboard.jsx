import React, { useState, useEffect, Fragment } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Table } from "reactstrap";

const queryClient = new QueryClient();

function Ticker({ userPK }) {
  const fetchTicker = async () => {
    const response = await fetch("http://localhost:8000/api/user/dashboard/");
    // console.log("response", response);
    const tickers = await response.json();
    console.log("ticker response", tickers);
    const userTicker = tickers.filter(
      (tickers) => tickers.fields.user == userPK
    );
    console.log("tickers ", userTicker);

    return userTicker;
  };
//  const userTicker = this.props.userTicker
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
        {data.map((userTicker) => (
          <li key={userTicker.pk}>
            {userTicker.fields.tickers_text} {" | "}
            Quantity: {userTicker.fields.shares_holding} {" | "}
            Date purchase: {userTicker.fields.bought_date}
          </li>
        ))}
      </ul>
    </>
  );
}

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [userPK, setUserPK] = useState();

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
          setUserPK(data.pk);
          setLoading(false);
        });
    }
  }, []);
  console.log("userPK", userPK);
  return (
    <div>
      {loading === false && (
        <>
          <h1>Dashboard</h1>
          <h2>Hello {userName}!</h2>
          <QueryClientProvider client={queryClient}>
            <Ticker userPK={userPK} />
          </QueryClientProvider>
        </>
      )}
    </div>
  );
};

export default Dashboard;
