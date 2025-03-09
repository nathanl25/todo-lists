import classes from './HomePage.module.scss';
import Button from '../../components/Button/Button';
import { useState, useContext } from 'react';
import TodoQuickView from '../../components/TodoQuickView/TodoQuickView';
// import { ButtonContext } from '../../context/ButtonContextProvider';
import { Modal } from '../../components/Modal/Modal';
// import ButtonContextProvider from '../../context/ButtonContextProvider';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TodoFullCreate from '../../components/TodoFullCreate/TodoFullCreate';
import { TodoContext } from '../../context/TodoContextProvider';
import TodoFullView, {
  TodoData,
} from '../../components/TodoFullView/TodoFullView';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import TodoEdit from '../../components/TodoEdit/TodoEdit';

// interface ModalContent {
//     title: string;
//     children: React.ReactNode;
// }
// const [modalContent, setModalContent] = useState<ModalContent>();

const HomePage = () => {
  // const [todo, setTodo] = useState<TodoData>();
  //   const { toggleEditVisibility, editVisibility } = useContext(ButtonContext);
  const { todosData } = useContext(TodoContext);
  const [modalShown, setModalShown] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [modalTitle, setModalTitle] = useState('');
  const showTodo = (data: TodoData, mode: string) => {
    if (mode === 'display') {
      setModalContent(<TodoFullView data={data} />);
    } else {
      setModalContent(<TodoEdit showModal={setModalShown} values={data} />);
    }
    setModalTitle(data.name);
    setModalShown(true);
  };
  const showTodoForm = () => {
    setModalContent(<TodoFullCreate showModal={setModalShown} />);
    setModalTitle('Create Todos');
    setModalShown(true);
  };
  const showCategoryForm = () => {
    setModalContent(<CategoryForm showModal={setModalShown} />);
    setModalTitle('Create Categories');
    setModalShown(true);
  };
  return (
    <div className={classes.container}>
      {/* <ButtonContextProvider> */}
      <section className={classes.create_container}>
        <div className={classes.create}>
          <h1>Create Task</h1>
          <Button variant="add" onClick={showTodoForm}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
        <div className={classes.create}>
          <h1>Create Category</h1>
          <Button variant="add" onClick={showCategoryForm}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </section>
      <div className={classes.todo_container}>
        {/* <section className={classes.todo_buttons}>
            <Button onClick={toggleEditVisibility}>
              {editVisibility ? 'Show Edit' : 'Hide Edit'}
            </Button>
            <Button>Delete</Button>
          </section> */}
        <section className={classes.todo_list}>
          {todosData &&
            todosData.map((todo) => (
              <TodoQuickView data={todo} showAll={showTodo} key={todo.id} />
            ))}
        </section>
      </div>

      <Modal
        title={modalTitle}
        onClose={() => setModalShown(false)}
        isVisible={modalShown}
      >
        {modalContent}
      </Modal>
      {/* </ButtonContextProvider> */}
    </div>
  );
};

export default HomePage;
