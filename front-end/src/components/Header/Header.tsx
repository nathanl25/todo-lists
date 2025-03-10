import classes from './Header.module.scss';

const Header = () => {
  return (
    <nav className={classes.container}>
      <h1 className={classes.heading}>Todo List</h1>
    </nav>
  );
};

export default Header;
