import classes from './Button.module.scss';
import { faGear, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface buttonProps {
  variant: string;
  children?: string;
  buttonFunction?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ variant, children, buttonFunction }: buttonProps) => {
  let btnVariant;
  let content;
  switch (variant) {
    case 'add':
      btnVariant = `${classes.add}`;
      content = <FontAwesomeIcon icon={faPlus} />;
      break;
    case 'delete':
      btnVariant = `${classes.delete}`;
      content = <FontAwesomeIcon icon={faTrash} />;
      break;
    case 'default':
      btnVariant = `${classes.default}`;
      content = <FontAwesomeIcon icon={faGear} />;
      break;
  }
  return (
    <button onClick={buttonFunction} className={btnVariant}>
      {children ?? content}
    </button>
  );
};

export default Button;
