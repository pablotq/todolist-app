import { useContext } from 'react';
import { themeConfig } from '../../contexts/theme'
import { ThemeContext } from '../../contexts/ThemeContext';

interface TodoContainerProps{
    children: React.ReactNode;
}

export const TodoContainer = ({children}:TodoContainerProps) => {

    const { theme } = useContext(ThemeContext);

    return (
        <main className={`${themeConfig[theme].layout.backgroundColor} h-screen`}>
            <div className={`${themeConfig[theme].layout.imageBanner} h-80 bg-cover bg-center `}>
                <div className='max-w-175 m-auto p-8'>
                    {children}
                </div>
            </div>
        </main>
    );
};