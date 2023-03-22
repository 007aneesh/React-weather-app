import "./App.css";
import React from "react";
// import { HashRouter, Route, Routes } from "react-router-dom";
import CurrentLocation from "./components/currentLocation";
function App() {
  return (
    <React.Fragment>
      <div className="container h-screen lg:h-screen mainc bg-no-repeat bg-cover md:max-w-full md:max-h-screen">
        <CurrentLocation />
      </div>
    </React.Fragment>
  );
}

export default App;
