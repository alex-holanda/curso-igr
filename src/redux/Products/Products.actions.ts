import { Product } from './../../shared/Table/Table.mockdata';
import { Action, Thunk } from './../index';
import { getAllProducts } from './../../services/Products.service';
import { ProductCreator } from './../../components/Products/ProductForm';

export const getProducts = (): Thunk<Product[]> => async (dispatch: any) => {
  const products = await getAllProducts();

  console.log('fetched');

  dispatch ({
    type: 'FETCH_PRODUCTS',
    payload: products
  });
}

export const insertNewProduct = (payload: ProductCreator): Action<ProductCreator> => {
  return {
    type: 'INSERT_NEW_PRODUCT',
    payload
  }
}