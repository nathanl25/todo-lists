import { useState, createContext, useEffect } from 'react';
import { CategoryFormData } from '../components/CategoryForm/schema';

import { CategoryData } from '../components/Category/Category';
import { CategoryItem } from '../components/Category/Category';

export interface CategoriesContextValues extends CategoryData {
  // categoriesData: TodoData[];
  categoryNames: Map<string, number>;
  setCategories: (data: CategoryItem[]) => void;
  deleteCategory: (cat: CategoryItem) => unknown;
  addCategory: (data: CategoryFormData) => Promise<unknown>;
}

export const CategoryContext = createContext<CategoriesContextValues>({
  categoryNames: new Map<string, number>(),
  categoriesData: [],
  setCategories: () => {},
  deleteCategory: () => {},
  addCategory: () => new Promise(() => {}),
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
        setCategoryNames(mapCopy);
      })
      .catch((e) => console.log(e));
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
      //   console.log(newTodo);
      throw new Error(newCategory.errors[0].defaultMessage);
    }
    setCategories([...categories, newCategory]);
    const mapCopy = categoryNames;
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
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
