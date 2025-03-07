import classes from './Category.module.scss';

interface listItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  archivedAt: string;
  name: string;
  isArchived: boolean;
}

interface categoryData extends listItem {
  todos: listItem[];
}

const Category = (data: categoryData) => {
  if (data.todos === null) {
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
