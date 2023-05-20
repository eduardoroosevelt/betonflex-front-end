import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

export const MenuContext = createContext<{
    activeMenu: string;
    setActiveMenu: Dispatch<SetStateAction<string>>;
}>({
    activeMenu: '',
    setActiveMenu: () => {}
});

interface MenuProviderProps {
    children: ReactNode;
}

export const MenuProvider = (props: MenuProviderProps) => {
    const [activeMenu, setActiveMenu] = useState('');

    const value = {
        activeMenu,
        setActiveMenu
    };

    return <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>;
};
