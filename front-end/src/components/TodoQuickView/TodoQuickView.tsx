import Button from '../Button/Button';
import classes from './TodoQuickView.module.scss';
import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TodoContext } from '../../context/TodoContextProvider';
import { useContext } from 'react';
import { TodoData } from '../TodoFullView/TodoFullView';
// interface ListItem {
//   id: number;
//   createdAt: string;
//   updatedAt: string;
//   archivedAt: string;
//   name: string;
//   isArchived: boolean;
// }

// export interface TodoData extends ListItem {
//   categories: ListItem[];
// }

interface TodoProps {
  data: TodoData;
  showAll: (data: TodoData, mode: string) => void;
}

const TodoQuickView = ({ data, showAll }: TodoProps) => {
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
    <div className={classes.container}>
      <h1>{data.name}</h1>
      <div className={classes.buttons}>
        <Button onClick={editFn}>Edit</Button>
        <Button onClick={showFn}>
          <FontAwesomeIcon icon={faGear} />
        </Button>
        {/* <Button>
          <FontAwesomeIcon icon={faGear} />
        </Button> */}

        <Button variant="delete" onClick={deleteFn}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  );
};

export default TodoQuickView;
