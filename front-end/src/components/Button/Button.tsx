// import { useContext } from 'react';
import classes from './Button.module.scss';
// import { ButtonContext } from '../../context/ButtonContextProvider';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'default' | 'edit' | 'delete' | 'add' | 'close';
  size?: 'medium' | 'large' | 'extra_large';
}

const Button = ({
  variant = 'default',
  size = 'medium',
  children,
  ...rest
}: ButtonProps) => {
  //   const { editVisibility } = useContext(ButtonContext);
  return (
    <button className={`${classes[variant]} ${classes[size]}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
