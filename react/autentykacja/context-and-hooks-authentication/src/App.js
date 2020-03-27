import React from "react";
import { users } from "./mocks/users";

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

// należy wpisać poprawny login, żeby wyświetlić stronę dla zalogowanych, lub wprowadzić niepoprawne dane, żeby uzyskać efekt przeciwny
const login = users.find(user => user === "andrew");

const getUser = () => sleep(1000).then(() => ({ username: login }));

const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const [state, setState] = React.useState({
    status: "pending",
    error: null,
    user: null
  });

  React.useEffect(() => {
    getUser().then(
      user => setState({ status: "success", error: null, user }),
      error => setState({ status: "error", error, user: null })
    );
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {state.status === "pending" ? (
        "Loading..."
      ) : state.status === "error" ? (
        <div>
          Oh no
          <div>
            <pre>{state.error.message}</pre>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuthState = () => {
  const state = React.useContext(AuthContext);
  const isPending = state.status === "pending";
  const isError = state.status === "error";
  const isSuccess = state.status === "success";
  const isAuthenticated = state.user && isSuccess;
  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated
  };
};

const Footer = () => {
  return <p>This is an awesome app!</p>;
};

const Header = () => {
  const { user } = useAuthState();
  return (
    <p>
      Hello &nbsp;
      <span
        style={{ color: "red", fontFamily: "monospace", fontSize: "1.3rem" }}
      >
        {user.username}
      </span>
      .
    </p>
  );
};

const Content = () => {
  const { user } = useAuthState();
  return (
    <p>
      I am so happy to have you here &nbsp;
      <span
        style={{ color: "red", fontFamily: "monospace", fontSize: "1.3rem" }}
      >
        {user.username}
      </span>
      .
    </p>
  );
};
const UnauthenticatedHeader = () => {
  return <div>Please log in</div>;
};

const UnauthenticatedContent = () => {
  return <p>You must login to read the message</p>;
};

const UnauthenticatedApp = () => {
  return (
    <>
      <UnauthenticatedHeader />
      <UnauthenticatedContent />
    </>
  );
};

const AuthenticatedApp = () => {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};

const Home = () => {
  const { user } = useAuthState();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

const App = () => {
  return (
    <AuthProvider>
      <div>
        <h1>Hello there</h1>
        <p>Welcome to my app...</p>
        <Home />
      </div>
    </AuthProvider>
  );
};

export default App;
