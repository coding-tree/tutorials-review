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
