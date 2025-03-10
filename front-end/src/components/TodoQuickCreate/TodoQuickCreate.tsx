import classes from './TodoQuickCreate.module.scss';
import { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContextProvider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, TodoQuickFormData } from './schema';
import Button from '../Button/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TodoQuickCreate = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { addTodo } = useContext(TodoContext);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TodoQuickFormData>({
    resolver: zodResolver(schema),
  });

  const submitWrapper = (data: TodoQuickFormData) => {
    setErrorMessage('');
    addTodo(data)
      .then(() => {
        reset();
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(submitWrapper)} className={classes.container}>
      <div className={classes.error_row}>
        {errors?.name && <small>{errors?.name?.message}</small>}
        {errorMessage && (
          <small className={classes.example}>{errorMessage}</small>
        )}
      </div>
      <div className={classes.input_row}>
        <label className={classes.label} htmlFor="nameInput">
          Create Todo
        </label>
        <input
          className={classes.input}
          type="text"
          id="nameInput"
          {...register('name')}
        />
        <Button variant="add">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    </form>
  );
};

export default TodoQuickCreate;
