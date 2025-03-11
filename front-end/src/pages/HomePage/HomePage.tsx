import classes from './HomePage.module.scss';
import { useState, useContext } from 'react';
import TodoQuickView from '../../components/TodoQuickView/TodoQuickView';
import { Modal } from '../../components/Modal/Modal';
import TodoFullCreate from '../../components/TodoFullCreate/TodoFullCreate';
import { TodoContext } from '../../context/TodoContextProvider';
import TodoFullView, {
  TodoData,
} from '../../components/TodoFullView/TodoFullView';
import CategoryFullCreate from '../../components/CategoryFullCreate/CategoryFullCreate';
// import TodoEdit from '../../components/TodoEdit/TodoEdit';
import CategoryList from '../../containers/CategoryList/CategoryList';
import QuickCreateBar from '../../containers/QuickCreateBar/QuickCreateBar';
import Landing from '../../components/Landing/Landing';
import TodoEditV2 from '../../components/TodoEdit/TodoEditV2';

const HomePage = () => {
  const { todosData } = useContext(TodoContext);
  const [modalShown, setModalShown] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [modalTitle, setModalTitle] = useState('');
  const showTodo = (data: TodoData, mode: string) => {
    if (mode === 'display') {
      setModalContent(<TodoFullView data={data} />);
      setModalTitle('Todos');
    } else {
      // setModalContent(<TodoEdit showModal={setModalShown} values={data} />);
      setModalContent(<TodoEditV2 showModal={setModalShown} values={data} />);
      setModalTitle('Edit Todos');
    }
    setModalShown(true);
  };
  const showTodoForm = () => {
    setModalContent(<TodoFullCreate showModal={setModalShown} />);
    setModalTitle('Create Todos');
    setModalShown(true);
  };
  const showCategoryForm = () => {
    setModalContent(<CategoryFullCreate showModal={setModalShown} />);
    setModalTitle('Create Categories');
    setModalShown(true);
  };
  return (
    <div className={classes.container}>
      <CategoryList
        setModalContent={setModalContent}
        setModalTitle={setModalTitle}
        setModalShown={setModalShown}
      />
      <Landing
        showCategoryForm={showCategoryForm}
        showTodoForm={showTodoForm}
      />

      <div className={classes.todo_container}>
        <section className={classes.todo_list}>
          {todosData &&
            todosData.map((todo) => (
              <TodoQuickView data={todo} showAll={showTodo} key={todo.id} />
            ))}
        </section>
      </div>
      <QuickCreateBar />

      <Modal
        title={modalTitle}
        onClose={() => setModalShown(false)}
        isVisible={modalShown}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default HomePage;
