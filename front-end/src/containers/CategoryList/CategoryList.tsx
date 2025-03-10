import classes from './CategoryList.module.scss';
import { useContext } from 'react';
import { CategoryContext } from '../../context/CategoryContextProvider';
import CategoryQuickView, {
  CategoryItem,
} from '../../components/CategoryQuickView/CategoryQuickView';

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

  const showModal = (data: CategoryItem, mode: string) => {
    if (mode === 'display') {
      setModalContent(<p>Test</p>);
    } else {
      setModalContent(<p>Edit Test</p>);
    }
    setModalTitle(data.name);
    setModalShown(true);
  };

  return (
    <>
      <details className={classes.container}>
        <summary className={classes.container_summary}>
          {/* <span>Test</span>
          <span>Also</span> */}
          Show Categories
        </summary>
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
    </>
  );
};
export default CategoryList;
