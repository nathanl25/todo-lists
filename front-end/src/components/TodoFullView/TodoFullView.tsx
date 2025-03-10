import classes from './TodoFullView.module.scss';
import { formatStatus } from '../../utilities/Formatters';
import { CategoryItem } from '../CategoryFullView/CategoryFullView';

type Status = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE' | 'OVERDUE';

export interface TodoItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  archivedAt: string;
  name: string;
  isArchived: boolean;
  dueDate: string;
  description: string;
  status: Status;
}

export interface TodoData extends TodoItem {
  categories: CategoryItem[];
}

interface TodoProps {
  data: TodoData;
}

export const convertDate = (rawDate: string) => {
  const time = new Date(rawDate);
  return new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Australia/Sydney',
  }).format(time);
};

const TodoFullView = ({ data }: TodoProps) => {
  console.log(data);
  const categories = data.categories.map((cat) => cat.name).join(', ');
  return (
    <div className={classes.container}>
      <div className={classes.field}>
        <h2 className={classes.key}>Name:</h2>
        <p className={classes.value}>{data.name}</p>
      </div>
      <div className={classes.field}>
        <h2 className={classes.key}>Status:</h2>
        <p className={classes.value}>
          {data.status ? formatStatus(data.status) : 'Status not set'}
        </p>
      </div>
      <div className={classes.field}>
        <h2 className={classes.key}>Description:</h2>
        <p className={classes.value}>
          {data.description ?? 'No description available'}
        </p>
      </div>
      <div className={classes.field}>
        <h2 className={classes.key}>Due Date:</h2>
        <p className={classes.value}>
          {data.dueDate ? convertDate(data.dueDate) : 'No due date set'}
        </p>
      </div>
      <div className={classes.field}>
        <h2 className={classes.key}>Categories:</h2>
        <p className={classes.value}>
          {categories != '' ? categories : 'No categories associated'}
        </p>
      </div>
    </div>
  );
};

export default TodoFullView;
