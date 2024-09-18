import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import todoStore from '../stores/TodoStore';

export const TodoForm: React.FC = observer(() => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            todoStore.addTodoItem(inputValue);
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new todo..."
            />
            <button type="submit">Add Todo</button>
        </form>
    );
});
