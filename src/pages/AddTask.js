import React, { useState } from 'react';
import { addTodo } from '../services/IndexedDBService';
import { useNavigate } from 'react-router-dom';
import "../css/addtask.css";

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [label, setLabel] = useState('');
  const [customLabel, setCustomLabel] = useState(''); // State for custom label input
  const [predefinedLabels] = useState(['Work', 'Home', 'Personal']); // Example predefined labels
  const navigate = useNavigate();

  const handleAddTask = async () => {
    if (!title.trim()) {
      alert('Please enter a title for the task.');
      return;
    }

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      label: label || customLabel, // Use selected label or custom label
      completed: false,
    };

    try {
      // Add task to IndexedDB
      await addTodo(newTask);

      // Clear form fields after adding task
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('low');
      setLabel('');
      setCustomLabel('');

      // Provide feedback to the user (you can replace this with a more sophisticated feedback mechanism)
      alert('Task added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('An error occurred while adding the task. Please try again.');
    }
  };

  const handleAddCustomLabel = () => {
    // Add the custom label to the predefined labels array
    // You can add additional validation or checks here if needed
    setCustomLabel(customLabel.trim());
    setLabel(customLabel.trim());
  };

  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <label>Due Date:</label>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

      <label>Priority:</label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label>Label:</label>
      <div className='label-class'>
     
      <select value={label} onChange={(e) => setLabel(e.target.value)}>
        <option value="">Select a Label</option>
        {predefinedLabels.map((predefinedLabel) => (
          <option key={predefinedLabel} value={predefinedLabel}>
            {predefinedLabel}
          </option>
        ))}
      </select>
      <div className='custom-label'>
      <input
        type="text"
        placeholder="Enter custom label"
        value={customLabel}
        onChange={(e) => setCustomLabel(e.target.value)}
      />
     
      <button onClick={handleAddCustomLabel}>Add Label</button>
      </div>
      </div>

      <div className='button-group'>
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
};

export default AddTask;
