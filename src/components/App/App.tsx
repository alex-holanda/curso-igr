import React, { useState } from 'react';
import './App.css';

import Header from '../Header';
import ProductForm, { ProductCreator } from '../Products/ProductForm';
import Container from '../../shared/Container';
import Table, { TableHeader } from '../../shared/Table';
import Producs, { Product } from '../../shared/Table/Table.mockdata';

const headers: TableHeader[] = [
  { key: 'id', value: '#' },
  { key: 'name', value: 'Product' },
  { key: 'price', value: 'Price' },
  { key: 'stock', value: 'Available Stock', right: true }
];

function App() {
  const [products, setProducts] = useState(Producs);

  const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(products[0]);

  const handleProductSubmit = (product: ProductCreator) => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        ...product
      }
    ])
  }

  const handleProductUpdate = (newProduct: Product) => {
    setProducts(products.map(product =>
      product.id === newProduct.id
        ? newProduct
        : product
    ));

    setUpdatingProduct(undefined);
  }

  return (
    <div className="App">
      <Header title="AlgaStock" />
      <Container>
        <Table
          headers={headers}
          data={products}
        />
        <ProductForm
          form={ updatingProduct }
          onSubmit={ handleProductSubmit }
          onUpdate={ handleProductUpdate }
        />
      </Container>
    </div>
  );
}

export default App;
