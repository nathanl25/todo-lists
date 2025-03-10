import Button from '../Button/Button';
import classes from './TodoFullView.module.scss';
import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TodoContext } from '../../context/TodoContextProvider';
import { useContext } from 'react';
import { CategoryItem } from '../Category/Category';
// import { formatWord } from '../TodoFullCreate/TodoFullCreate';
import { formatStatus } from '../../utilities/Formatters';

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

//   const { deleteTodo } = useContext(TodoContext);

//   const deleteFn = async () => {
//     deleteTodo(data.id);
//   };
//   const showFn = () => {
//     showAll(data);
export const convertDate = (rawDate: string) => {
  const time = new Date(rawDate);
  return new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Australia/Sydney',
  }).format(time);
};
//   };
const TodoFullView = ({ data }: TodoProps) => {
  // const [errorMessage, setErrorMessage] = useState('');
  console.log(data);

  const categories = data.categories.map((cat) => cat.name).join(', ');
  return (
    <div className={classes.container}>
      <div className={classes.field}>
        <h2>Name:</h2>
        <h2>{data.name}</h2>
      </div>
      <div className={classes.field}>
        <h2>Status:</h2>
        <h2>{data.status && formatStatus(data.status)}</h2>
      </div>
      <div className={classes.field}>
        <h2>Description:</h2>
        <h2>{data.description}</h2>
      </div>
      <div className={classes.field}>
        <h2>Due Date:</h2>
        <h2>{data.dueDate && convertDate(data.dueDate)}</h2>
      </div>
      {/* <div className={classes.field}>
        <h2>Created On:</h2>
        <h2>{convertDate(data.createdAt)}</h2>
      </div>
      <div className={classes.field}>
        <h2>Last Updated:</h2>
        <h2>{convertDate(data.updatedAt)}</h2>
      </div> */}
      <div className={classes.field}>
        <h2>Categories:</h2>
        <h2>{categories}</h2>
      </div>
    </div>
  );
};

export default TodoFullView;
