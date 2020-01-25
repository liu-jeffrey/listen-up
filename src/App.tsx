import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SimpleCard from "./components/cards-dashboard/cards-dashboard";
import ScrollDialog from "./components/cards-dialogue/cards-dialogue";

function App() {
  return (
    <div className="App">
      <SimpleCard date={"January 25th, 2020"} 
      guestName={"Ollie"} keyWords={["thick", "girth", "treemap"]}/>
      <ScrollDialog date={"January 25th, 2020"} 
      guestName={"Ollie"} keyWords={["thick", "girth", "treemap"]} 
      transcript="NO U."/>
    </div>
  );
}

export default App;
