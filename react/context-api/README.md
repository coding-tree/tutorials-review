# Context API

## Wprowadzenie

- Repozytorium stworzone na podstawie kursu "React Context & Hooks Tutorial" autorstwa The Net Ninja.  
  **_[Link do playlisty](https://www.youtube.com/watch?v=6RhOzQciVwI&list=PL4cUxeGkcC9hNokByJilPg5g9m2APUePI)_**
- Będą tutaj umieszczane stworzone przeze mnie notatki z każdej lekcji oraz fragmenty kodu autorstwa The Net Ninja, lub też wykonanego przeze mnie.

---

## Słownik skrótów

_Dla uproszczenia będę korzystać z skrótów poniżej_

- **APP** - główny komponent/cała aplikacja
- **CA** - Context API
- **CP** - context provider
- **CC** - class component
- **FC** - functional component

## Odcinek 1 - wprowadzenie

- **CA** umożliwia w prosty sposób współdzielenie stanu między komponentami
- Hooksy pozwalają wykorzystać możliwości komponentów klasowych w komponentach funkcyjnych (np. wykorzystanie stanu, lub zarządzanie cyklem życia komponentu).

**Podsumowanie:**
_Stworzono prostą aplikację zawierającą 2 komponenty - nawigację oraz listę książek. Nic skomplikowanego._

## Odcinek 2 - Czym w ogóle jest **CA**?

_Krótki opis **CA**_

- Context umożliwia współdzielenie stanu między komponentami bez przekazywania go poprzez propsy. Pozwala pracować na współdzielonych danych w o wiele prostszy sposób. Jest on alternatywą dla Reduxa.

**_Do czego i jak możemy wykorzystać CA_**

- W **APP** mamy przechowane informacje o motywie, np. day-mode/night-mode. Gdy chcemy, żeby każdy (lub nie każdy) komponent "wiedział" o tym, jaki motyw jest ustawiony.
- Bez **CA** gdy mamy **APP** i 2 niezależne od siebie komponenty, np **_page view_** oraz **_navbar_**, które są rodzicami poszczególnie => **_page view_** jest rodzicem _booklist_, który jest rodzicem _bookdetails_ oraz _addbook_ oraz **_navbar_** który jest rodzicem _statusbar_. Chcemy, żeby wszystkie komponenty prócz ich rodziców "wiedziały" o ustawionym motywie. Bez **CA** żeby przekazać propsy jedynie dzieciom, musimy je również przekazać rodzicom.
- Żeby użyć **CA** musimy stworzyć **CP**
- Nie zawsze powinniśmy używać **CA**. Służy on do przechowywania danych globalnie. Na przykład wyżej wymieniony motyw, informację o tym czy użytkownik jest zalogowany, zautoryzowany, czy też preferowany język na stronie.

_Przydatne do wgrania_ - react developer tools

**Podsumowanie:** _Opisano w kilku słowach czym jest **CA** i do czego można to w ogóle wykorzystać._

## Odcinek 3 - Dodajmy Context i Providera

- Na początku warto stworzyć folder o nazwie **_contexts_**, żeby utrzymać porządek. Wiadomo, każdy ma ulubioną strukturę folderów, nic na siłę :D
- Tworzymy plik o nazwie **_ThemeContext.js_** a w nim umieszczamy kod

```JavaScript
// importujemy createContext
import React, { createContext, Component } from "react";
// tworzymy zmienną i ją eksportujemy, musimy wywołać w niej createContext
export const ThemeContext = createContext();
// tworzymy komponent klasowy, który nazywamy tak samo jak wyżej stworzony
// context z dopiskiem Provider (znowu kwestia sporna, każdy nazywa jak chce! :D)
class ThemeContextProvider extends Component {
//  a następnie w nim stan, który chcemy przekazać
 state = {
    isLightTheme: true,
    light: {
      syntax: "#555",
      ui: "#ddd",
      bg: "#eee"
    },
    dark: {
      syntax: "#ddd",
      ui: "#333",
      bg: "#555"
    }
  };
  render() {
    // zwracamy komponent ThemeContext, a dokładniej jego provider który jako value przyjmuje cały state
    // a w środku chcemy wszystko, co się w nim znajdzie, gdyż będziemy tym komponentem opakowywać inne
    return (
      <ThemeContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
export default ThemeContextProvider;
```

**Następnie w pliku App.js umieszczamy kod**

```JavaScript
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import BookList from "./components/BookList";

// musimy zaimportować Context

import ThemeContextProvider from "./contexts/ThemeContext";

// a następnie opakować to co chcemy w komponent Contextu

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
```
