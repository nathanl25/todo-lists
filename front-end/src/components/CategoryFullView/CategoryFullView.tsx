import classes from './CategoryFullView.module.scss';

export interface CategoryItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  isArchived: boolean;
}

export interface CategoryData {
  categoriesData: CategoryItem[];
}

interface CategoryProps {
  data: CategoryItem;
}

const CategoryFullView = ({ data }: CategoryProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.field}>
        <h2 className={classes.key}>Name:</h2>
        <p className={classes.value}>{data.name}</p>
      </div>
    </div>
  );
};

export default CategoryFullView;
