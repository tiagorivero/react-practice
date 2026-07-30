import { type TodoTitle } from "./types";
import { useState } from "react";

interface Props {
    saveTodo: ({title}: TodoTitle) => void;
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSumbit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        saveTodo({title: inputValue});
        setInputValue('');
    }

    return (
        <form onSubmit={handleSumbit}>
            <input 
                className="new-todo"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value)
                }}
                placeholder="Que quieres hacer?"
                autoFocus
            />
        </form>
        
    )
}