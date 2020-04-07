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

## Odcinek 4 - Dostęp do Contextu

- W komponencie w którym chcemy uzyskać dostep do Contextu, należy go zaimportować za pomocą

```JavaScript
// Navbar.js
import { ThemeContext } from "../contexts/ThemeContext";
```

oraz stworzyć statyczny typ

```JavaScript
static contextType = ThemeContext;
```

żeby się upewnić, że wszystko działa poprawnie, możemy wyświetlić

```JavaScript
console.log(this.context);
```

- W naszym komponencie Navbar musimy zaimportować ThemeContext i zdestrukturyzować context aplikacji. Otrzymamy dostęp do state naszego contextu.
- Możemy wtedy zmienić motyw na nocny/dzienny zależnie od parametrów, które są przekazane w context.

```JavaScript
import React, { Component } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
class Navbar extends Component {
  static contextType = ThemeContext;
  render() {
    console.log(this.context);
    const { isLightTheme, light, dark } = this.context;
    const theme = isLightTheme ? light : dark;
    return (
      <nav style={{ background: theme.ui, color: theme.syntax }}>
        <h1>Context API</h1>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

```

**_Podsumowanie_**: _Udało nam się uzyskać dostęp do kontekstu aplikacji w komponencie Navbar oraz ostylować go zależnie od otrzymanych parametrów._

## Odcinek 5 - Dostęp do Contextu cz. 2

- Zamiast tworzyć statyczny context, możemy użyć ContextConsumer, który jako parametr przyjmuje context
- Którego z nich używać? W zasadzie, jest to zależne od Ciebie
- Statyczny może byc używany w **_CC_** natomiast Consumer może być użyty zarówno w **_CC_** jak i **_FC_**
- Consumer może również konsumować kilka różnych Contextów

```JavaScript
// Navbar.js
class Navbar extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {context => {
          const { isLightTheme, light, dark } = context;
          const theme = isLightTheme ? light : dark;
          return (
            <nav style={{ background: theme.ui, color: theme.syntax }}>
              <h1>Context API</h1>
              <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </nav>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
```

**_Podsumowanie_**: _Zobaczyliśmy, jak można uzyskać dostęp do contextu inaczej. Nauczyliśmy się również, jak przekazać Context do ***FC***_

## Odcinek 6 - aktualizowanie Contextu

- Stworzyliśmy komponent ThemeToggle, którego funkcją jest (jak nazwa wskazuje) togglowanie motywu

```JavaScript
import React, { Component } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

class ThemeToggle extends Component {
  static contextType = ThemeContext;
  render() {
    const { toggleTheme } = this.context;
    return <button onClick={toggleTheme}>Toggle theme</button>;
  }
}

export default ThemeToggle;

```

- Następnie w _ThemeContext_ stworzyliśmy funkcję

```JavaScript
toggleTheme = () => {
    this.setState({ isLightTheme: !this.state.isLightTheme });
  };
```

- Którą przekazaliśmy do providera

```JavaScript
 <ThemeContext.Provider
        value={{ ...this.state, toggleTheme: this.toggleTheme }}
      >
```

- Następnie zaimportowaliśmy **_ToggleTheme_** w **_APP_**
- I w ten sposób możemy sobie "wyklikiwać" zmianę motywu

**_Podsumowanie_**: Nauczyliśmy się, jak przekazać funkcję zmieniającą context (stan) do komponentu i przekazać buttonowi onClicka

## Odcinek 7 - tworzenie kilku Contextów

- Jeśli oprócz zmiany motywu, chcemy mieć context np. do autentykacji, możemy stworzyć nowy context.
- Zależnie od tego, gdzie chcemy przekazać provider (czy np do 1 konkretnego komponentu, czy do całej aplikacji), możemy owrapować komponenty, którym chcemy przekazać kontext

```JavaScript
import React, { Component, createContext } from "react";
// plik AuthContext.js
export const AuthContext = createContext();
class AuthContextProvider extends Component {
  state = { isAuthenticated: false };
  toggleAuth = () => {
    this.setState({ isAuthenticated: !this.state.isAuthenticated });
  };
  render() {
    return (
      <AuthContext.Provider
        value={{ ...this.state, toggleAuth: this.toggleAuth }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
export default AuthContextProvider;

```

**_Podsumowanie_**: Stworzono AuthContext.js, przekazano context do wszystkich komponentów.

## Odcinek 7 - konsumowanie kilku Contextów

<!-- skonczone na 3:53 -->
