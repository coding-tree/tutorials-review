import React, { Component } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
class BookList extends Component {
  static contextType = ThemeContext;
  render() {
    const { isLightTheme, light, dark } = this.context;
    const theme = isLightTheme ? light : dark;
    return (
      <div
        style={{ background: theme.bg, color: theme.syntax }}
        className="book-list"
      >
        <ul>
          <li style={{ background: theme.ui }}>hari pota</li>
          <li style={{ background: theme.ui }}>tibijska przygoda</li>
          <li style={{ background: theme.ui }}>szczupak król stawu</li>
        </ul>
      </div>
    );
  }
}

export default BookList;
