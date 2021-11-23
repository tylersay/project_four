import {useState} from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainheader from "./components/Mainheader";
import Login from "./components/Login"
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout"



function App() {

  

  
  return (
    <div className="App">
      <Router>
          <Mainheader />
        
        <Routes>
          <Route path="/" element={<h1>HOME</h1>} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/logout" element={<Logout />} /> 
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
