import React from "react";
import "./styles.css";
import UserList from "./UserList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">User Management</h1>
        <UserList />
      </header>
    </div>
  );
}

export default App;
