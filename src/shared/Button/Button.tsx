import React from 'react';
import './Button.scss';

declare interface ButtonProps {
  content?: string,
  onClick?: () => void,
  appendIcon?: JSX.Element
}

const Button: React.FC<ButtonProps> = (props) => {
  return <button
    className="AppButton"
    onClick={props.onClick}
  >
    <p>{props.children || 'Nameless Button'}</p>
    {props.appendIcon}
  </button>
}

export default Button;