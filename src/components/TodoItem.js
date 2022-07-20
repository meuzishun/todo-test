import React, { useContext } from 'react';
import { DeleteContext } from '../App';

function TodoItem({ todo }) {
  const deleteTodo = useContext(DeleteContext);
  return (
    <div className='todoItem'>
      <p>Title: {todo.title}</p>
      <p>Content: {todo.content}</p>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
