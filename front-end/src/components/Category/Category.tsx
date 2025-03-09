import classes from './Category.module.scss';

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
  data: CategoryData;
}

const Category = ({ data }: CategoryProps) => {
  if (data.categoriesData === null) {
    console.log('category');
  } else {
    console.log('todo');
  }
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Category List</h1>
    </div>
  );
};

export default Category;
