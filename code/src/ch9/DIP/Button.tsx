import { ButtonProps } from '../types';
import { SyntheticEvent } from 'react';

const Button = ({ onClick: provided, name, ...rest }: ButtonProps) => {
  const onClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    return provided?.(e);
  };
  return <button onClick={onClick} {...rest} />;
};

export default Button;
