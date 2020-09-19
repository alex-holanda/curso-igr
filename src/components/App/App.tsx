import React from 'react';
import './App.css';

import Header from '../Header';
import Container from '../../shared/Container';
import Table, { TableHeader } from '../../shared/Table';
import Producs from '../../shared/Table/Table.mockdata';

const headers: TableHeader[] = [
  { key: 'id', value: '#' },
  { key: 'name', value: 'Product' },
  { key: 'price', value: 'Price' },
  { key: 'stock', value: 'Available Stock', right: true }
];

function App() {

  return (
    <div className="App">
      <Header title="AlgaStock" />
      <Container>
        <Table
          data={ Producs }
          headers={ headers }
        />
      </Container>
    </div>
  );
}

export default App;
