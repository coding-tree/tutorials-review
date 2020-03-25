import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import BookList from "./components/BookList";

const App = props => {
  return (
    <div className="App">
      <Navbar />
      <BookList />
    </div>
  );
};

export default App;
