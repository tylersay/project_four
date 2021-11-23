import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Ticker from "./Ticker";
const queryClient = new QueryClient();



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
