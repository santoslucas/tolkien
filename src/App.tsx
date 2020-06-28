import React from 'react';
import './App.css';
import UserProvider from './UserProvider';
import MainComponent from './main-component';

function App() {
  return (
    <UserProvider>
      <MainComponent />
    </UserProvider>
  );
}

export default App;
