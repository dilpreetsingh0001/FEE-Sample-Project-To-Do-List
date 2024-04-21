import React, { useState, useEffect } from 'react';
import './TodoList.css'; // Import your CSS file for styling

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    setDeleteIndex(index);
  };

  const handleConfirmDelete = () => {
    const updatedTodos = todos.filter((_, i) => i !== deleteIndex);
    setTodos(updatedTodos);
    setDeleteIndex(null);
  };

  const handleCancelDelete = () => {
    setDeleteIndex(null);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`todo-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="mode-toggle delete-button" onClick={toggleDarkMode}>
        Mode
      </div>
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new todo"
          className="todo-input"
        />
        <button className="add-button" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <div className="note-count">
        Total Notes: {todos.length}
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <span>{todo.text}</span>
            <button className="delete-button" onClick={() => handleDeleteTodo(index)}>
              Delete
            </button>
            {deleteIndex === index && (
              <div className="delete-confirmation" onClick={handleCancelDelete}>
                <p>Are you sure you want to delete this todo?</p>
                <button className="confirm-delete" onClick={handleConfirmDelete}>
                  Confirm
                </button>
                <button className="cancel-delete" onClick={handleCancelDelete}>
                  Cancel
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
