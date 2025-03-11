import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, schema, status } from './schema';
import Button from '../Button/Button';
import classes from './TodoForm.module.scss';
import { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContextProvider';
import { CategoryContext } from '../../context/CategoryContextProvider';
import { TodoData } from '../TodoFullView/TodoFullView';
import { formatForDateInput, formatStatus } from '../../utilities/Formatters';
import React from 'react';
import Select from 'react-select';

interface TodoFormProps {
  showModal: (val: boolean) => void;
  values?: TodoData;
  isEditMode?: boolean;
}

export interface CreateTodoFormData {
  name: string;
  description?: string;
  category?: number[];
  dueDate?: Date;
  status?: string;
}

export interface EditTodoFormData extends CreateTodoFormData {
  id: number;
}

// interface CategoryOption {
//   readonly value: string;
//   readonly label: string;
// }

// interface FormData {
//   name: string;
//   status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE' | 'OVERDUE' | undefined;
//   description?: string | undefined;
//   category?: { label: string; value: string; id: number }[];
//   dueDate?: Date | undefined;
// }

const TodoForm = ({ showModal, values, isEditMode = false }: TodoFormProps) => {
  // const currentCategory = values.categories?.[0]?.name;
  const { updateTodo, addTodo } = useContext(TodoContext);
  const [errorMessage, setErrorMessage] = useState('');
  const { categoryNames, categoriesData } = useContext(CategoryContext);
  const catOptions = categoriesData.map((cat) => ({
    label: cat.name,
    value: cat.name,
    id: cat.id,
  }));
  console.log(values);
  const currentCat = values
    ? values.categories.map((cat) => ({
        label: cat.name,
        value: cat.name,
        id: cat.id,
      }))
    : undefined;
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitWrapper = (data: FormData) => {
    setErrorMessage('');
    console.log(data);
    const altData = createBody(data);
    console.log(altData);

    (isEditMode ? updateTodo(createBody(data)) : addTodo(createBody(data)))
      .then(() => {
        reset();
        showModal(false);
      })
      .catch((e) => setErrorMessage(e.message));
  };

  const createBody = (data: FormData) => {
    const { category, ...rest } = data;
    const categoryIds = category && category.map((cat) => cat.id);
    const id = values ? values.id : 0;

    return { ...rest, categoryIds, id };
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
            <label className={classes.label} htmlFor="nameInput">
              Name:
            </label>
            <input
              className={classes.input}
              type="text"
              id="nameInput"
              defaultValue={values && values.name}
              {...register('name')}
            />
          </div>
        </div>
        <div className={classes.field}>
          <div className={classes.error_row}>
            {errors?.status && <p>{errors?.status?.message}</p>}
          </div>
          <div className={classes.input_row}>
            <label className={classes.label} htmlFor="statusInput">
              Status
            </label>
            <select
              className={classes.input}
              {...register('status')}
              defaultValue={values && values.status}
            >
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
            <label className={classes.label} htmlFor="descriptionInput">
              Description:
            </label>
            <input
              className={classes.input}
              type="text"
              id="descriptionInput"
              defaultValue={values && values.description}
              {...register('description')}
            />
          </div>
        </div>
        <div className={classes.field}>
          <div className={classes.error_row}>
            {errors?.category && <p>{errors?.category?.message}</p>}
          </div>
          <div className={classes.input_row}>
            <label className={classes.label} htmlFor="categoryInput">
              Category:
            </label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={catOptions}
                  className={classes.input}
                  defaultValue={currentCat}
                />
              )}
            />
          </div>
        </div>
        <div className={classes.field}>
          <div className={classes.error_row}>
            {errors?.dueDate && <p>{errors?.dueDate?.message}</p>}
          </div>
          <div className={classes.input_row}>
            <label className={classes.label} htmlFor="dueDateInput">
              Due Date:
            </label>
            <input
              className={classes.input}
              type="datetime-local"
              id="dueDateInput"
              value={
                values && values.dueDate
                  ? formatForDateInput(values.dueDate)
                  : undefined
              }
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
export default TodoForm;
