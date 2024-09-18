import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import todoStore from '../stores/TodoStore';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';

interface TodoItemProps {
    id: number;
    text: string;
    completed: boolean;
    className?: string;
}

export const TodoItem: React.FC<TodoItemProps> = observer(({id, text, completed, className}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editText, setEditText] = React.useState(text);

    const handleUpdateItem = useCallback(() => {
        if (isEditing) {
            todoStore.updateTodoItem(id, editText);
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    }, [isEditing, id, editText]);

    const handleCancelEdit = useCallback(() => {
        setIsEditing(false);
        setEditText(text);
    }, [text]);

    return (
        <li className={`${className} ${completed ? 'completed' : ''}`}>
            <div>
                {!isEditing && (
                    completed ? (
                        <button className="uncomplete" onClick={() => todoStore.uncompleteTodoItem(id)}>
                            <UndoIcon sx={{width: "1.3rem", height: "1.3rem", color: "black"}}/>
                        </button>
                    ) : (
                        <button className="complete" onClick={() => todoStore.completeTodoItem(id)}>
                            <CheckIcon sx={{width: "1.3rem", height: "1.3rem", color: "black"}}/>
                        </button>
                    )
                )}
                {isEditing && (
                    <button className="save" onClick={handleUpdateItem}>
                        <SaveIcon sx={{width: "1.3rem", height: "1.3rem", color: "black"}}/>
                    </button>
                )}
            </div>
            <div className="todo-text">
                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                ) : (
                    text
                )}
            </div>
            <div className="container-buttons">
                {!isEditing && !completed && (
                    <button className="edit" onClick={handleUpdateItem}>
                        <EditIcon sx={{width: "1.3rem", height: "1.3rem", color: "black"}}/>
                    </button>
                )}
                {isEditing ? (
                    <button className="cancel" onClick={handleCancelEdit}>
                        <ClearIcon sx={{width: "1.3rem", height: "1.3rem", color: "black"}}/>
                    </button>
                ) : (
                    <button className="delete" onClick={() => todoStore.removeTodoItem(id)}>
                        <DeleteIcon sx={{width: "1.3rem", height: "1.3rem", color: "black"}}/>
                    </button>
                )}
            </div>
        </li>
    );
});
