import { useState } from 'react';
import Button from '../Button/Button';
import classes from './Landing.module.scss';
// import React from 'react';
// import { Bounce, ToastContainer, toast } from 'react-toastify';

// const successToast = () =>
//   toast.success('Successfully deleted', {
//     position: 'bottom-right',
//     autoClose: 4000,
//     hideProgressBar: false,
//     closeOnClick: false,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: 'light',
//     transition: Bounce,
//   });
interface LandingProps {
  showTodoForm: () => void;
  showCategoryForm: () => void;
}
const Landing = ({ showTodoForm, showCategoryForm }: LandingProps) => {
  const [instructionsVisible, setInstructionsVisible] = useState(true);
  return (
    <>
      <h1 className={classes.heading}>Todo Lists</h1>
      {instructionsVisible && (
        <div className={classes.instructions}>
          <ul>
            <li>
              To create a new Todo or Category, click on the either of the
              buttons just below to use a form to create a new item.
            </li>
            <li>
              If you just want to quickly add new items, use the bar at the
              bottom.
            </li>
            <li>
              Todos not yet started/unassigned will be grey, in progress in
              yellow, overdue in red, and completed todos will be struck
              through.
            </li>
            <li>
              If you'd like to see what categories currently exist, click on the
              bar above. Categories can be edited here as well.
            </li>
          </ul>
          <Button onClick={() => setInstructionsVisible(false)}>Dismiss</Button>
        </div>
      )}

      <section className={classes.create_container}>
        <div className={classes.create}>
          <Button variant="add" size="extra_large" onClick={showTodoForm}>
            Create a new Todo
          </Button>
        </div>
        <div className={classes.create}>
          <Button variant="add" size="extra_large" onClick={showCategoryForm}>
            Create a New Category
          </Button>
        </div>
      </section>
    </>
  );
};

export default Landing;
