## Co to jest redux?

- Jest to narzędzie służące do zarządzania stanem aplikacji.
- Redux nie jest wbudowany w create-react-app, więc musimy doinstalować

```bash
npm install redux react-redux
```

## Gdzie to się implementuje?

- W pliku src/index.js tworzymy store

**_store_** to globalny state
**_action_** - co chcesz zrobić (np. jestem głodny - opisuje to, że nie kupujesz w tym momencie jedzenia, tylko chcesz to zrobić bo jesteś głodny). Jest to funkcja zwracająca obiekt.
_przykład_

```JavaScript
const incremet = () => {
    return {
        type: 'INCREMENT'
    }
}

const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}
```

**_reducer_** - opisuje jak akcja zmienia state w kolejny state
_Przykład_

```JavaScript
const counter = (state = 0, action) => {
    switch(action.type){
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
    }
}
```

**_Tworzymy store_**

```JavaScript
let store = createStore(counter);
store.subscribe(() => {
  console.log(store.getState());
});
```

**_dispatch_** - jak wykonujemy akcję

```JavaScript
store.dispatch(increment());
```

- **_Nie jest_** to jednak dobre rozwiązanie, gdyż przy zwiększeniu ilości reducerów/akcji, kod robi się coraz bardziej nieczytelny. Możemy stworzyć 2 foldery - **_actions_** oraz **_reducers_**.
- W _reducers_ tworzymy 3 pliki: _counter.js_ _isLogged.js_ oraz _index.js_

```JavaScript
// counter.js
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state + 1;
    default:
      return state;
  }
};
export default counterReducer;
```

```JavaScript
// isLogged.js
const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return true;
    default:
      return null;
  }
};

export default loggedReducer;

```

```JavaScript
// index.js w folderze reducers
// ...
import counterReducer from "./counter";
import loggedReducer from "./isLogged";
// nie możemy do jednego store wrzucić kilku reducerów, więc użyjemy combineReducers
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
});

export default allReducers;

```

```JavaScript
// index.js w folderze src
import allReducers from "./reducers/index";
const store = createStore(allReducers);

```

- Warto doinstalować też **_Redux DevTools_**
- Żeby go poprawnie skonfigurować, w pliku index.js (tym w src), inicjalizujemy store

```JavaScript
// https://github.com/zalmoxisus/redux-devtools-extension#installation
const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
```

- Następnie musimy zaimportować **_Provider_** z 'react-redux' (**_nie z samego 'redux'!_**)
- Kolejnym krokiem jest owrapowanie naszej aplikacji Providerem:

```JavaScript
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

- W ten sposób uzyskujemy dostęp do naszego store w całej aplikacji

---

- Żeby uzyskać dostęp do store w dowolnym komponencie, musimy zaimportować **_useSelector_**

```JavaScript
// app.js (przykładowy komponent)
import React from "react";
import { useSelector } from "react-redux";
function App() {
  const counter = useSelector((state) => state.counter);
  const isLogged = useSelector((state) => state.isLogged);
  return (
    <div className="App">
      <h3>Nasz licznik:</h3>
      <h5>{counter}</h5>
      <h5>{isLogged}</h5>
  </div>
  );
}

export default App;

```

## Jak zmodyfikować dane?

- W folderze **_actions_** tworzymy plik **_index.js_**, a w nim umieszczamy

```JavaScript
export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

```

- Następnie w naszym komponencie importujemy tą akcję

```JavaScript

```

- Musimy jeszcze zaimportować **_useDispatch_**

```JavaScript
// tak ostatecznie będzie wyglądał nasz komponent App
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions";
function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h3>Nasz licznik:</h3>
      <h5>{counter}</h5>
      <button
        onClick={() => {
          dispatch(increment(5));
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -
      </button>
    </div>
  );
}

export default App;

```
