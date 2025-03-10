// import { useState } from 'react';
import TodoQuickCreate from '../../components/TodoQuickCreate/TodoQuickCreate';
import classes from './QuickCreateBar.module.scss';
import CategoryQuickCreate from '../../components/CategoryQuickCreate/CategoryQuickCreate';

const QuickCreateBar = () => {
  //   const [errorMessage, setErrorMessage] = useState('');
  return (
    <>
      <section className={classes.container}>
        <div className={classes.forms}>
          <TodoQuickCreate />
          <CategoryQuickCreate />
        </div>
        {/* <small className={classes.error_message}>{errorMessage}</small> */}
      </section>
    </>
  );
};

export default QuickCreateBar;
