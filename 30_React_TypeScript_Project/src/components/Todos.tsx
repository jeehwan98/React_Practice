import React, { useContext } from "react";
import ItemList from "./TodoItem";
import classes from './Todos.module.css';
import { TodosContext } from "../store/todos-context";

// since we're using context, we don't get props, erasing all the props
const Todos: React.FC = () => {
    const todosCtx = useContext(TodosContext);

    return (
        <ul className={classes.todos}>
            {todosCtx.items.map(item => (
                <ItemList
                    key={item.id}
                    text={item.text}
                    onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
                />
            ))}
        </ul>
    )
}

export default Todos;