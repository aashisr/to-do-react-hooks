// useState is a hook
import React, { useState } from 'react';
import './App.css';

// Create Todo component
function Todo(props) {
    return (
        <div style={{ textDecoration: props.todo.isCompleted ? 'line-through' : '' }} className='todo'>
            {props.todo.text}
            <div>
                <button onClick={() => props.completeTodo(props.index)}>Complete</button>
                <button onClick={() => props.deleteTodo(props.index)}>Delete</button>
            </div>
        </div>
    );
}

// Create a form to add todo
function TodoForm(props) {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do not submit if empty value
        if (!value) return;
        // Function to add todo
        props.addTodo(value);
        // Clear the form
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' className='input' value={value} placeholder='Add todo ...' onChange={(e) => setValue(e.target.value)} />
        </form>
    );
}

function App() {
    // Create state which stores todos and provides a method to update the state
    // todos is the state
    // setTodos is a method to update the state
    const [todos, setTodos] = useState([
        {
            text: 'Wake up',
            isCompleted: false
        },
        {
            text: 'Go to bathroom',
            isCompleted: false
        },
        {
            text: 'Eat breakfast',
            isCompleted: false
        },
        {
            text: 'Dress up',
            isCompleted: false
        },
        {
            text: 'Go to work',
            isCompleted: false
        }
    ]);

    const addTodo = (text) => {
        // Use spread operator to copy all todos
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    };

    const completeTodo = (index) => {
        const newTodos = [...todos];
        // Mark the todo with given index as completed
        newTodos[index].isCompleted = true;
        // Set the new state
        setTodos(newTodos);
    };

    const deleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div className='app'>
            <div className='todo-list'>
                {todos.map((todo, index) => (
                    <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} />
                ))}
                <TodoForm addTodo={addTodo} />
            </div>
        </div>
    );
}

export default App;
