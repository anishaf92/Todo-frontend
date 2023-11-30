import React, { useEffect ,useState} from "react";
import { useParams } from 'react-router-dom';
import { getTodoById} from "../services/IndexedDBService";

const DisplayTodo = (props) => {

  const {id} = useParams();
  
  const [todo,setTodo] = useState({
    title:"",
    duedate:"",
    priority:"",
    
  })
  const fetchTodoById = async () =>{
    try {
       
        const todoData = await getTodoById(parseInt(id));
        console.log(todoData)
        setTodo(todoData);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
  }
 
  useEffect(() => {
    fetchTodoById();
     // eslint-disable-next-line
  },[])
  return (

        <div>
          {todo ? (
            <div>
              <h2>{todo.title}</h2>
              <p>Due Date: {todo.duedate}</p>
              <p>Priority: {todo.priority}</p>
              <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
              {/* Add other details as needed */}
              {!todo.completed && (
                <button  >Mark as Completed</button>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
    };


export default DisplayTodo;
