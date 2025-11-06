import  {createContext} from 'react';


interface ThemeContextType{
    theme: ThemeName;
    toggleTheme: () => void;
}

export type ThemeName = "light" | "dark";

export const ThemeContext = createContext<ThemeContextType>({
    theme:"dark",
    toggleTheme: () => {}
});