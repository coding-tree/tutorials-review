# Authentication

Aby uruchomić aplikację należy doinstalować zależności poprzez `npm install` i uruchomić ją za pomocą `npm start`

Prosta autentykacja stworzona przez Jasona Watmore przepisana przeze mnie na nieco nowszego Reacta z użyciem hooksów. Wykorzystuje localStorage oraz fake backend. Na potrzeby zrozumienia zasad łączenie się aplikacji frontendowej z serwerem powinna wystarczyć, lecz nie jest to zrobione zgodnie ze sztuką.
Token może być odczytany przez JavaScript, więc może zostać wykorzystana podatność XSS oraz potencjalny włamywacz może podszyć się pod użytkownika. Powinien on być przekazany w response i być dostępny tylko dla żądań HTTP.

Link do artykułu: https://jasonwatmore.com/post/2018/09/11/react-basic-http-authentication-tutorial-example
