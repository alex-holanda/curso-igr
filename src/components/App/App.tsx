import React, { useEffect, useState } from 'react';
import './App.css';

import Swal from 'sweetalert2';

import Header from '../Header';
import ProductForm, { ProductCreator } from '../Products/ProductForm';
import Container from '../../shared/Container';
import Table, { TableHeader } from '../../shared/Table';
import { Product } from '../../shared/Table/Table.mockdata';

import { 
  createSingleProduct, 
  deleteSingleProduct, 
  getAllProducts, 
  updateSingleProduct 
} from '../../services/Products.service';

const headers: TableHeader[] = [
  { key: 'id', value: '#' },
  { key: 'name', value: 'Product' },
  { key: 'price', value: 'Price' },
  { key: 'stock', value: 'Available Stock', right: true }
];

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>();

  async function fetchData() {
    const _products = await getAllProducts();

    setProducts(_products);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductSubmit = async (product: ProductCreator) => {
    try {
      await createSingleProduct(product);
      fetchData();
    } catch (err) {
      Swal.fire('Ooops! ', err.message, 'error');
    }
  }

  const handleProductUpdate = async (newProduct: Product) => {
    try {
      await updateSingleProduct(newProduct);

      setUpdatingProduct(undefined);

      fetchData();
    } catch (err) {
      Swal.fire('Oops!', err.message, 'error');
    }
  }

  const handleProductEdit = (product: Product) => {
    setUpdatingProduct(product);
  }

  const handleProductDetail = (product: Product) => {
    Swal.fire(
      'Product details',
      `${product.name} costs $${product.price} and we have ${product.stock} available in stock.`,
      'info'
    );
  }

  const deleteProduct = async (id: string) => {
    try {
      await deleteSingleProduct(id);

      Swal.fire('Uhul!', 'Product successfully deleted', 'success');

      fetchData();
    } catch (err) {
      Swal.fire('Oops!', err.message, 'error');
    }
  }

  const handleProductDelete = (product: Product) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#09f',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete ${product.name}!`
    }).then((result) => {
      if (result.value) {
        deleteProduct(product._id);
      }
    });
  }

  return (
    <div className="App">
      <Header title="AlgaStock" />
      <Container>
        <Table
          headers={headers}
          data={products}
          enableActions={true}
          onDelete={handleProductDelete}
          onDetail={handleProductDetail}
          onEdit={handleProductEdit}
        />
        <ProductForm
          form={updatingProduct}
          onSubmit={handleProductSubmit}
          onUpdate={handleProductUpdate}
        />
      </Container>
    </div>
  );
}

export default App;
