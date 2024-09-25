import React, { useState, useEffect } from 'react';
import './App.css';  // Import your CSS file for styling

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState('');
  const [editingTodoStatus, setEditingTodoStatus] = useState('Pending');

  // Fetch the todo list from localStorage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Update localStorage whenever todos state changes
  const saveToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      status: 'Pending',
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const startEditTodo = (id, text, status) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
    setEditingTodoStatus(status);
  };

  const saveEditTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodoId
        ? { ...todo, text: editingTodoText, status: editingTodoStatus }
        : todo
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditingTodoText('');
    setEditingTodoStatus('Pending');
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  const handleSaveAll = () => {
    saveToLocalStorage();
    alert('Tasks saved!');
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              {editingTodoId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editingTodoText}
                    onChange={(e) => setEditingTodoText(e.target.value)}
                  />
                  <select
                    value={editingTodoStatus}
                    onChange={(e) => setEditingTodoStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Done">Done</option>
                  </select>
                  <button onClick={saveEditTodo}>Save</button>
                </>
              ) : (
                <>
                  <span>{todo.text}</span>
                  <select
                    value={todo.status}
                    onChange={(e) => handleStatusChange(todo.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Done">Done</option>
                  </select>
                  <button onClick={() => startEditTodo(todo.id, todo.text, todo.status)}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
      <div className="save-button-container">
        <button onClick={handleSaveAll}>Save All Tasks</button>
      </div>
    </div>
  );
}

export default App;
