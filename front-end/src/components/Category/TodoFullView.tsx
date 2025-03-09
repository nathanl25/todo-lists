// import Button from '../Button/Button';
// import classes from './TodoFullView.module.scss';
// import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { TodoContext } from '../../context/TodoContextProvider';
// import { useContext } from 'react';
// import { Control, useWatch } from 'react-hook-form';
// interface ListItem {
//   id: number;
//   createdAt: string;
//   updatedAt: string;
//   archivedAt: string;
//   name: string;
//   isArchived: boolean;
// }

// export interface TodoData extends ListItem {
//   categories: ListItem[];
// }

// interface TodoProps {
//   data: TodoData;
// }

// interface CategoryInputs {
//   category: {
//     name: string;
//   }[];
// }
// interface CategoryControl {
//   control: Control<CategoryInputs>;
// }

// const CurrentCategories = ({ control }: CategoryControl) => {
//   const catFormValues = useWatch({
//     name: 'category',
//     control,
//   });
//   const current = catFormValues.map((cat) => cat.name).join(', ');
//   return (
//     <>
//       <h2>Current Categories:</h2>
//       <h2>{current}</h2>
//     </>
//   );
// };
// //   const { deleteTodo } = useContext(TodoContext);

// //   const deleteFn = async () => {
// //     deleteTodo(data.id);
// //   };
// //   const showFn = () => {
// //     showAll(data);
// //   };
// const TodoFullView = ({ data }: TodoProps) => {
//   // const [errorMessage, setErrorMessage] = useState('');
//   console.log(data);
//   const convertDate = (rawDate: string) => {
//     const time = new Date(rawDate);
//     return new Intl.DateTimeFormat('en-AU', {
//       dateStyle: 'medium',
//       timeStyle: 'short',
//       timeZone: 'Australia/Sydney',
//     }).format(time);
//   };

//   const categories = data.categories.map((cat) => cat.name).join(', ');
//   return (
//     true && (
//       <div className={classes.container}>
//         <div className={classes.field}>
//           <h2>Name:</h2>
//           <h2>{data.name}</h2>
//         </div>
//         <div className={classes.field}>
//           <h2>Created On:</h2>
//           <h2>{convertDate(data.createdAt)}</h2>
//         </div>
//         <div className={classes.field}>
//           <h2>Last Updated:</h2>
//           <h2>{convertDate(data.updatedAt)}</h2>
//         </div>
//         <div className={classes.field}>
//           <h2>Categories:</h2>
//           <h2>{categories}</h2>
//         </div>
//       </div>
//     )
//   );
// };

// export default TodoFullView;
