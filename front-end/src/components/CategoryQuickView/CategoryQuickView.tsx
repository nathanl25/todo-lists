import { useContext } from 'react';
import { CategoryContext } from '../../context/CategoryContextProvider';
import classes from './CategoryQuickView.module.scss';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons';

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

export interface CategoryItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  // archivedAt: string;
  name: string;
  isArchived: boolean;
}

export interface CategoryData {
  categoriesData: CategoryItem[];
}

interface CategoryProps {
  data: CategoryItem;
  expandItem: (data: CategoryItem, mode: string) => void;
}

const CategoryQuickView = ({ data, expandItem }: CategoryProps) => {
  const { deleteCategory } = useContext(CategoryContext);

  const deleteFn = async () => {
    deleteCategory(data);
    // successToast();
  };

  const showFn = () => {
    expandItem(data, 'display');
  };

  const editFn = () => {
    expandItem(data, 'edit');
  };
  return (
    <div className={classes.container}>
      <div className={classes.content} onClick={showFn}>
        <h3>{data.name}</h3>
      </div>
      <div className={classes.buttons}>
        {/* <Button onClick={editFn}>
          <FontAwesomeIcon icon={faMaximize} />
        </Button> */}
        <Button onClick={editFn}>
          <FontAwesomeIcon icon={faGear} />
        </Button>
        <Button variant="delete" onClick={deleteFn}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        {/* <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        /> */}
      </div>
    </div>
  );
};
export default CategoryQuickView;
