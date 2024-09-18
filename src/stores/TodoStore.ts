import { makeAutoObservable } from 'mobx';

interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
    className?: string;
}

class TodoStore {
    todos: TodoItem[] = [];
    nextId: number = 1;

    constructor() {
        makeAutoObservable(this);
    }

    addTodoItem(text: string) {
        this.todos.push({ id: this.nextId++, text, completed: false });
    }

    removeTodoItem(id: number) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    completeTodoItem(id: number) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = true;
            this.removeTodoItem(id);
            this.todos.push(todo);
        }
    }

    updateTodoItem(id: number, newText: string) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.text = newText;
        }
    }

    removeFirstItem() {
        this.todos.shift();
    }

    removeLastItem() {
        this.todos.pop();
    }

    uncompleteTodoItem(id: number) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = false;
        }
    }
}

const todoStore = new TodoStore();
export default todoStore;
