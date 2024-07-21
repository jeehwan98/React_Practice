import React, { useState } from 'react';
import Todo from '../models/todo';

type TodosContextObj = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
}

// object where we describe the shape of the todos context
export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: () => { },
    removeTodo: (id: string) => { }
});

interface Props {
    children: React.ReactNode;
}

// React.FC = to help clarify that we'll be storing a functional component here
const TodosContextProvider: React.FC<Props> = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (todoText: string) => {
        const newTodo = new Todo(todoText);

        // setTodos(newTodo);
        setTodos((prevTodos) => {
            return prevTodos.concat(newTodo);
        })
    };

    // need to get the id to remove that particular item
    const removeTodoHandler = (todoId: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== todoId);
        })
    }

    const contextValue: TodosContextObj = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler
    }

    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    )
}

export default TodosContextProvider;