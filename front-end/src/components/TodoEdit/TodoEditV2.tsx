import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TodoFormData, schema, status } from './schema';
import Button from '../Button/Button';
import classes from './TodoEdit.module.scss';
import { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContextProvider';
import { CategoryContext } from '../../context/CategoryContextProvider';
import { TodoData } from '../TodoFullView/TodoFullView';
import { formatForDateInput, formatStatus } from '../../utilities/Formatters';
import React from 'react';
import Select from 'react-select';

interface TodoFormProps {
  showModal: (val: boolean) => void;
  values: TodoData;
}
export interface EditTodoFormData {
  id: number;
  name?: string;
  description?: string;
  category?: number[];
  dueDate?: Date;
  status?: string;
}

// interface CategoryOption {
//   readonly value: string;
//   readonly label: string;
// }

interface FormData {
  name: string;
  status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE' | 'OVERDUE' | undefined;
  description?: string | undefined;
  category: { label: string; value: string; id: number }[];
  dueDate?: Date | undefined;
}

const TodoEditV2 = ({ showModal, values }: TodoFormProps) => {
  // const currentCategory = values.categories?.[0]?.name;
  const { updateTodo } = useContext(TodoContext);
  const [errorMessage, setErrorMessage] = useState('');
  const { categoryNames, categoriesData } = useContext(CategoryContext);
  // const categoryOptions: readonly CategoryOption[] = categoriesData.map(
  //   (cat) => {
  //     return {
  //       value: cat.name,
  //       label: cat.name,
  //     };
  //     // return cat.name;
  //   }
  // );
  // const string: readonly map = categoriesData.map((cat) => cat.name);
  // console.log(categoryOptions);
  const catOptions = categoriesData.map((cat) => ({
    label: cat.name,
    value: cat.name,
    id: cat.id,
  }));
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
    // if (data.category && !categoryNames.has(data.category)) {
    //   setErrorMessage('This category does not currently exist');
    //   return;
    // }
    console.log(data);
    const altData = createBody(data);
    console.log(altData);
    updateTodo(createBody(data))
      .then(() => {
        reset();
        showModal(false);
      })
      .catch((e) => setErrorMessage(e.message));
  };

  const createBody = (data: FormData) => {
    const { category, ...rest } = data;
    // const categoryId = category ? categoryNames.get(category) : undefined;
    const categoryIds = data.category.map((cat) => cat.id);
    const id = values.id;

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
              defaultValue={values.name}
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
              defaultValue={values.status}
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
              defaultValue={values.description ?? undefined}
              {...register('description')}
            />
          </div>
        </div>
        {/* <div className={classes.field}>
          <div className={classes.error_row}>
            {errors?.category && <p>{errors?.category?.message}</p>}
          </div>
          <div className={classes.input_row}>
            <label className={classes.label} htmlFor="categoryInput">
              Category:
            </label>
            <select
              className={classes.input}
              {...register('category')}
              defaultValue={currentCategory}
            >
              <option value={''}></option>
              {[...categoryNames[Symbol.iterator]()].map((cat) => (
                <option key={cat[0]} value={cat[0]}>
                  {cat[0]}
                </option>
              ))}
            </select>
          </div>
        </div> */}
        <div className={classes.field}>
          <div className={classes.error_row}>
            {errors?.category && <p>{errors?.category?.message}</p>}
          </div>
          <div className={classes.input_row}>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  {...field}
                  // inputRef={ref}
                  isMulti
                  options={catOptions}
                  // getOptionValue={((val) => val.id)}
                  // value={categoryOptions.find((c) => c.value === value)}
                  // onChange={(val) => onChange(val.value)}
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
                values.dueDate ? formatForDateInput(values.dueDate) : undefined
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
export default TodoEditV2;
