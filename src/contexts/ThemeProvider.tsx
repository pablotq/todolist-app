import {useEffect, useState} from 'react';
import { type ThemeName, ThemeContext } from './ThemeContext';

interface ThemeProviderProps{
    children: React.ReactNode;
}

const localStorageKey = "@todoList: theme";

 export const  ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<ThemeName>(() => {
         const themeFromLocalStorage = localStorage.getItem(localStorageKey);

        const parsedTheme = themeFromLocalStorage !== null ? JSON.parse(themeFromLocalStorage) : "dark";

        return parsedTheme
    });

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(theme))
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }
    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
 };
