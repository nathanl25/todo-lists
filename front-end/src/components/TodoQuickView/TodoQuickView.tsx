import Button from '../Button/Button';
import classes from './TodoQuickView.module.scss';
import {
  faCheck,
  faGear,
  faSquare,
  faSquareCheck,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TodoContext } from '../../context/TodoContextProvider';
import { useContext } from 'react';
import { TodoData } from '../TodoFullView/TodoFullView';

interface TodoProps {
  data: TodoData;
  showAll: (data: TodoData, mode: string) => void;
}

const TodoQuickView = ({ data, showAll }: TodoProps) => {
  let variant;

  switch (data.status) {
    case undefined:
    case 'NOT_STARTED':
      variant = classes.default;
      break;
    case 'COMPLETE':
      variant = classes.complete;
      break;
    case 'IN_PROGRESS':
      variant = classes.in_progress;
      break;
    case 'OVERDUE':
      variant = classes.overdue;
      break;
  }

  const { deleteTodo } = useContext(TodoContext);

  const deleteFn = async () => {
    deleteTodo(data.id);
  };
  const showFn = () => {
    showAll(data, 'display');
  };
  const editFn = () => {
    showAll(data, 'edit');
  };
  return (
    <div className={`${classes.container} ${variant}`}>
      <div className={classes.check_box}>
        {data.status === 'COMPLETE' ? (
          <FontAwesomeIcon icon={faSquareCheck} />
        ) : (
          <FontAwesomeIcon icon={faSquare} />
        )}
      </div>
      <div className={classes.todo}>
        <h3 className={classes.todo_title} onClick={showFn}>
          {data.name}
        </h3>
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
    </div>
  );
};

export default TodoQuickView;
