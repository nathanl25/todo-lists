import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TodoFormData, schema, status } from './schema';
import Button from '../Button/Button';
import classes from './TodoFullCreate.module.scss';
import { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContextProvider';
import { CategoryContext } from '../../context/CategoryContextProvider';
import { formatStatus } from '../../utilities/Formatters';

interface TodoFormProps {
  showModal: (val: boolean) => void;
}
export interface CreateTodoFormData {
  name: string;
  description?: string;
  category?: number;
  dueDate?: Date;
  status?: string;
}

const TodoFullCreate = ({ showModal }: TodoFormProps) => {
  const { addTodo } = useContext(TodoContext);
  const [errorMessage, setErrorMessage] = useState('');
  const { categoryNames } = useContext(CategoryContext);
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(schema),
  });

  const submitWrapper = (data: TodoFormData) => {
    setErrorMessage('');
    if (data.category && !categoryNames.has(data.category)) {
      setErrorMessage('This category does not currently exist');
      return;
    }

    addTodo(createBody(data))
      .then(() => {
        reset();
        showModal(false);
      })
      .catch((e) => setErrorMessage(e.message));
  };

  const createBody = (data: TodoFormData) => {
    const { category, ...rest } = data;
    const categoryId = category ? categoryNames.get(category) : undefined;
    return { ...rest, categoryId };
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitWrapper)}
        className={classes.container}
      >
        <div className={classes.field}>
          <div className={classes.error_row}>
            {errors?.name && <p>{errors?.name?.message}</p>}
          </div>
          <div className={classes.input_row}>
            <label htmlFor="nameInput">Name: </label>
            <input type="text" id="nameInput" {...register('name')} />
          </div>
        </div>
        <div className={classes.field}>
          <div className={classes.error_row}>
            {errors?.status && <p>{errors?.status?.message}</p>}
          </div>
          <div className={classes.input_row}>
            <label htmlFor="statusInput">Status: </label>
            <select {...register('status')}>
              <option value={''}></option>
              {status.map((status) => (
                <option key={status} value={status}>
                  {formatStatus(status)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={classes.field}>
          <div className={classes.error_row}>
            {errors?.description && <p>{errors?.description?.message}</p>}
          </div>
          <div className={classes.input_row}>
            <label htmlFor="descriptionInput">Description: </label>
            <input
              type="text"
              id="descriptionInput"
              {...register('description')}
            />
          </div>
        </div>
        <div className={classes.field}>
          <div className={classes.error_row}>
            {errors?.category && <p>{errors?.category?.message}</p>}
          </div>
          <div className={classes.input_row}>
            <label htmlFor="categoryInput">Category: </label>
            <select {...register('category')}>
              <option value={''}></option>
              {[...categoryNames[Symbol.iterator]()].map((cat) => (
                <option key={cat[0]} value={cat[0]}>
                  {cat[0]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={classes.field}>
          <div className={classes.error_row}>
            {errors?.dueDate && <p>{errors?.dueDate?.message}</p>}
          </div>
          <div className={classes.input_row}>
            <label htmlFor="dueDateInput">Due Date: </label>
            <input
              type="datetime-local"
              id="dueDateInput"
              {...register('dueDate')}
            />
          </div>
        </div>
        <div className={classes.submit}>
          <Button
            onClick={() => {
              console.log(getValues());
            }}
          >
            Submit
          </Button>
        </div>
        <div className={classes.error_message}>{errorMessage}</div>
      </form>
    </>
  );
};
export default TodoFullCreate;
