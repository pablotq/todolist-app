import { useState, type FormEvent } from 'react';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export const useTodo = () => {

    const [todolist, setTodolist] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

    const addTodo = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const todoItem = formData.get("todo") as string;

        if (!todoItem.trim()) return

        setTodolist(prev => [...prev, {
            id: Date.now(),
            text: todoItem,
            completed: false
        }]);

        event.currentTarget.reset();

        setFilter("all");
    };

    const toggleTodoCompleted = (id: number) => {

        const newTodoList = todolist.map(todo => {
            if (id === todo.id) {
                const completed = !todo.completed;

                return {
                    ...todo,
                    completed,
                };
            }

            return todo;
        });

        setTodolist(newTodoList);

    };

    const filteredTodos = todolist.filter(todo => {
        switch (filter) {
            case "all": return true
            case "active": return !todo.completed
            case "completed": return todo.completed
        }
    });

    const clearCompleted = () => {
        setTodolist(prev => prev.filter(todo => !todo.completed));
    }

    const removeTodo = (id: number) => {
        setTodolist(prev => prev.filter(todo => todo.id !== id));
    };

    return {
        addTodo,
        toggleTodoCompleted,
        filteredTodos,
        clearCompleted,
        setFilter,
        filter,
        removeTodo
    };
};