import Button from '../Button/Button';
import classes from './Todo.module.scss';

interface listItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  archivedAt: string;
  name: string;
  isArchived: boolean;
}

export interface todoData extends listItem {
  categories: listItem[];
}

interface todoProps {
  data: todoData;
  variant: string;
}

const Todo = ({ data, variant }: todoProps) => {
  //   if (data.categories === null) {
  //     console.log('category');
  //   } else {
  //     console.log('todo');
  //   }
  console.log(variant);
  if (variant === 'quick_view') {
    return (
      <div className={classes.container}>
        <h1>{data.name}</h1>
        <div className={classes.buttons}>
          <Button variant="default" />

          <Button variant="delete" />
        </div>
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <h1>{data.name}</h1>
      <h2>{data.archivedAt}</h2>
      <h2>{data.createdAt}</h2>
      <h2>{data.isArchived}</h2>
      <h2>{data.id}</h2>
    </div>
  );
};

export default Todo;
