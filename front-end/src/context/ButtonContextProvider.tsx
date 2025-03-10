import { useState, createContext } from 'react';
// import ButtonContext from './ButtonContext';

export interface ButtonContextValues {
  editVisibility: boolean;
  toggleEditVisibility: () => void;
}

export const ButtonContext = createContext<ButtonContextValues>({
  //   editIsVisible: false,
  editVisibility: false,
  toggleEditVisibility: () => console.log(),
});

interface ButtonContextProviderProps {
  children?: React.ReactNode;
}

const ButtonContextProvider = ({ children }: ButtonContextProviderProps) => {
  const [editIsVisible, setEditIsVisible] = useState(false);
  const toggleEditVisibility = () => {
    console.log('test');
    setEditIsVisible(!editIsVisible);
  };
  return (
    <ButtonContext.Provider
      value={{
        toggleEditVisibility,
        editVisibility: editIsVisible,
      }}
    >
      {children}
    </ButtonContext.Provider>
  );
};
export default ButtonContextProvider;
