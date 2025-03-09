// import { useContext } from 'react';
import classes from './Button.module.scss';
// import { ButtonContext } from '../../context/ButtonContextProvider';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'default' | 'edit' | 'delete' | 'add';
}

const Button = ({ variant = 'default', children, ...rest }: ButtonProps) => {
  //   const { editVisibility } = useContext(ButtonContext);
  return (
    <button className={classes[variant]} {...rest}>
      {children}
    </button>
  );
};

export default Button;
