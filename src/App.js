import React from 'react';
import './App.css';
import { CONFIG } from './utils/constants'; 
import Contacts from './components/Contacts';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="page-title">{CONFIG.title}</h2>
      </header>
      <main>
        <div className="contact-page">
          <Contacts />
        </div>
      </main>
    </div>
  );
}

export default App;
