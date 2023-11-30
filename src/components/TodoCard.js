import React,{useState,useEffect} from "react"
import { addCommentToTodo, getTodoById, updateTodo } from "../services/IndexedDBService";

const TodoCard = ({todo,id,handlePriorityChange,deleteTask,toggleRefresh}) => {
    const [newComment, setNewComment] = useState('');
    //  eslint-disable-next-line
    const [commentCount,setCommentCount] = useState(0);
   
    const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const todoWithComments = await getTodoById(todo.id);
        setCommentCount(todoWithComments.comments.length);
        setComments(todo.comments)
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
     // eslint-disable-next-line
  }, [id]);
  const handleAddComment = async(id) => {
    try{
    await addCommentToTodo(id,newComment);
    }
    catch (error) {
        console.error('Error Adding comment:', error);
      }

    
    setNewComment('');
    setShowAddComment(false);
    toggleRefresh();
  };
    const calculateDueDate = (dueDate) => {
  
        const currentDate = new Date();
        const todoDueDate = new Date(dueDate);
        const daysRemaining = Math.ceil((todoDueDate - currentDate) / (1000 * 60 * 60 * 24));
        
        if (daysRemaining === 0) {
          return 'Today';
        } else if (daysRemaining > 0) {
          if(daysRemaining === 1){
            return `Due in ${daysRemaining} day`;
          }
          else{
            return `Due in ${daysRemaining} days`;
          }
        } else {
          return `Overdue by ${-daysRemaining} days`;
        }
      };
      const handleCompleteTask = async (id) => {
        try {
          await updateTodo(id, null, true); // Set completed to true
        } catch (error) {
          console.error('Error completing task:', error);
        }
        
      };
  return (
    <div key={id} className='card'>
       
            
            
    <div className="todo-item" >
      <div className='firstline'>
      <div className="todo-title"  >{todo.title}
      </div>
      <div className='priority'>
      <input
  type="radio"
  name={`priority-${todo.id}-low`}  // Use todo.id instead of id
  value="low"
  checked={todo.priority === 'low'}
/>
<span onClick={() => handlePriorityChange(todo.id, 'low')} className="priority-dot low" />
<input
  type="radio"
  name={`priority-${todo.id}-medium`}  // Use todo.id instead of id
  value="medium"
  checked={todo.priority === 'medium'}
/>
<span onClick={() => handlePriorityChange(todo.id, 'medium')} className="priority-dot medium" />
<input
  type="radio"
  name={`priority-${todo.id}-high`}  // Use todo.id instead of id
  value="high"
  checked={todo.priority === 'high'}
/>
<span onClick={() => handlePriorityChange(todo.id, 'high')} className="priority-dot high" />
</div>
      </div>
     
      <div className='blinking-text'>{calculateDueDate(todo.dueDate)}</div>
      <div className="description">
        {todo.description}
      </div>

      <div className="last-line">
      {showAddComment ? (
          <>
            
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={() => handleAddComment(todo.id)}>Comment</button>
            
          </>
        ) : (
            <>
              {comments.length > 0 && (
                <div className="comments-section">
                  <button  className="big-btn" onClick={() => setShowComments(!showComments)}>
                    {showComments ? 'Hide Comments' : `View Comments (${comments.length})`}
                  </button>
                  {showComments && (
                    <div className="comment-list">
                      {comments.map((comment, index) => (
                        <div key={index} className="comment">
                          {comment}
                        </div>
                      ))}
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                      />
                      <button className="big-btn" onClick={() => handleAddComment(todo.id)}>Comment</button>
                    </div>
                  )}
                </div>
              )}
              {comments.length === 0 && (
                <button className="big-btn" onClick={() => setShowAddComment(true)}>Add Comment</button>
              )}
            </>
          )}
      {todo.completed ? (
  <div className="completed-text">Completed</div>
) : (
  <button className="big-btn" onClick={() => handleCompleteTask(todo.id)}>
    Mark as Completed
  </button>
)}
      </div>
      <div onClick={() => deleteTask(todo.id)} className="delete-btn" title="Delete Task" />
      
      </div>

      
      
    
   
{/* </li>
</ul> */}
</div>
  )
};

export default TodoCard;
