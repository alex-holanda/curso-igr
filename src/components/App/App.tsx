import React from 'react';
import './App.css';

import Header from '../Header';
import Button from '../../shared/Button';
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
        <Button 
          onClick={ () => window.alert('Alerta') }
          appendIcon={ <TestComponent /> }
        >
          Alert
        </Button>
      </Container>
    </div>
  );
}

export default App;
