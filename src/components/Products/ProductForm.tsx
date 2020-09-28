import React, { useEffect, useState } from 'react';
import './ProductForm.scss';

import Form from '../../shared/Form';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import { Product } from '../../shared/Table/Table.mockdata';

declare interface InitialFormState {
  _id?: string;
  name?: string;
  price?: string;
  stock?: string;
}

export interface ProductCreator {
  name: string;
  price: number;
  stock: number;
}

declare interface ProductFormProps {
  form?: Product;
  onSubmit?: (product: ProductCreator) => void;
  onUpdate?: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = (props) => {
  const initialFormState: InitialFormState = props.form
    ? {
      _id: props.form._id,
      name: props.form.name,
      price: String(props.form.price),
      stock: String(props.form.stock)
    }
    : {
      name: '',
      price: '',
      stock: ''
    }

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    setForm(initialFormState);
  }, [props.form]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  const updateProduct = (product: InitialFormState) => {
    const productDto = {
      _id: String(product._id),
      name: String(product.name),
      price: Number(product.price),
      stock: Number(product.stock)
    }

    props.onUpdate &&
      props.onUpdate(productDto);
  }

  const createProduct = (product: InitialFormState) => {
    const productDto = {
      name: String(product.name),
      price: Number(product.price),
      stock: Number(product.stock)
    }

    props.onSubmit &&
      props.onSubmit(productDto);   
  }

  const handleFormSubmit = () => {
    form._id
      ? updateProduct(form)
      : createProduct(form);
    
    setForm(initialFormState);
  }

  const handleFormReset = () => {
    console.log('Reset');
    setForm(initialFormState);
  }

  return <Form
    title="Product form"
    onSubmit={handleFormSubmit}
  >
    <Input
      onChange={handleInputChange}
      name="name"
      value={form.name}
      label="Name"
      placeholder="E.g.: Cookie"
      required
    />

    <Input
      onChange={handleInputChange}
      name="price"
      value={ form.price }
      label="Price"
      type="number"
      step="0.01"
      min="0"
      placeholder="E.g.: 1.25"
      required
    />

    <Input
      onChange={handleInputChange}
      name="stock"
      value={form.stock}
      label="Stock"
      type="number"
      min="0"
      placeholder="E.g.: 10"
      required
    />

    <div className="footer">
      <Button>
        {
          form._id ? 'Update' : 'Submit'
        }
      </Button>

      <button className="buttonReset" onClick={handleFormReset}>Reset</button>
    </div>
    
  </Form>
}

export default ProductForm;