import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { userService } from "../_services";

const HomePage = props => {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState("");
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setUsers({ loading: true });
    userService.getAll().then(users => setUsers(users));
  }, []);

  return (
    <div className="col-md-6 col-md-offset-3">
      <h1>Hi {user.firstName}!</h1>
      <p>You're logged in with React & Basic HTTP Authentication!!</p>
      <h3>Users from secure api end point:</h3>
      {users.loading && <em>Loading users...</em>}
      {users.length && (
        <ul>
          {users.map((user, index) => (
            <li key={user.id}>{user.firstName + " " + user.lastName}</li>
          ))}
        </ul>
      )}
      <p>
        <Link to="/login">Logout</Link>
      </p>
    </div>
  );
};

export { HomePage };
