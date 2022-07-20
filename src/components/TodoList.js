import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos }) {
  return (
    <div className='todoList'>
      {todos
        ? todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        : null}
    </div>
  );
}

export default TodoList;
