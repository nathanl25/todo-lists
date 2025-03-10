import { useState, createContext, useEffect } from 'react';
import { CategoryFormData } from '../components/CategoryFullCreate/schema';
import {
  CategoryItem,
  CategoryData,
} from '../components/CategoryFullView/CategoryFullView';
import { EditCategoryFormData } from '../components/CategoryEdit/CategoryEdit';
import React from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const successToast = (catName: string) =>
  toast.success(`Successfully deleted ${catName}`, {
    position: 'bottom-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });

const failureToast = (item: string) =>
  toast.error(`Could not delete ${item}`, {
    position: 'bottom-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
export interface CategoriesContextValues extends CategoryData {
  // categoriesData: TodoData[];
  categoryNames: Map<string, number>;
  setCategories: (data: CategoryItem[]) => void;
  deleteCategory: (cat: CategoryItem) => unknown;
  addCategory: (data: CategoryFormData) => Promise<unknown>;
  updateCategory: (data: EditCategoryFormData) => Promise<unknown>;
}

export const CategoryContext = createContext<CategoriesContextValues>({
  categoryNames: new Map<string, number>(),
  categoriesData: [],
  setCategories: () => {},
  deleteCategory: () => {},
  addCategory: () => new Promise(() => {}),
  updateCategory: () => new Promise(() => {}),
});

interface ContextProviderProps {
  children?: React.ReactNode;
}

const CategoryContextProvider = ({ children }: ContextProviderProps) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [categoryNames, setCategoryNames] = useState(new Map<string, number>());
  useEffect(() => {
    fetch('http://127.0.0.1:8080/category')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        const nameArr = data.map((cat: CategoryItem) => [cat.name, cat.id]);
        setCategoryNames(new Map(nameArr));
      });
  }, []);

  const deleteCategory = (cat: CategoryItem) => {
    console.log(cat);
    fetch(`http://127.0.0.1:8080/category/${cat.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedCategories = categories.filter(
          (category) => category.id != cat.id
        );
        setCategories(updatedCategories);
        const mapCopy = categoryNames;
        mapCopy.delete(cat.name);
        successToast(cat.name);
        setCategoryNames(mapCopy);
      })
      .catch((e) => failureToast(e));
  };

  const addCategory = async (data: CategoryFormData) => {
    const res = await fetch('http://127.0.0.1:8080/category', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newCategory = await res.json();
    if (!res.ok) {
      throw new Error(newCategory.errors.category[0]);
    }
    setCategories([...categories, newCategory]);
    const mapCopy = categoryNames;
    mapCopy.set(newCategory.name, newCategory.id);
    setCategoryNames(mapCopy);
  };

  const updateCategory = async (data: EditCategoryFormData) => {
    console.log(data);
    const { id, ...rest } = data;
    console.log(rest);
    const res = await fetch(`http://127.0.0.1:8080/category/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(rest),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newCategory = await res.json();
    if (!res.ok) {
      throw new Error(newCategory.errors[0].defaultMessage);
    }
    let oldName = '';
    const updatedCategories = categories.map((cat) => {
      if (cat.id === id) {
        oldName = cat.name;
        return newCategory;
      }
      return cat;
    });
    setCategories(updatedCategories);
    const mapCopy = categoryNames;

    mapCopy.delete(oldName);
    mapCopy.set(newCategory.name, newCategory.id);
    setCategoryNames(mapCopy);
  };

  return (
    <CategoryContext.Provider
      value={{
        categoryNames: categoryNames,
        categoriesData: categories,
        deleteCategory,
        setCategories,
        addCategory,
        updateCategory,
      }}
    >
      {/* <Button onClick={successToast}>Get Toast</Button> */}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
