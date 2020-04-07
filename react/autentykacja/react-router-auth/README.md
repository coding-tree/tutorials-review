## Authentication with router

Kolejna metoda autentykacji napisana z użyciem najnowszych ficzerów Reacta, czyli Context API oraz hooków. Aplikacja zawiera publiczne, jak i prywatne routy, przekierowanie do strony logowania, jeśli użytkownik nie posiada ważnego tokenu, zostanie przerzucony na stronę główną. Na minus niestety brak zamockowanego backendu, przez co nie można przetestować w pełni działającej aplikacji i musimy wierzyć programiście na słowo honoru oraz kilka pomniejszych błędów w kodzie, jak np. literówka w zmiennej referrer, przez co aplikacja rzuca błędem, że jest undefined.

Link do artykułu: https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71
