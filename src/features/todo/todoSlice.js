import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{ id: 0, title: "", content: "", tags: '', color: "white", reminderTime: '', archived: true, pinned: false }]
}

export const todoSlice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        addtodo: (state, action) => {
            const todo = {
                id: nanoid(),
                title: action.payload.title,
                content: action.payload.content,
                tags: action.payload.tags,
                color: action.payload.color,
                reminderTime: action.payload.reminderTime,
                archived: action.payload.archived,
                pinned: action.payload.pinned
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) =>
                todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, title, content, tags, color, reminderTime, pinned, archived } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                if (title !== undefined) todo.title = title;
                if (content !== undefined) todo.content = content;
                if (tags !== undefined) todo.tags = tags;
                if (color !== undefined) todo.color = color;
                if (reminderTime !== undefined) todo.reminderTime = reminderTime;
                if (pinned !== undefined) todo.pinned = pinned;
                if (archived !== undefined) todo.archived = archived;
            }

        },
        
    }
})

export const { addtodo, removeTodo, updateTodo} = todoSlice.actions;

export default todoSlice.reducer;