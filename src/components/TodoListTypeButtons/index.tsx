import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

interface TodoListTypeButtonsProps {
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  filter: 'all' | 'active' | 'completed';
}


const TodoListTypeButtons = ({ setFilter, filter }: TodoListTypeButtonsProps) => {

    const { theme } = useContext(ThemeContext);

  const hoverBottomButton = theme === "dark" ? "hover:text-dark-purple-100-hover" : "hover:text-light-navy-850";

    return(
    <>
        <button
          className={`cursor-pointer ${hoverBottomButton} ${filter === 'all' ? 'text-bright-blue' : ''}`}
          onClick={() => setFilter('all')}>All</button>
        <button
          className={`cursor-pointer ${hoverBottomButton} ${filter === 'active' ? 'text-bright-blue' : ''}`}
          onClick={() => setFilter('active')}>Active</button>
        <button
          className={`cursor-pointer ${hoverBottomButton} ${filter === 'completed' ? 'text-bright-blue' : ''}`}
          onClick={() => setFilter('completed')}>Completed</button>
    </>
    )
};

export default TodoListTypeButtons;