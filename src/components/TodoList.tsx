import React from 'react';
import {observer} from 'mobx-react-lite';
import todoStore from '../stores/TodoStore';
import {TodoItem} from './TodoItem';

export const TodoList: React.FC = observer(() => {
    return (
        <div>
            <ul>
                {todoStore.todos.map((todo, index) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        className={todo.className}
                    />
                ))}
            </ul>
            <div className="todo-buttons-container">
                <div className="todo-actions">
                    <button onClick={() => todoStore.removeFirstItem()}>Remove First</button>
                    <button onClick={() => todoStore.removeLastItem()}>Remove Last</button>
                </div>
                <div className="todo-actions">
                    <button onClick={() => todoStore.todos.forEach((todo, index) => {
                        if (index % 2 === 0) todo.className = "highlight-even";
                    })}>Highlight Even
                    </button>
                    <button onClick={() => todoStore.todos.forEach((todo, index) => {
                        if (index % 2 !== 0) todo.className = "highlight-odd";
                    })}>Highlight Odd
                    </button>
                </div>
            </div>
        </div>
    );
});
