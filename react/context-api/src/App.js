import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import BookList from "./components/BookList";
import ThemeContextProvider from "./contexts/ThemeContext";

const App = props => {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Navbar />
        <BookList />
      </ThemeContextProvider>
    </div>
  );
};

export default App;
