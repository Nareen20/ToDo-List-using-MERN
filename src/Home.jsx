import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";  
import './App.css';
import { BsCircleFill, BsFillCheckCircleFill, BsTrash } from 'react-icons/bs';  // Import the correct icons

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:3001/get")
          .then(result => setTodos(result.data))
          .catch(err => console.log(err));
    }, []);

    // Delete function to remove a todo
    const handleDelete = (id) => {
        axios
          .delete(`http://localhost:3001/delete/${id}`)
          .then(res => {
            setTodos(todos.filter(todo => todo._id !== id));  // Update the state after deletion
          })
          .catch(err => console.error(err));
    };

    // Function to handle edit (mark as done)
    const handleEdit = (id) => {
        axios
          .put(`http://localhost:3001/update/${id}`)  // Send the ID to update the task
          .then(result => {
              setTodos(prevTodos => prevTodos.map(todo => 
                  todo._id === id ? { ...todo, done: true } : todo  // Mark as done in the frontend state
              ));
          })
          .catch(err => console.log(err));
    };

    return (
        <div className="todo-container">
           <h2>Todo List</h2>
           <Create setTodos={setTodos} todos={todos} />
           {
            todos.length === 0 
            ? <div><h3>No Records</h3></div> 
            : todos.map((todo, index) => (
                <div key={index} className={`todo-item ${todo.done ? 'done' : ''}`}>
                    <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                        { todo.done ? (
                            <BsFillCheckCircleFill className="icon" /> 
                        ) : 
                        (
                            <BsCircleFill className="icon" />  // Empty circle icon for pending tasks
                        )}
                        <p className="task-text">{todo.task}</p>
                    </div>
                    <BsTrash 
                        className='delete-icon' 
                        onClick={() => handleDelete(todo._id)}  // Delete task on click
                    />
                </div>    
            ))
           }
        </div>
    );
}

export default Home;
