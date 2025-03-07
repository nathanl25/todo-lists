import classes from './HomePage.module.scss';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import Todo, { todoData } from '../../components/Todo/Todo';

const HomePage = () => {
  const [todos, setTodos] = useState<todoData[]>([]);
  //   const [showEdit, setShowEdit] = useState<boolean>(false);
  //   const [showDelete, setShowDelete] = useState<boolean>(false);
  useEffect(() => {
    fetch('http://127.0.0.1:8080/todo')
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);
  console.log(todos);
  const onClickFn = () => {
    console.log('meow');
  };
  return (
    <>
      <h1>Create Task</h1>
      <h1>Create Category</h1>
      <div className={classes.todo_container}>
        <section className={classes.todo_buttons}>
          <Button variant="default" buttonFunction={onClickFn}>
            Edit
          </Button>
          <Button variant="default">Delete</Button>
        </section>
        <section className={classes.todo_list}>
          {todos &&
            todos.map((todo) => (
              <Todo data={todo} key={todo.id} variant="quick_view" />
            ))}
        </section>
      </div>
    </>
  );
};

export default HomePage;
