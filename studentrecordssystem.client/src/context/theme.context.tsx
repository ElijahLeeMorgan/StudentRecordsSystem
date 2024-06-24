import { createContext, useState } from 'react';
//Some sources claim I don't need to import React from 'react' when using React 17+.

interface IThemeContextInterface {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const ThemeContext = createContext<IThemeContextInterface>({
    darkMode: false,
    toggleDarkMode: () => {},
});

interface IThemeContextProviderProps {
    children: React.ReactNode;
}

const ThemeContextProvider = ({ children }: IThemeContextProviderProps) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const toggleDarkMode = () => {
        setDarkMode(prevState => !prevState);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;