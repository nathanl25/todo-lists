import classes from './CategoryList.module.scss';
import { useContext, useState } from 'react';
import { CategoryContext } from '../../context/CategoryContextProvider';
import CategoryQuickView from '../../components/CategoryQuickView/CategoryQuickView';
import CategoryFullView, {
  CategoryItem,
} from '../../components/CategoryFullView/CategoryFullView';
import CategoryEdit from '../../components/CategoryEdit/CategoryEdit';

interface CategoryListProps {
  setModalContent: (child: React.ReactNode) => void;
  setModalTitle: (title: string) => void;
  setModalShown: (visibility: boolean) => void;
}

const CategoryList = ({
  setModalContent,
  setModalTitle,
  setModalShown,
}: CategoryListProps) => {
  const { categoriesData } = useContext(CategoryContext);
  const [listOpen, setListOpen] = useState(false);
  const showModal = (data: CategoryItem, mode: string) => {
    if (mode === 'display') {
      setModalContent(<CategoryFullView data={data} />);
      setModalTitle('Category');
    } else {
      setModalContent(<CategoryEdit showModal={setModalShown} values={data} />);
      setModalTitle('Edit Category');
    }
    setModalShown(true);
    setListOpen(false);
  };

  return (
    <>
      <details className={classes.container} open={listOpen}>
        <summary className={classes.container_summary}>Show Categories</summary>
        {/* <summary>Test</summary> */}
        <div className={classes.list_wrapper}>
          {categoriesData &&
            categoriesData.map((category) => (
              <CategoryQuickView
                data={category}
                expandItem={showModal}
                key={category.id}
              />
            ))}
        </div>
      </details>
      <div className={classes.overlay}></div>
    </>
  );
};
export default CategoryList;
