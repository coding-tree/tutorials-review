import React from "react";
import { from } from "rxjs";
import { map } from "rxjs/operators";
const App = () => {
  let numbersObservable = from([1, 2, 3, 4, 5]);
  let squaredNumbers = numbersObservable.pipe(map((val) => val * val));
  console.log(squaredNumbers);
  squaredNumbers.subscribe((result) => console.log(result));
  return <div className="App"></div>;
};

export default App;
