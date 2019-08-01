import React from "react";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Body from "./components/layout/Body";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
