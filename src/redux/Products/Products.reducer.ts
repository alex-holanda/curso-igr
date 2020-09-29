import { Action } from './../index';
import { Product } from './../../shared/Table/Table.mockdata';
import Products from "../../shared/Table/Table.mockdata";

export default function(state = Products, action: Action): Product[] {
  switch(action.type) {
    case 'FETCH_PRODUCTS':
      return [...action.payload];

    default:
      return state;
  }
}