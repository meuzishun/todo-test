import React, { useEffect, useRef } from 'react';

function AddTodoForm({ handleFormSubmit }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className='addTodoForm'>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input ref={inputRef} type='text' name='title' />
        </div>
        <div>
          <label htmlFor='content'>Content</label>
          <input type='text' name='content' />
        </div>
        <button type='submit'>Add Todo</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
