import { useState, createContext, useEffect } from 'react';
// import {  } from '../components/TodoQuickView/TodoQuickView';
import { TodoFormData } from '../components/TodoFullCreate/schema';
import { TodoData } from '../components/TodoFullView/TodoFullView';
import { CreateTodoFormData } from '../components/TodoFullCreate/TodoFullCreate';
import { EditTodoFormData } from '../components/TodoEdit/TodoEdit';

export interface TodosContextValues {
  todosData: TodoData[];
  setTodos: (data: TodoData[]) => void;
  deleteTodo: (id: number) => unknown;
  addTodo: (data: CreateTodoFormData) => Promise<unknown>;
  updateTodo: (data: EditTodoFormData) => Promise<unknown>;
}

export const TodoContext = createContext<TodosContextValues>({
  todosData: [],
  setTodos: () => {},
  deleteTodo: () => {},
  addTodo: () => new Promise(() => {}),
  updateTodo: () => new Promise(() => {}),
});

interface TodoContextProviderProps {
  children?: React.ReactNode;
}

const TodoContextProvider = ({ children }: TodoContextProviderProps) => {
  const [todos, setTodos] = useState<TodoData[]>([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8080/todo')
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const deleteTodo = (deleteId: number) => {
    fetch(`http://127.0.0.1:8080/todo/${deleteId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id != deleteId);
        setTodos(updatedTodos);
      })
      .catch((e) => console.log(e));
  };

  const addTodo = async (data: CreateTodoFormData) => {
    console.log(data);
    const res = await fetch('http://127.0.0.1:8080/todo', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newTodo = await res.json();
    if (!res.ok) {
      console.log(newTodo);
      throw new Error(newTodo.errors[0].defaultMessage);
    }
    console.log(newTodo);
    setTodos([...todos, newTodo]);
  };

  const updateTodo = async (data: EditTodoFormData) => {
    const { id, ...rest } = data;
    console.log(data);
    const res = await fetch(`http://127.0.0.1:8080/todo/${id}`, {
      method: 'POST',
      body: JSON.stringify(rest),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newTodo = await res.json();
    if (!res.ok) {
      console.log(newTodo);
      throw new Error(newTodo.errors[0].defaultMessage);
    }
    console.log(newTodo);
    const updatedTodos = todos.map((todo) => (todo.id === id ? newTodo : todo));
    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todosData: todos,
        deleteTodo,
        setTodos,
        addTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
