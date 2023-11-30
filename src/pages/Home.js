import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import "../css/home.css";
import {Link} from "react-router-dom";
import { deleteTodo, getAllTodos,updateTodoPriority } from '../services/IndexedDBService';
import TodoCard from '../components/TodoCard';



const Home = props => {
    const [todos,setTodos] = useState([])
    const [refresh,setRefresh] = useState(false)
    const getTodos = async() =>{
        const data = await getAllTodos();
        setTodos(data)
    }

  useEffect(() => {
    getTodos()
  },[refresh])

  const deleteTask = async (id) => {
    await deleteTodo(id)
    setRefresh(!refresh)
  }

  const handlePriorityChange = async (id, priority) => {
    try {
      console.log(id,priority)
      await updateTodoPriority(id, priority);
    } catch (error) {
      console.error('Error updating priority:', error);
    }
    setRefresh(!refresh);
  };
 
  const groupByLabel = () => {
    const groupedTodos = {};
    todos.forEach((todo) => {
      const label = todo.label || 'No Label'; // Default label if not specified
      if (!groupedTodos[label]) {
        groupedTodos[label] = [];
      }
      groupedTodos[label].push(todo);
    });
  
    // Sort tasks within each group based on priority
    for (const label in groupedTodos) {
      groupedTodos[label].sort((a, b) => {
        const priorityOrder = { low: 3, medium: 2, high: 1 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    }
  
    return groupedTodos;
  };
  const toggleRefresh = () => {
    setRefresh(!refresh)
  }
  return (
    <div>
        <Navbar /> 
        <Link to="/addTask" className="button-pos" >
        <button className="addTask" >Add Task</button>
        </Link>
        {Object.entries(groupByLabel()).map(([label, tasks]) => (
        <div key={label} className='label-group'>
          <h3>{label}</h3>
          {tasks.map((todo, id) => (
            <TodoCard todo={todo} id={id} handlePriorityChange={handlePriorityChange} deleteTask={deleteTask}  toggleRefresh={toggleRefresh} />
      ))}
      </div>
        ))}
     
    </div>
  );
};

export default Home;
