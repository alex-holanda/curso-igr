import React from 'react';
import './App.css';

import Header from '../Header';
import Container from '../../shared/Container';

function TestComponent() {
  return <img
      width="16px"
      src="https://www.iconfinder.com/data/icons/pixel-perfect-at-16px-volume-1/16/5023-512.png"
      alt="search"/>
}

function App() {

  return (
    <div className="App">
      <Header title="AlgaStock" />
      <Container>
        <ul>
          {
            ['Daniel', 'William', 'Thiago', 'Daniel'].map((name, index) => {
              return <li key={index}>
                { name }
              </li>
            })
          }
        </ul>
      </Container>
    </div>
  );
}

export default App;
