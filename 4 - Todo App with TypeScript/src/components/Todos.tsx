import React from 'react'
import { Todo } from "./Todo"
import { type ListOfTodos } from "./types";
import { type TodoId } from "./types";
import { type Todo as TodoType } from "./types";

interface Props {
    todos: ListOfTodos;
    onToggleCompletedTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void;
    onRemoveTodo: ({id}: TodoId) => void;
}

//tipar fuction component
export const Todos: React.FC<Props> = ({todos, onRemoveTodo, onToggleCompletedTodo})=>{
    return (
        <ul className='todo-list'>
            {todos.map((todo) => (
                <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
                    <Todo 
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onToggleCompletedTodo={onToggleCompletedTodo}
                        onRemoveTodo={onRemoveTodo}
                    />
                </li>
            ))}
        </ul>
    )
}