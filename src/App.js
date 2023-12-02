import React from "react";
import "./styles.css";
import UserList from "./UserList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="nav">
          <h1 className="App-title">USER MANAGEMENT SYSTEM</h1>
        </div>
        <UserList />
      </header>
    </div>
  );
}

export default App;
