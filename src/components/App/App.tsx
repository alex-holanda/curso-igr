import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import HomeView from '../../views/HomeView';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <switch>
          <Route path='/' exact component={HomeView} />
        </switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
