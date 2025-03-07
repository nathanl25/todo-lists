import { createContext, useState } from 'react';

interface ButtonContextValues {
  editVisible: boolean;
  toggleEditVisible: (visible: boolean) => void;
}

export const ButtonContext = createContext<ButtonContextValues>({
  editVisible: false,
  toggleEditVisible: (visible) => console.log(visible),
});

interface ButtonContextProviderProps {
  children?: React.ReactNode;
}

const ButtonContextProvider = ({ children }: ButtonContextProviderProps) => {
  const [editVisible, setEditVisible] = useState(false);
  const toggleEditVisible = () => {
    setEditVisible(!editVisible);
  };
  return (
    <ButtonContext.Provider value={{ toggleEditVisible, editVisible }}>
      {children}
    </ButtonContext.Provider>
  );
};
export default ButtonContextProvider;
