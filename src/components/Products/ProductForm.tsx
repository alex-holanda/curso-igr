import React, { useState } from 'react';

import Form from '../../shared/Form';
import Input from '../../shared/Input';
import Button from '../../shared/Button';

const initialState = {
  name: '',
  price: '',
  stock: ''
}

export interface ProductCreator { 
  name: string;
  price: number;
  stock: number;
}

declare interface ProductFormProps {
  onSubmit: (product: ProductCreator) => void
}

const ProductForm: React.FC<ProductFormProps> = (props) => {
  const [form, setForm] = useState(initialState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  const handleFormSubmit = () => {
    const productDto = {
      name: String(form.name),
      price: parseFloat(form.price),
      stock: Number(form.stock)
    }

    props.onSubmit(productDto);
    setForm(initialState);
  }

  return <Form
    title="Product"
    onSubmit={ handleFormSubmit }
  >
    <Input
      onChange={ handleInputChange }
      name="name"
      value={ form.name }
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
      value={ form.stock }
      label="Stock"
      type="number"
      min="0"
      placeholder="E.g.: 10"
      required
    />

    <Button>
      Submit
    </Button>
  </Form>
}

export default ProductForm;