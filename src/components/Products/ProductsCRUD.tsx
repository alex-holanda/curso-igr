import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import Table, { TableHeader } from '../../shared/Table';
import { Product } from '../../shared/Table/Table.mockdata';
import ProductForm, { ProductCreator } from './ProductForm';

import { connect, useDispatch } from 'react-redux';
import * as ProductsAction from '../../redux/Products/Products.actions';
import { RootState, ThunkDispatch } from '../../redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

const headers: TableHeader[] = [
  // { key: 'id', value: '#' },
  { key: 'name', value: 'Product' },
  { key: 'price', value: 'Price' },
  { key: 'stock', value: 'Available Stock', right: true }
];

declare interface ProductsCRUDProps {
  products: Product[]
}

const ProductsCRUD: React.FC<ProductsCRUDProps> = (props) => {
  const dispatch: ThunkDispatch = useDispatch();

  const params = useParams<{id?: string}>();
  const history = useHistory();
  const location = useLocation();

  const showErrorAlert = (err: Error) => Swal.fire('Ooops! ', err.message, 'error');

  const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>();

  useEffect(() => {
    setUpdatingProduct(
      params.id
        ? props.products.find(product => product._id === params.id)
        : undefined
    );
  }, [params, props.products]);

  useEffect(() => {
    dispatch(ProductsAction.getProducts())
      .catch(showErrorAlert);

    //eslint-disable-next-line
  }, []);

  const handleProductSubmit = async (product: ProductCreator) => {
    dispatch(ProductsAction.insertNewProduct(product))
      .catch(showErrorAlert);

  }

  const handleProductUpdate = async (newProduct: Product) => {
    await dispatch(ProductsAction.updateProduct(newProduct))
      .then(() => {
        setUpdatingProduct(undefined);
        history.push({
          pathname: '/products',
          search: location.search
        });
      })
      .catch(showErrorAlert);
  }

  const handleProductDetail = (product: Product) => {
    Swal.fire(
      'Product details',
      `${product.name} costs $${product.price} and we have ${product.stock} available in stock.`,
      'info'
    );
  }

  const deleteProduct = async (id: string) => {
    console.log(id);
    dispatch(ProductsAction.deleteProduct(id))
      .then(() => {
        setUpdatingProduct(undefined);
        Swal.fire('Uhul!', 'Product successfully deleted', 'success');
      })
      .catch(showErrorAlert);
  }

  const handleProductDelete = (product: Product) => {
    Swal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#09f',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, delete ${product.name}!`
      })
      .then(({ value }) => value && deleteProduct(product._id));
  }

  const handleProductEdit = (product: Product) => {
    history.push({
      pathname: `/products/${product._id}`,
      search: location.search
    });
  }

  return (
    <>
      <Table
        headers={headers}
        data={props.products}
        enableActions
        onDelete={handleProductDelete}
        onDetail={handleProductDetail}
        onEdit={handleProductEdit}
      />
      <ProductForm
        form={updatingProduct}
        onSubmit={handleProductSubmit}
        onUpdate={handleProductUpdate}
      />
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  products: state.products
});

export default connect(mapStateToProps)(ProductsCRUD);