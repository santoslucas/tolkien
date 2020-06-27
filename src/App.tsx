import React from 'react';
import './App.css';
import UserProvider from "./UserProvider";
import MainComponent from "./MainComponent";

function App() {
  return (
    <UserProvider>
      <MainComponent/>
    </UserProvider>
  );
}

export default App;
