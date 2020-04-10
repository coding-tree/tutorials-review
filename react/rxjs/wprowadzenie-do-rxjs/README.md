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
import { map } from "rxjs/operators";

    let numbersObservable = from([1, 2, 3, 4, 5]);
    let squaredNumbers = numbersObservable.pipe(map((val) => val * val));
    // w console.logu nie otrzymamy wartości, lecz obiekt Observable
    console.log(squaredNumbers);
    // żeby wyświetlić wartości, musimy zasubskrybować naszego Observable
    squaredNumbers.subscribe((result) => console.log(result));
    // nie otrzymamy tutaj tablicy z numerami, lecz wiele console.logów
```
