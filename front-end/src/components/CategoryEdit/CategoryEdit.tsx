import classes from './CategoryEdit.module.scss';
import { useContext, useState } from 'react';
import { CategoryItem } from '../CategoryFullView/CategoryFullView';
import { CategoryContext } from '../../context/CategoryContextProvider';
import { CategoryFormData, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';

interface CategoryFormProps {
  showModal: (val: boolean) => void;
  values: CategoryItem;
}
export interface EditCategoryFormData {
  id: number;
  name: string;
}

const CategoryEdit = ({ showModal, values }: CategoryFormProps) => {
  const { updateCategory, categoryNames } = useContext(CategoryContext);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
  });

  const submitWrapper = (data: CategoryFormData) => {
    setErrorMessage('');
    if (categoryNames.has(data.name)) {
      setErrorMessage('This category already exists');
      return;
    }
    const reqData = {
      id: values.id,
      name: data.name,
    };
    updateCategory(reqData)
      .then(() => {
        reset();
        showModal(false);
      })
      .catch((e) => setErrorMessage(e.message));
  };
  return (
    <form onSubmit={handleSubmit(submitWrapper)} className={classes.container}>
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
  );
};
export default CategoryEdit;
