import { useContext } from 'react';
import { CategoryContext } from '../../context/CategoryContextProvider';
import classes from './CategoryQuickView.module.scss';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
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
  };

  const showFn = () => {
    expandItem(data, 'display');
  };

  const editFn = () => {
    expandItem(data, 'edit');
  };
  return (
    <div className={classes.container}>
      <h3>{data.name}</h3>
      <div className={classes.buttons}>
        <Button onClick={editFn}>Edit</Button>
        <Button onClick={showFn}>
          <FontAwesomeIcon icon={faGear} />
        </Button>
        <Button variant="delete" onClick={deleteFn}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  );
};
export default CategoryQuickView;
