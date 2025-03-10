import classes from './CategoryQuickCreate.module.scss';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, CategoryQuickFormData } from './schema';
import Button from '../Button/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CategoryContext } from '../../context/CategoryContextProvider';

const CategoryQuickCreate = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { addCategory } = useContext(CategoryContext);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CategoryQuickFormData>({
    resolver: zodResolver(schema),
  });

  const submitWrapper = (data: CategoryQuickFormData) => {
    setErrorMessage('');
    addCategory(data)
      .then(() => {
        reset();
      })
      .catch((e) => setErrorMessage(e.message));
  };

  return (
    <form onSubmit={handleSubmit(submitWrapper)} className={classes.container}>
      <div className={classes.error_row}>
        {errors?.name && <small>{errors?.name?.message}</small>}
        {/* {errorMessage && <small>{errorMessage}</small>} */}
      </div>
      <div className={classes.input_row}>
        <label htmlFor="nameInput">Create Category</label>
        <input type="text" id="nameInput" {...register('name')} />
        <Button variant="add">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      <div className={classes.error_row}>
        {/* {errors?.name && <small>{errors?.name?.message}</small>} */}
        {errorMessage && <small>{errorMessage}</small>}
      </div>
    </form>
  );
};

export default CategoryQuickCreate;
