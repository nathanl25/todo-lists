import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryFormData, schema } from './schema';
import Button from '../Button/Button';
import classes from './CategoryFullCreate.module.scss';
import { useContext, useState } from 'react';
import { CategoryContext } from '../../context/CategoryContextProvider';

interface CategoryFormProps {
  showModal: (val: boolean) => void;
}

const CategoryFullCreate = ({ showModal }: CategoryFormProps) => {
  const { addCategory } = useContext(CategoryContext);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
  });

  const submitWrapper = (data: CategoryFormData) => {
    setErrorMessage('');

    addCategory(data)
      .then(() => {
        reset();
        showModal(false);
      })
      .catch((e) => setErrorMessage(e.message));
  };

  return (
    <form onSubmit={handleSubmit(submitWrapper)} className={classes.container}>
      <div className={classes.field}>
        <div className={classes.input_row}>
          <label className={classes.label} htmlFor="nameInput">
            Name:{' '}
          </label>
          <input
            className={classes.input}
            type="text"
            id="nameInput"
            {...register('name')}
          />
        </div>
        <div className={classes.error_row}>
          {errors?.name && <p>{errors?.name?.message}</p>}
        </div>
      </div>
      <div className={classes.submit}>
        <Button>Submit</Button>
      </div>
      <div className={classes.error_message}>{errorMessage}</div>
    </form>
  );
};
export default CategoryFullCreate;
