import React from 'react';
import './App.css';
import {TodoForm} from "./components/TodoForm";
import {TodoList} from "./components/TodoList";

function App() {
    return (
        <div className="main-content">
            <h1>Todo List</h1>
            <TodoForm/>
            <TodoList/>
        </div>
    );
}

export default App;
