## Czym jest rxjs?

- RxJS (Reactive Extensions for JavaScript)
- Jest to biblioteka, której głównym zastosowaniem jest implementacja Observables.

## Czym są Observables?

- Jest to kolekcja wywołań "przyszłych" wartości, lub zdarzeń
- Są to jakby promise na sterydach (promise emituje jedynie pojedynczą wartość, natomiast Observable emituje ich wiele)

## Instalacja

```bash
    npm install rxjs
```

## Przykłady

- Operator **_from_** pozwala nam stworzyć observable z różnych iterowalnych wartości, lub w szczególnych przypadkach z promisów

```JavaScript
import {from} from 'rxjs';
// operator map nie jest tym samym, co metoda map wbudowana w tablice javascriptowe
import { map, filter } from "rxjs/operators";

    let numbersObservable = from([1, 2, 3, 4, 5]);
    let squaredNumbers = numbersObservable.pipe(map((val) => val * val));
    // w console.logu nie otrzymamy wartości, lecz obiekt Observable
    console.log(squaredNumbers);
    // żeby wyświetlić wartości, musimy zasubskrybować naszego Observable
    let subscribtion = squaredNumbers.subscribe((result) => {
        console.log(result);
    });
    // nie otrzymamy tutaj tablicy z numerami, lecz wiele console.logów
     let squaredNumbers = numbersObservable.pipe(
     filter((val) => val > 2),
     map((val) => val * val)
  );
//   operatory są "lazy", więc map zostanie wykonany dopiero po tym, gdy filter zakończy swoje działanie
```

- W klasowym komponencie możemy to zrobić tak

```JavaScript
import React from "react";
import { from } from "rxjs";
// importujemy operator delay i mergeMap
import { map, filter, delay, mergeMap } from "rxjs/operators";
// inicjalizujemy nasze wartości
let numbersObservable = from([1, 2, 3, 4, 5]);
let squaredNumbers = numbersObservable.pipe(
  filter((val) => val > 2),
//   tworzymy mergeMap, żeby wyświetlić każdą wartość z opóźnieniem
// mergeMap domyślnie wykonuje się dla wszystkich wartości, więc musimy każdej z osobna przypisać delay
  mergeMap((val) => from([val]).pipe(delay(1000 * val))),
  map((val) => val * val)
);

class App extends React.Component {
  constructor() {
    super();
    this.state = { currentNumber: 0 };
  }
  componentDidMount() {
    this.subscribtion = squaredNumbers.subscribe((result) => {
      this.setState({ currentNumber: result });
    });
  }
  componentWillUnmount() {
    this.subscribtion.unsubscribe();
  }

  render() {
    return (
      <div className="App">
        <h1>Hello world</h1>
        <h3>Aktualny numer to: {this.state.currentNumber}</h3>
      </div>
    );
  }
}

export default App;

```

- Działa, ale nie jest to fajne. Zbyt dużo kodu. Nieczytelnego kodu.
