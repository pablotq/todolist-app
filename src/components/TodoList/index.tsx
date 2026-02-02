import { useContext } from 'react';
import { themeConfig } from '../../contexts/theme'
import { ThemeContext } from '../../contexts/ThemeContext';
import type { Todo } from '../../hooks/useTodo';
import IconCheck from '/images/icon-check.svg';
import TodoListTypeButtons from '../TodoListTypeButtons';

interface TodoListProps {
  todoList: Todo[];
  toggleTodoCompleted: (id: number) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  filter: 'all' | 'active' | 'completed';
  clearCompleted: () => void;
  removeTodo: (id: number) => void;
}


const TodoList = ({ todoList, toggleTodoCompleted, setFilter, filter, clearCompleted, removeTodo }: TodoListProps) => {
  const { theme } = useContext(ThemeContext);

  const hoverBottomButton = theme === "dark" ? "hover:text-dark-purple-100-hover" : "hover:text-light-navy-850";

  return (
    <>
      <div className={`${themeConfig[theme].todo.backgroundColor} rounded-md`}>
        <ul>
          {
            todoList.map((todo) => (
              <li className={`p-6 border-b ${themeConfig[theme].todo.borderColor}`} key={todo.id}>
                <div className='flex items-center gap-4'>
                  <span className='w-6.5 h-6.5 rounded-2xl hover:bg-[linear-gradient(to_right,hsl(192,100%,67%),hsl(280,87%,65%))] hover:p-px'>

                    <button className={`w-6 h-6 border ${themeConfig[theme].todo.borderColor} rounded-2xl cursor-pointer ${themeConfig[theme].todo.backgroundColor} ${todo.completed ? 'bg-[linear-gradient(to_right,hsl(192,100%,67%),hsl(280,87%,65%))]' : ''}`}
                      onClick={() => toggleTodoCompleted(todo.id)}
                    >

                      {todo.completed && (
                        <img src={IconCheck} alt="íconde de marcado" className='h-2 w-2 m-auto' />
                      )}

                    </button>
                  </span>
                  <div className='flex w-full justify-between hover:cursor-pointer group'
                  onClick={() => removeTodo(todo.id)}>
                    <p className={`${themeConfig[theme].todo.textColor} ${todo.completed ? "line-through opacity-60" : ''}`}
                    >{todo.text}</p>

                    <button
                      className={`opacity-0 hover:cursor-pointer group-hover:opacity-100 transition-opacity duration-150  ${themeConfig[theme].layout.textColor}`}
                      >X</button>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
        <div className={`text-sm flex justify-between p-4 ${themeConfig[theme].layout.textColor}`}>
          <p>{todoList.length} items total</p>
          <div className='hidden sm:flex gap-4'>
            <TodoListTypeButtons setFilter={setFilter}
              filter={filter} />
          </div>
          <button
            className={`cursor-pointer ${hoverBottomButton}`}
            onClick={clearCompleted}>Clear Comlpeted</button>
        </div>

      </div>
      <div className={`flex sm:hidden justify-center gap-5 py-4 mt-4 rounded-md ${themeConfig[theme].layout.textColor} ${themeConfig[theme].todo.backgroundColor} `}>
        <TodoListTypeButtons setFilter={setFilter}
          filter={filter} />
      </div>
    </>
  );
};

export default TodoList;